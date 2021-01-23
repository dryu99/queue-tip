import { describe, beforeEach, afterEach, expect, test } from '@jest/globals';

import ioServer from 'socket.io';
import ioClient from 'socket.io-client';

import SocketManager from '../src/models/SocketManager';
import roomService from '../src/services/roomService';
import { CleanUser, JoinRequestData, JoinResponseData, NewRoom, NewUser, SocketEvents, User } from '../src/types';

const socketUrl = 'http://localhost:5000';
const socketOptions: SocketIOClient.ConnectOpts = {
  transports: ['websocket'],
  forceNew: true
};

describe('socket.io integration tests', () => {
  let server: SocketIO.Server;
  let socketManager: SocketManager;
  let client: SocketIOClient.Socket;

  beforeEach(() => {
    // initialize server, client, and socket handlers
    server = ioServer().listen(5000);
    socketManager = new SocketManager(server);
    socketManager.initHandlers();
    client = ioClient.connect(socketUrl, socketOptions);
  });

  afterEach(() => {
    // close connections on client and server to isolate tests
    server.close();
    client.close();
  });

  describe(SocketEvents.CONNECT, () => {
    test('client and server sockets should connect', (done) => {
      client.on(SocketEvents.CONNECT, () => {
        expect(client.connected).toBe(true);
        client.disconnect();
        done();
      });
    });
  });

  describe(SocketEvents.JOIN, () => {
    test('SUCCESS: new user should be added to empty room', (done) => {
      // setup room on server
      const newRoom: NewRoom = {
        name: 'CPSC 110 Office Hours',
        adminPassword: '110'
      };
      const room = roomService.addRoom(newRoom);

      client.on(SocketEvents.CONNECT, () => {
        // setup event data
        const newUser: NewUser = {
          name: 'John',
          isAdmin: false
        };
        const reqData: JoinRequestData = {
          roomId: room.id,
          newUser
        };

        // setup expected results
        const expectedUser: CleanUser = {
          ...newUser,
          id: client.id
        };

        // emit event from client
        client.emit(SocketEvents.JOIN, reqData, (resData: JoinResponseData) => {
          const { user, queue, userCount, error } = resData;
          expect(user).toEqual(expectedUser);
          expect(queue).toHaveLength(0);
          expect(userCount).toBe(1);
          expect(error).toBeUndefined();
          done();
        });
      });
    });

    test('SUCCESS: new user should be added to filled room', (done) => {
      // setup room on server
      const newRoom: NewRoom = {
        name: 'CPSC 110 Office Hours',
        adminPassword: '110'
      };
      const room = roomService.addRoom(newRoom);

      // setup users on server
      const dummyUsers: User[] = [
        { id: '1', name: 'Jessica', isAdmin: false },
        { id: '2', name: 'Sam', isAdmin: true },
        { id: '3', name: 'Kenny', isAdmin: false },
      ];

      for (const dummyUser of dummyUsers) {
        room.addUser(dummyUser);
      }

      room.addQueueUser(dummyUsers[0]);
      room.addQueueUser(dummyUsers[2]);

      client.on(SocketEvents.CONNECT, () => {
        // setup event data
        const newUser: NewUser = {
          name: 'John',
          isAdmin: false
        };
        const reqData: JoinRequestData = {
          roomId: room.id,
          newUser
        };

        // setup expected results
        const expectedUser: CleanUser = {
          ...newUser,
          id: client.id
        };

        // emit event from client
        client.emit(SocketEvents.JOIN, reqData, (resData: JoinResponseData) => {
          const { user, queue, userCount, error } = resData;
          expect(user).toEqual(expectedUser);
          expect(queue).toHaveLength(2);
          expect(userCount).toBe(4);
          expect(error).toBeUndefined();
          done();
        });
      });
    });
  });
});
