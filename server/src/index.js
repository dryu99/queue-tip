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
  console.log('  ROOMS: ', roomService.getAllRooms());
};

io.on('connection', (socket) => {
  console.log('<EV> a user has connected!');
  printAppState();

  socket.on(SocketEvents.CREATE_ROOM, (data, callback) => {
    console.log('<EV> create room event received', data);
    roomService.putRoom(data.roomId, { name: data.roomName });
    printAppState();
  });

  socket.on(SocketEvents.JOIN, ({ name, roomId }, callback) => {
    console.log('<EV> join event received', { name, roomId });
    try {
      const usersInRoom = userService.getUsersInRoom(roomId);
      const user = userService.addUser({ id: socket.id, name, roomId });

      // broadcast new user to all clients (including sender) in current room
      socket.broadcast.to(roomId).emit(SocketEvents.NEW_USER_JOIN, {
        newUser: user
      });

      // add current user to current room
      socket.join(roomId);

      printAppState();
      callback({
        user,
        usersInRoom
      });
    } catch (e) {
      callback(e);
    }

    // try {
    // const user = userService.addUser({ id: socket.id, userName, room });

    //   // emit message to new client
    //   socket.emit('message', {
    //     userType: 'admin',
    //     text: `${user.userName}, welcome to the room ${user.room}`
    //   });

    //   // broadcast message to all clients in current room
    //   socket.broadcast.to(user.room.id).emit('message', {
    //     userType: 'admin',
    //     text: `${user.userName}, has joined the room!`
    //   });

    //   // join socket room
    //   socket.join(user.room.id);
    //   console.log(user);
    //   callback(user);
    // } catch (e) {
    //   callback(e);
    // }
  });

  socket.on('disconnect', () => {
    console.log('<EV> a user had disconnected!');
    try {
      const user = userService.removeUser(socket.id);

      io.in(user.roomId).emit(SocketEvents.LEAVE, {
        user
      });

      printAppState();
    } catch (error) {
      console.log('o no');
    }
  });

});

// boot up server
server.listen(config.PORT, () => {
  console.log(`Server starting on port ${config.PORT}`);
});