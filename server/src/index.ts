import http from 'http';
import socketio from 'socket.io';

import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import { AcknowledgementCallback as AckCallback, SocketEvents } from './types';
import roomService from './services/roomService';
import userService from './services/userService';
import { toNewRoom, toNewUser, toSocketRoomData, toCleanRoom, toUser } from './utils';

const server = http.createServer(app);
const io = socketio(server);

// keeps track of current connections for logging purposes
let connectCounter = 0;
let roomCounter = 0;

io.on('connection', (socket) => {
  logger.event('a user has connected!');
  console.log(`current number of users connected: ${++connectCounter}`);
  logger.printAppState();

  // Create a new room and send back room data on completion. Return error message on failure.
  socket.on(SocketEvents.CREATE_ROOM, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.CREATE_ROOM} event received`, data);

    try {
      const newRoom = toNewRoom(data);
      const room = roomService.addRoom(newRoom);
      const cleanRoom = toCleanRoom(room);

      // just for logging purposes
      roomCounter++;

      callback({ room: cleanRoom });
    } catch (e) {
      const error = e as Error;
      logger.error(error);
      callback({ error: error.message });
    }
    logger.printAppState();
  });

  socket.on(SocketEvents.ROOM_CHECK, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.ROOM_CHECK} event received`, data);

    try {
      const { roomId } = toSocketRoomData(data);

      const room = roomService.getRoom(roomId);
      const cleanRoom = toCleanRoom(room);

      callback({
        room: cleanRoom,
        queuedUsers: room.queue
      });
    } catch (e) {
      const error = e as Error;
      logger.error(error);
      callback({ error: error.message });
    }
    logger.printAppState();
  });

  socket.on(SocketEvents.JOIN, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.JOIN} event received`, data);

    try {
      const newUser = toNewUser(data);

      // store user in memory
      userService.addUser(socket.id, newUser);

      // make socket join room
      socket.join(newUser.roomId);

      callback({});
    } catch (e) {
      const error = e as Error;
      logger.error(error);
      callback({ error: error.message });
    }
    logger.printAppState();
  });

  socket.on(SocketEvents.ENQUEUE, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.ENQUEUE} event received`, data);
    try {
      const user = toUser(data);

      roomService.enqueueUser(user, user.roomId);

      // broadcast new enqueued user to all clients in room including sender
      io.in(user.roomId).emit(SocketEvents.ENQUEUE, {
        enqueuedUser: user
      });

      callback({});
    } catch (e) {
      const error = e as Error;
      logger.error(error);
      callback({ error: error.message });
    }
    logger.printAppState();
  });

  socket.on(SocketEvents.DEQUEUE, ({ name, roomId }, callback: AckCallback) => {
    logger.event(`${SocketEvents.DEQUEUE} event received`, name, roomId);
    try {
      // const { userId, roomId } = toSocketData(data);

      const dequeuedUser = roomService.dequeueUser(name, roomId);
      // const cleanUser = userService.cleanUser(dequeuedUser);

      // broadcast dequeued user to all clients in room including sender
      io.in(roomId).emit(SocketEvents.DEQUEUE, {
        dequeuedUser
      });

      callback({});
    } catch (e) {
      const error = e as Error;
      logger.error(error);
      callback({ error: error.message });
    }

    logger.printAppState();
  });

  socket.on(SocketEvents.TRY_ADMIN_STATUS, ({ adminPassword, roomId }, callback: AckCallback) => {
    logger.event(`${SocketEvents.TRY_ADMIN_STATUS} event received`, adminPassword, roomId);

    try {
      const isPasswordCorrect = roomService.verifyAdminPassword(adminPassword, roomId);

      if (isPasswordCorrect) {
        callback({}); // empty callback means success
      } else {
        const erorrMessage = 'given admin password was incorrect';
        logger.error(erorrMessage);
        callback({ error: erorrMessage });
      }
    } catch (e) {
      const error = e as Error;
      logger.error(error);
      callback({ error: error.message });
    }

    logger.printAppState();
  });

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
        // process.env.NODE_ENV !== 'development' &&
        if (!room || room.length === 0) {
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