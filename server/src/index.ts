import http from 'http';
import socketio from 'socket.io';

import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import SocketService from './models/SocketService';

const server = http.createServer(app);
const io = socketio(server, {
  pingTimeout: 300000 // should handle random disconnects on idle clients (https://github.com/socketio/socket.io/issues/3259)
});

const socketService = new SocketService(io);
socketService.initHandlers();

// boot up server
server.listen(config.PORT, () => {
  logger.info(`Server starting on port ${config.PORT}`);
});