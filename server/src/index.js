const http = require('http');
const socketio = require('socket.io');
const app = require('./app');
const config = require('./config');
const logger = require('./logger');
const userService = require('./services/userService');
const roomService = require('./services/roomService');
const { SocketEvents } = require('../../config/common');

const server = http.createServer(app);
const io = socketio(server);

const printAppState = () => {
  logger.info('--- SERVER STATE ---');
  logger.info('USERS: ', userService.getAllUsers());
  logger.info('ROOMS: ', roomService.getAllRooms().map(r => ({
    id: r.id,
    name: r.name,
    users: r.users.map(u => u.name),
    queue: r.queue.map(q => q.name),
  })));
  logger.info('--------------------');
};

io.on('connection', (socket) => {
  logger.event('a user has connected!');
  printAppState();

  socket.on(SocketEvents.CREATE_ROOM, ({ roomId, roomName }, callback) => {
    logger.event(`${SocketEvents.CREATE_ROOM} event received`, roomId);
    try {
      const room = roomService.putRoom(roomId, { id: roomId, name: roomName });
      callback({ room, event: SocketEvents.CREATE_ROOM });
    } catch (e) {
      callback({ error: e.message, event: SocketEvents.CREATE_ROOM });
    }
    printAppState();
  });

  socket.on(SocketEvents.JOIN, ({ name, roomId }, callback) => {
    logger.event(`${SocketEvents.JOIN} event received`, { name, roomId });
    try {
      const user = { id: socket.id, name, roomId };
      const usersInRoom = roomService.getUsersInRoom(roomId);
      const usersInQueue  = roomService.getQueuedUsersInRoom(roomId);

      userService.addUser(user);

      // broadcast new user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.NEW_USER_JOIN, {
        newUser: user
      });

      // add user to current room
      socket.join(roomId);

      printAppState();
      callback({
        user,
        usersInRoom,
        usersInQueue,
      });
    } catch (e) {
      callback({ error: e.message });
    }
  });

  socket.on(SocketEvents.ROOM_CHECK, ({ roomId }, callback) => {
    logger.event(`${SocketEvents.ROOM_CHECK} event received`, roomId);
    try {
      callback({
        room: roomService.getRoom(roomId),
        event: SocketEvents.ROOM_CHECK
      });
    } catch (e) {
      callback({ error: e.message });
    }
  });

  socket.on(SocketEvents.ENQUEUE, ({ user, roomId }, callback) => {
    // TODO would be nice to do some kind of validation here to make sure user is a user lol typescript bb
    logger.event(`${SocketEvents.ENQUEUE} event received`);
    try {
      // TODO kinda unnecessary since user has roomId, but w/e
      roomService.enqueueUser(user, roomId);
      // const usersInQueue = roomService.getQueuedUsersInRoom(roomId);

      // broadcast new queue user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.ENQUEUE, {
        newQueueUser: user
      });

      printAppState();
      callback({
        user // TODO rename to newqueue user, have to change in client side too
      });
    } catch (e) {
      callback({ error: e.message });
    }
  });

  socket.on(SocketEvents.DEQUEUE, ({ roomId }, callback) => {
    logger.event(`${SocketEvents.DEQUEUE} event received`);
    try {
      const dequeuedUser = roomService.dequeueUser(socket.id, roomId);

      // broadcast dequeued user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.DEQUEUE, {
        dequeuedUser
      });

      printAppState();
      callback({
        dequeuedUser
      });
    } catch (e) {
      callback({ error: e.message });
    }
  });

  socket.on(SocketEvents.DISCONNECT, () => {
    logger.event(`${SocketEvents.DISCONNECT} event received`);

    try {
      const user = userService.removeUser(socket.id);

      // delete room from memory if its empty
      if (roomService.getUsersInRoom(user.roomId).length === 0) {
        roomService.removeRoom(user.roomId);
      }

      // broadcast user left to all clients (not including sender) in current room
      io.in(user.roomId).emit(SocketEvents.LEAVE, {
        leftUser: user
      });

      printAppState();
    } catch (error) {
      // TODO this line will usually hit when a user who hasn't signed up disconnects, maybe emit LEAVE from client side?
      console.error(error.message);
    }
  });
});

// boot up server
server.listen(config.PORT, () => {
  logger.info(`Server starting on port ${config.PORT}`);
});