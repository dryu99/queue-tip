import http from 'http';
import socketio from 'socket.io';

import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import { AcknowledgementCallback as AckCallback, SocketEvents } from './types';
import roomService from './services/roomService';
import userService from './services/userService';
import { toNewRoom, toNewUser, toCleanRoom, toUser, toSocketData } from './utils';

const server = http.createServer(app);
const io = socketio(server);

// keeps track of current connections for logging purposes
let connectCounter = 0;
let roomCounter = 0;

// executes given event handler and uses acknowledgement callback to send error back to client on failure
// this is what every socket handler should call to keep consistency.
const handleSocketEvent = (
  event: string, data: any,
  ackCallback: AckCallback, eventHandler: () => void
) => {
  logger.event(`${event} event received`, data);

  try {
    eventHandler();
  } catch (e) {
    const error = e as Error;
    logger.error(error);
    ackCallback({ error: error.message });
  }

  logger.printAppState();
};

io.on('connection', (socket) => {
  logger.event('a user has connected!');
  console.log(`current number of users connected: ${++connectCounter}`);
  logger.printAppState();

  // Create a new room and send back room data on success. Return error message on failure.
  socket.on(SocketEvents.CREATE_ROOM, (data, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.CREATE_ROOM, data, callback, () => {
      const newRoom = toNewRoom(data);
      const room = roomService.addRoom(newRoom);
      const cleanRoom = toCleanRoom(room);

      // just for logging purposes
      roomCounter++;

      callback({ room: cleanRoom });
    });
  });

  // Check if room exists and send back room data on success. Return error message on failure.
  socket.on(SocketEvents.ROOM_CHECK, (data, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.ROOM_CHECK, data, callback, () => {
      const { roomId } = toSocketData(data);

      if (roomId) {
        const room = roomService.getRoom(roomId);
        const cleanRoom = toCleanRoom(room);

        callback({
          room: cleanRoom,
          queuedUsers: room.queue
        });
      } else {
        throw new Error('roomId is missing or invalid');
      }
    });
  });

  // Caches user and adds them to specified room. Return error message on failure.
  socket.on(SocketEvents.JOIN, (data, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.JOIN, data, callback, () => {
      const newUser = toNewUser(data);

      // store user in memory
      userService.addUser(socket.id, newUser);

      // make socket join room
      socket.join(newUser.roomId);

      callback({});
    });
  });

  // Enqueues user in specfied room. Return error message on failure.
  socket.on(SocketEvents.ENQUEUE, (data, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.ENQUEUE, data, callback, () => {
      const user = toUser(data);

      roomService.enqueueUser(user, user.roomId);

      // broadcast new enqueued user to all clients in room including sender
      io.in(user.roomId).emit(SocketEvents.ENQUEUE, {
        enqueuedUser: user
      });

      callback({});
    });
  });

  // Dequeues user in specfied room. Return error message on failure.
  socket.on(SocketEvents.DEQUEUE, (data, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.DEQUEUE, data, callback, () => {
      const { username, roomId } = toSocketData(data);

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

  // Verifies given password and returns success/failure result. Return error message on failure.
  socket.on(SocketEvents.TRY_ADMIN_STATUS, (data, callback: AckCallback) => {
    handleSocketEvent(SocketEvents.TRY_ADMIN_STATUS, data, callback, () => {
      const { adminPassword, roomId } = toSocketData(data);

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

    if (userService.hasUser(socket.id)) {
      try {
        // remove user from memory
        const removedUser = userService.removeUser(socket.id);

        // get socket room user was in
        const room = io.sockets.adapter.rooms[removedUser.roomId];
        logger.info(`Room ${removedUser.roomId} length: ${room ? room.length : 0}`);

        // delete room from memory if its empty (empty rooms are undefined)
        // we check for dev env b/c it's annoying to have rooms being deleted everytime client refreshes after hot change
        if (process.env.NODE_ENV !== 'development' && (!room || room.length === 0)) {
          logger.info(`Room ${removedUser.roomId} is empty now, deleting from memory...`);
          roomService.removeRoom(removedUser.roomId);

          // just for logging purposes
          roomCounter--;
        }
      } catch (e) {
        // TODO this line will usually hit when a user who hasn't signed up disconnects, maybe emit LEAVE from client side?
        const error = e as Error;
        logger.error(error);
      }
    }

    logger.printAppState();
    console.log(`current number of users connected: ${--connectCounter}`);
    console.log(`current number of rooms: ${roomCounter}`);
  });
});

// boot up server
server.listen(config.PORT, () => {
  logger.info(`Server starting on port ${config.PORT}`);
});