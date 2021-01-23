import http from 'http';
import mongoose from 'mongoose';
import socketio from 'socket.io';

import app from './app';
import config from './utils/config';
import logger from './utils/logger';
import SocketManager from './models/SocketManager';

// set up database connection
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Successfully connected to MongoDB');
  })
  .catch((error: Error) => {
    logger.error('Error connecting to MongoDB', error.message);
  });

// set up server
const server = http.createServer(app);

// set up sockets
const io = socketio(server, {
  // should handle random disconnects on idle clients
  // (https://github.com/socketio/socket.io/issues/3259)
  pingTimeout: 300000
});

const socketManager = new SocketManager(io);
socketManager.initHandlers();

// boot up server
server.listen(config.PORT, () => {
  logger.info(`Server starting on port ${config.PORT}`);
});