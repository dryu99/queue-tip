import { describe, beforeEach, beforeAll, afterEach, afterAll, expect, test } from '@jest/globals';

import http from 'http';
import ioBack from 'socket.io';
import { AddressInfo } from 'net';
import io from 'socket.io-client';


let socket: SocketIOClient.Socket;
let httpServer: http.Server;
let httpServerAddr: AddressInfo;
let ioServer: ioBack.Server;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.address() as AddressInfo;
  ioServer = ioBack(httpServer);
  done();
});


/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  httpServer.close();
  done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    // 'reconnection delay': 0,
    reconnectionDelay: 0,
    // 'reopen delay': 0,
    // 'force new connection': true,
    // transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('OIOIOIOI');
    done();
  });
});

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});


describe('basic socket.io example', () => {
  test('should communicate', (done) => {
    // once connected, emit Hello World
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });
  test('should communicate with waiting for socket.io handshakes', (done) => {
    // Emit sth from Client do Server
    socket.emit('examlpe', 'some messages');
    // Use timeout to wait for socket.io server handshakes
    setTimeout(() => {
      // Put your server side expect() here
      done();
    }, 50);
  });
});