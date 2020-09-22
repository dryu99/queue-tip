import http from 'http';
import socketio from 'socket.io';

import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import { AcknowledgementCallback as AckCallback, SocketEvents } from './types';
import roomService from './services/roomService';
import userService from './services/userService';
import { toCleanUser, toNewRoom, toNewUser, toSocketData, toSocketRoomData } from './utils';

const server = http.createServer(app);
const io = socketio(server);

const printAppState = () => {
  logger.info('--- SERVER STATE ---');
  logger.info('ROOMS: ', roomService.getAllRooms().map(r => ({
    id: r.id,
    name: r.name,
    users: r.users.map(u => u.name),
    queue: r.queue.map(q => q.name),
  })));
  logger.info('--------------------');
};

// keeps track of current connections
let connectCounter = 0;

io.on('connection', (socket) => {
  logger.event('a user has connected!');
  console.log(`current number of users connected: ${++connectCounter}`);
  printAppState();

  // TODO should generate uuid on server not client

  // Create a new room and send back room data on completion. Return error message on failure.
  socket.on(SocketEvents.CREATE_ROOM, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.CREATE_ROOM} event received`, data);

    try {
      const newRoom = toNewRoom(data);
      const room = roomService.addRoom(newRoom);
      const cleanRoom = roomService.cleanRoom(room);

      callback({ room: cleanRoom });
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      callback({ error: error.message });
    }
    printAppState();
  });

  socket.on(SocketEvents.ROOM_CHECK, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.ROOM_CHECK} event received`, data);

    try {
      const { roomId } = toSocketRoomData(data);

      const room = roomService.getRoom(roomId);
      const cleanRoom = roomService.cleanRoom(room);

      callback({ room: cleanRoom });
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      callback({ error: error.message });
    }
  });

  socket.on(SocketEvents.JOIN, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.JOIN} event received`, data);

    try {
      const newUser = toNewUser(data);

      // get users + queue first, we don't want them to contain the new user
      const usersInRoom = roomService.getUsersInRoom(newUser.roomId);
      const usersInQueue  = roomService.getQueuedUsersInRoom(newUser.roomId);

      // add user to user map + room
      userService.addUser(socket.id, newUser);
      const user = roomService.addUserToRoom(socket.id, newUser);

      // clean data before returning to client
      const cleanUser = userService.cleanUser(user);

      // broadcast new user to all clients (not including sender) in current room
      socket.broadcast.to(cleanUser.roomId).emit(SocketEvents.NEW_USER_JOIN, {
        newUser: cleanUser
      });

      // add user to current room
      socket.join(cleanUser.roomId);

      callback({
        user: cleanUser,
        usersInRoom,
        usersInQueue,
      });
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      callback({ error: error.message });
    }
    printAppState();
  });

  socket.on(SocketEvents.ENQUEUE, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.ENQUEUE} event received`, data);
    try {
      const { userId, roomId } = toSocketData(data);

      const enqueuedUser = roomService.enqueueUser(userId, roomId);
      const cleanUser = userService.cleanUser(enqueuedUser);

      // broadcast new queue user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.ENQUEUE, {
        enqueuedUser: cleanUser
      });

      callback({
        enqueuedUser: cleanUser // TODO rename to newqueue user, have to change in client side too
      });
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      callback({ error: error.message });
    }
    printAppState();
  });

  socket.on(SocketEvents.DEQUEUE, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.DEQUEUE} event received`, data);
    try {
      const { userId, roomId } = toSocketData(data);

      const dequeuedUser = roomService.dequeueUser(userId, roomId);
      const cleanUser = userService.cleanUser(dequeuedUser);

      // broadcast dequeued user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.DEQUEUE, {
        dequeuedUser: cleanUser
      });

      callback({
        dequeuedUser: cleanUser
      });
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      callback({ error: error.message });
    }
    printAppState();
  });

  socket.on(SocketEvents.UPDATE_USER, (data, callback: AckCallback) => {
    logger.event(`${SocketEvents.UPDATE_USER} event received`, data);
    try {
      const cleanUser = toCleanUser(data);

      const updatedUser = roomService.updateUserInRoom(cleanUser);
      const cleanUpdatedUser = toCleanUser(updatedUser); // TODO redundant? just return cleanUser?

      // broadcast updated user to all clients (not including sender) in current room
      socket.broadcast.to(updatedUser.roomId).emit(SocketEvents.UPDATE_USER, {
        updatedUser: cleanUpdatedUser
      });

      callback({
        updatedUser: cleanUpdatedUser
      });
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      callback({ error: error.message });
    }
    printAppState();
  });

  socket.on(SocketEvents.DISCONNECT, () => {
    logger.event(`${SocketEvents.DISCONNECT} event received`);
    console.log(`current number of users connected: ${--connectCounter}`);

    try {
      // remove user from user map + room
      const minUser = userService.removeUser(socket.id);
      const user = roomService.removeUserFromRoom(socket.id, minUser.roomId);

      // clean data before returning to client TODO this is redundant?
      const cleanUser = userService.cleanUser(user);

      // delete room from memory if its empty
      // we check for development env b/c it's annoying to have rooms be deleted everytime client refreshes after changes
      if (process.env.NODE_ENV !== 'development' && roomService.getUsersInRoom(cleanUser.roomId).length === 0) {
        roomService.removeRoom(cleanUser.roomId);
      }

      // broadcast user left to all clients (not including sender) in current room
      io.in(cleanUser.roomId).emit(SocketEvents.LEAVE, {
        leftUser: cleanUser
      });
    } catch (e) {
      // TODO this line will usually hit when a user who hasn't signed up disconnects, maybe emit LEAVE from client side?
      const error = e as Error;
      logger.error(error.message);
    }
    printAppState();
  });
});

// boot up server
server.listen(config.PORT, () => {
  logger.info(`Server starting on port ${config.PORT}`);
});