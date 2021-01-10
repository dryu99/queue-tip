import http from 'http';
import socketio from 'socket.io';

import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import { AcknowledgementCallback as AckCallback, EventData, SocketEvents } from './types';
import roomService from './services/roomService';
import userService from './services/userService';
import { toNewRoom, toCleanRoom, toUser, toNewUser, parseString } from './utils';

const server = http.createServer(app);
const io = socketio(server);

// executes given event handler and uses acknowledgement callback to send error back to client on failure
// this is what every socket handler should call to keep consistency.
const handleSocketEvent = (
  eventType: string, eventData: any,
  ackCallback: AckCallback, eventHandler: (data: EventData) => void
) => {
  logger.event(`${eventType} event received`, eventData);

  try {
    if (eventData === null || eventData === undefined) {
      throw Error('event data received was null or undefined');
    }

    eventHandler(eventData);
  } catch (e) {
    const error = e as Error;
    logger.error(error);
    ackCallback({ error: error.message });
  }

  logger.printAppState();
};

io.on('connection', (socket) => {
  logger.event('a user has connected!');
  logger.printAppState();

  // Create a new room and send back room data on success.
  socket.on(SocketEvents.CREATE_ROOM, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.CREATE_ROOM, eventData, callback, (data) => {
      const newRoom = toNewRoom(data.newRoom);
      const room = roomService.addRoom(newRoom);

      const newUser = toNewUser(data.newUser);
      const user = userService.addUser(socket.id, room.id, newUser);

      // have admin user join socket.io room
      socket.join(user.roomId);

      const cleanRoom = toCleanRoom(room);
      callback({ room: cleanRoom, user });
    });
  });

  // Check if room exists and send back room data on success.
  socket.on(SocketEvents.ROOM_CHECK, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.ROOM_CHECK, eventData, callback, (data) => {
      const roomId = parseString(data.roomId);
      const room = roomService.getRoom(roomId); // TODO re-evaluate socketdata data type
      const cleanRoom = toCleanRoom(room);

      callback({ room: cleanRoom });
    });
  });

  // Cache user and add them to specified room.
  socket.on(SocketEvents.JOIN, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.JOIN, eventData, callback, (data) => {
      const newUser = toNewUser(data.newUser);
      const roomId = parseString(data.roomId);
      const user = userService.addUser(socket.id, roomId, newUser);

      // have user join socket.io room
      socket.join(user.roomId);

      // broadcast new user to all clients in room except sender
      socket.broadcast.to(user.roomId).emit(
        SocketEvents.JOIN,
        { user }
      );

      const { users, queue } = roomService.getRoom(user.roomId);
      callback({ user, users, queue });
    });
  });

  // Enqueues user in specified room.
  socket.on(SocketEvents.ENQUEUE, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.ENQUEUE, eventData, callback, (data) => {
      const user = toUser(data);

      roomService.enqueueUser(user, user.roomId);

      // broadcast new enqueued user to all clients in room including sender
      io.in(user.roomId).emit(SocketEvents.ENQUEUE, {
        enqueuedUser: user
      });

      callback({});
    });
  });

  // Dequeues user in specified room.
  socket.on(SocketEvents.DEQUEUE, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.DEQUEUE, eventData, callback, (data) => {
      const username = parseString(data.username);
      const roomId = parseString(data.roomId);

      if (username && roomId) {
        const dequeuedUser = roomService.dequeueUser(username, roomId);

        // broadcast dequeued user to all clients in room including sender
        io.in(roomId).emit(SocketEvents.DEQUEUE, {
          dequeuedUser
        });

        callback({});
      } else {
        throw new Error('username or roomId are missing or invalid');
      }
    });
  });

  // Verifies given password and returns success/failure result.
  socket.on(SocketEvents.TRY_ADMIN_STATUS, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.TRY_ADMIN_STATUS, eventData, callback, (data) => {
      const adminPassword = parseString(data.adminPassword);
      const roomId = parseString(data.roomId);

      if (adminPassword && roomId) {
        const isPasswordCorrect = roomService.verifyAdminPassword(adminPassword, roomId);

        if (isPasswordCorrect) {
          callback({}); // empty callback means success
        } else {
          throw new Error('given admin password was incorrect');
        }
      } else {
        throw new Error('adminPassword or roomId are missing or invalid');
      }
    });
  });

  // Deletes user from user cache and deletes room if room is empty.
  socket.on(SocketEvents.DISCONNECT, () => {
    logger.event(`${SocketEvents.DISCONNECT} event received`);

    if (userService.hasUser(socket.id)) { // if user is in a room
      try {
        // remove user from memory
        const removedUser = userService.removeUser(socket.id);

        // get socket room user was in
        const socketRoom = io.sockets.adapter.rooms[removedUser.roomId];

        // const room = roomService.getRoom(removedUser.roomId);

        // broadcast disconnected user to all clients in room except sender
        socket.broadcast.to(removedUser.roomId).emit(
          SocketEvents.LEAVE,
          { user: removedUser }
        );

        // delete room from memory if its empty (empty rooms are undefined)
        // we check for dev env b/c it's annoying to have rooms being deleted everytime client refreshes after hot change
        // if (process.env.NODE_ENV !== 'development' && (!room || room.length === 0)) {
        if (!socketRoom || socketRoom.length === 0) {
          logger.info(`Room ${removedUser.roomId} is empty now, deleting from memory...`);
          roomService.removeRoom(removedUser.roomId);
        }
      } catch (e) {
        // TODO this line will usually hit when a user who hasn't signed up disconnects, maybe emit LEAVE from client side?
        const error = e as Error;
        logger.error(error);
      }
    }

    logger.printAppState();
  });
});

// boot up server
server.listen(config.PORT, () => {
  logger.info(`Server starting on port ${config.PORT}`);
});