const http = require('http');
const socketio = require('socket.io');
const { v4: uuidv4 } = require('uuid');
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

  // should generate uuid on server not client
  socket.on(SocketEvents.CREATE_ROOM, ({ roomId, roomName }, callback) => {
    logger.event(`${SocketEvents.CREATE_ROOM} event received`, roomId);
    try {
      const room = roomService.putRoom(roomId, { id: roomId, name: roomName });
      const cleanRoom = roomService.cleanRoom(room);

      callback({ room: cleanRoom, event: SocketEvents.CREATE_ROOM });
    } catch (e) {
      callback({ error: e.message, event: SocketEvents.CREATE_ROOM });
    }
    printAppState();
  });

  socket.on(SocketEvents.JOIN, ({ name, type, id, roomId }, callback) => {
    logger.event(`${SocketEvents.JOIN} event received`, { name, type, roomId });
    try {
      const user = {
        id: id || uuidv4(), // randomly generate one if id isn't given
        socketId: socket.id,
        name,
        type,
        roomId
      };

      const usersInRoom = roomService.getUsersInRoom(roomId);
      const usersInQueue  = roomService.getQueuedUsersInRoom(roomId);

      userService.addUser(user);

      const cleanUser = userService.cleanUser(user);

      // broadcast new user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.NEW_USER_JOIN, {
        newUser: cleanUser
      });

      // add user to current room
      socket.join(roomId);

      printAppState();
      callback({
        user: cleanUser,
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
      const room = roomService.getRoom(roomId);
      const cleanRoom = roomService.cleanRoom(room);

      callback({
        room: cleanRoom,
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
      const cleanUser = userService.cleanUser(user);

      // broadcast new queue user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.ENQUEUE, {
        enqueuedUser: cleanUser
      });

      printAppState();
      callback({
        enqueuedUser: cleanUser // TODO rename to newqueue user, have to change in client side too
      });
    } catch (e) {
      callback({ error: e.message });
    }
  });

  socket.on(SocketEvents.DEQUEUE, ({ userId, roomId }, callback) => {
    logger.event(`${SocketEvents.DEQUEUE} event received`);
    try {
      const dequeuedUser = roomService.dequeueUser(userId, roomId);
      const cleanUser = userService.cleanUser(dequeuedUser);

      // broadcast dequeued user to all clients (not including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.DEQUEUE, {
        dequeuedUser: cleanUser
      });

      printAppState();
      callback({
        dequeuedUser: cleanUser
      });
    } catch (e) {
      callback({ error: e.message });
    }
  });

  socket.on(SocketEvents.DISCONNECT, (data) => {
    logger.event(`${SocketEvents.DISCONNECT} event received`, data);

    try {
      const user = userService.removeUser(socket.id);
      const cleanUser = userService.cleanUser(user);

      // delete room from memory if its empty
      // we check for development env b/c it's annoying to have rooms be deleted everytime client refreshes after changes
      if (process.env.NODE_ENV !== 'development' && roomService.getUsersInRoom(user.roomId).length === 0) {
        roomService.removeRoom(user.roomId);
      }

      // broadcast user left to all clients (not including sender) in current room
      io.in(user.roomId).emit(SocketEvents.LEAVE, {
        leftUser: cleanUser
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