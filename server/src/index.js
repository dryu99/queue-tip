const http = require('http');
const app = require('./app');
const config = require('./config');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('a user has connected!');

  socket.on('disconnect', () => {
    console.log('a user had disconnected!');
  });
});

// boot up server
server.listen(config.PORT, () => {
  console.log(`Server starting on port ${config.PORT}`);
});