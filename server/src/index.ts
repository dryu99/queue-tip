import http from 'http';
import socketio from 'socket.io';

import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import { AcknowledgementCallback as AckCallback, EventData, SocketEvents } from './types';
import roomService from './services/roomService';
import userService from './services/userService';
import { toNewRoom, toCleanRoom, toNewUser, parseString } from './utils';

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

  // Create a new room
  socket.on(SocketEvents.CREATE_ROOM, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.CREATE_ROOM, eventData, callback, (data) => {
      const newRoom = toNewRoom(data.newRoom);
      const room = roomService.addRoom(newRoom);

      const newUser = toNewUser(data.newUser);
      const user = userService.addUser(socket.id, room.id, newUser);

      // have admin user join socket.io room
      socket.join(user.roomId);

      // send back minimal room data to sender
      const cleanRoom = toCleanRoom(room);
      callback({ room: cleanRoom, user });
    });
  });

  // Check if room exists and send back room data on success.
  socket.on(SocketEvents.ROOM_CHECK, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.ROOM_CHECK, eventData, callback, (data) => {
      const roomId = parseString(data.roomId);
      const room = roomService.getRoom(roomId);
      const cleanRoom = toCleanRoom(room);

      // send back minimal room data to sender
      callback({ room: cleanRoom });
    });
  });

  // Add them to specified room.
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
        { newUser: user }
      );

      // send back relevant room data to sender so they can init room state
      const { users, queue } = roomService.getRoom(user.roomId);
      callback({ user, users, queue });
    });
  });

  // Enqueue user in specified room.
  socket.on(SocketEvents.ENQUEUE, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.ENQUEUE, eventData, callback, (data) => {
      const userId = parseString(data.userId);
      const user = userService.getUser(userId);
      const room = roomService.getRoom(user.roomId);

      // enqueue user
      room.queue.push(user);

      // broadcast new enqueued user to all clients in room including sender
      io.in(user.roomId).emit(
        SocketEvents.ENQUEUE,
        { enqueuedUser: user }
      );
    });
  });

  // Dequeue user in specified room.
  socket.on(SocketEvents.DEQUEUE, (eventData, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.DEQUEUE, eventData, callback, (data) => {
      const roomId = parseString(data.roomId);
      const room = roomService.getRoom(roomId);

      // dequeue user
      const user = room.queue.shift();

      if (user) {
        // broadcast dequeued user to all clients in room including sender
        io.in(roomId).emit(
          SocketEvents.DEQUEUE,
          { dequeuedUser: user }
        );
      } else {
        logger.error(`Room ${roomId} was empty, couldn't dequeue.`);
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

  // Delete user from memory and delete room if room is empty.
  socket.on(SocketEvents.DISCONNECT, () => {
    logger.event(`${SocketEvents.DISCONNECT} event received`);

    if (userService.hasUser(socket.id)) { // if user is in a room
      try {
        // remove user from user cache + room cache
        const user = userService.removeUser(socket.id);

        const room = roomService.getRoom(user.roomId);

        // broadcast disconnected user to all clients in room except sender
        socket.broadcast.to(room.id).emit(
          SocketEvents.LEAVE,
          { disconnectedUser: user }
        );

        // delete room from memory if its empty (empty rooms are undefined)
        if (!room || room.users.length === 0) {
          logger.info(`Room ${room.id} '${room.name}' is empty now, deleting from memory...`);
          roomService.removeRoom(room.id);
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