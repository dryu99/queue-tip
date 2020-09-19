const http = require('http');
const socketio = require('socket.io');
const app = require('./app');
const config = require('./config');
const userService = require('./services/userService');
const roomService = require('./services/roomService');
const { SocketEvents } = require('../../config/common');

const server = http.createServer(app);
const io = socketio(server);

const printAppState = () => {
  console.log('--- SERVER STATE ---');
  console.log('  USERS: ', userService.getAllUsers());
  console.log('  ROOMS: ', roomService.getAllRooms().map(r => ({
    id: r.id,
    name: r.name,
    users: r.users.map(u => u.name),
    queue: r.queue.map(q => q.name),
  })));
};

io.on('connection', (socket) => {
  console.log('<EV> a user has connected!');
  printAppState();

  socket.on(SocketEvents.CREATE_ROOM, ({ roomId, roomName }, callback) => {
    console.log('<EV> create room event received', roomId);
    try {
      const room = roomService.putRoom(roomId, { id: roomId, name: roomName });
      callback({ room, event: SocketEvents.CREATE_ROOM });
    } catch (e) {
      callback({ error: e, event: SocketEvents.CREATE_ROOM });
    }
    printAppState();
  });

  socket.on(SocketEvents.JOIN, ({ name, roomId }, callback) => {
    console.log('<EV> join event received', { name, roomId });
    try {
      const user = { id: socket.id, name, roomId };

      // const room = roomService.getRoom(roomId);
      const usersInRoom = roomService.getUsersInRoom(roomId);
      userService.addUser(user);

      const usersInQueue  = roomService.getQueuedUsersInRoom(roomId);

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
      callback(e);
    }
  });

  socket.on(SocketEvents.ROOM_CHECK, ({ roomId }, callback) => {
    console.log('<EV> room check event received', roomId);
    try {
      callback({
        room: roomService.getRoom(roomId),
        event: SocketEvents.ROOM_CHECK
      });
    } catch (e) {
      callback({ error: e });
    }
  });

  socket.on('disconnect', () => {
    console.log('<EV> a user had disconnected!');
    try {
      const user = userService.removeUser(socket.id);

      // broadcast user left to all clients (not including sender) in current room
      io.in(user.roomId).emit(SocketEvents.LEAVE, {
        leftUser: user
      });

      printAppState();
    } catch (error) {
      console.error(error.message);
    }
  });

});

// boot up server
server.listen(config.PORT, () => {
  console.log(`Server starting on port ${config.PORT}`);
});