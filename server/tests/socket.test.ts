import { describe, beforeEach, afterEach, expect, test } from '@jest/globals';

import ioServer from 'socket.io';
import ioClient from 'socket.io-client';

import SocketManager from '../src/services/SocketManager';
import RoomManager from '../src/services/RoomManager';
import { JoinRequestData, JoinEmitResponseData, NewRoom, NewUser, SocketEvents, User, JoinOnResponseData } from '../src/types';

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

    // delete rooms
    RoomManager.clear();
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
    describe('emitting client POV', () => {
      test('SUCCESS: new user should be added to empty room', (done) => {
        // setup room on server
        const room = _initTestRoom();

        client.on(SocketEvents.CONNECT, () => {
          // setup event data
          const newUser = _createTestNewUser('John');
          const reqData: JoinRequestData = { roomId: room.id,newUser };

          // setup expected results
          const expectedUser = _createTestUser(client.id, newUser.name, newUser.isAdmin);

          // emit event from client
          client.emit(SocketEvents.JOIN, reqData, (resData: JoinEmitResponseData) => {
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
        const room = _initTestRoom();

        // setup users on server
        const dummyUsers: User[] = [
          _createTestUser('1', 'Jessica'),
          _createTestUser('2','Sam', true),
          _createTestUser('3','Kenny'),
        ];

        for (const dummyUser of dummyUsers) {
          room.addUser(dummyUser);
        }

        const dummyQueueUsers: User[] = [
          dummyUsers[0],
          dummyUsers[2]
        ];

        for (const dummyQueueUser of dummyQueueUsers) {
          room.addQueueUser(dummyQueueUser);
        }

        client.on(SocketEvents.CONNECT, () => {
          // setup event data
          const newUser = _createTestNewUser('John');
          const reqData: JoinRequestData = { roomId: room.id, newUser };

          // setup expected results
          const expectedUser = _createTestUser(client.id, newUser.name, newUser.isAdmin);

          // emit event from client
          client.emit(SocketEvents.JOIN, reqData, (resData: JoinEmitResponseData) => {
            const { user, queue, userCount, error } = resData;
            expect(user).toEqual(expectedUser);
            expect(queue).toHaveLength(dummyQueueUsers.length);
            expect(userCount).toBe(dummyUsers.length + 1);
            expect(error).toBeUndefined();
            done();
          });
        });
      });

      // TODO need to add error types so we can get more specific errors
      test('FAIL: tried to join nonexistent room', (done) => {
        client.on(SocketEvents.CONNECT, () => {
          _initTestRoom();

          // setup event data
          const newUser = _createTestNewUser('John');
          const reqData = { roomId: '123123', newUser };

          // emit event from client
          client.emit(SocketEvents.JOIN, reqData, (resData: JoinEmitResponseData) => {
            const { user, error } = resData;
            expect(error).not.toBeUndefined();
            expect(user).toBeUndefined();
            done();
          });
        });
      });

      test('FAIL: sent incomplete user data', (done) => {
        client.on(SocketEvents.CONNECT, () => {
          const room = _initTestRoom();

          // setup event data
          const badNewUser = {
            name: 'I am missing some props'
          };
          const reqData = { roomId: room.id, newUser: badNewUser };

          // emit event from client
          client.emit(SocketEvents.JOIN, reqData, (resData: JoinEmitResponseData) => {
            const { user, error } = resData;
            expect(error).not.toBeUndefined();
            expect(user).toBeUndefined();
            done();
          });
        });
      });

      test('FAIL: tried to add user with same name', (done) => {
        client.on(SocketEvents.CONNECT, () => {
          const room = _initTestRoom();

          // emit user1 join
          const newUser1 = _createTestNewUser('John');
          const reqData1 = { roomId: room.id, newUser: newUser1 };

          client.emit(SocketEvents.JOIN, reqData1, (resData: JoinEmitResponseData) => {
            const { user, error } = resData;
            expect(user).not.toBeUndefined();
            expect(error).toBeUndefined();

            // emit user2 join
            const newUser2 = _createTestNewUser('John');
            const reqData2 = { roomId: room.id, newUser: newUser2 };

            client.emit(SocketEvents.JOIN, reqData2, (resData: JoinEmitResponseData) => {
              const { user, error } = resData;
              expect(user).toBeUndefined();
              expect(error).not.toBeUndefined();
              done();
            });
          });
        });
      });
    });

    describe('receiving client POV', () => {
      test('SUCCESS: different client already in room receives JOIN event from server', (done) => {
        // setup 2nd client
        const client2 = ioClient.connect(socketUrl, socketOptions);

        // setup room on server
        const room = _initTestRoom();

        // listen for join event from 2nd client
        client.on(SocketEvents.JOIN, (resData: JoinOnResponseData) => {
          expect(resData.newUser.name).toEqual('Bob');
          client.close(); // close all extra clients
          done();
        });

        client.on(SocketEvents.CONNECT, () => {
          const newUser = _createTestNewUser('John');
          const reqData: JoinRequestData = { roomId: room.id, newUser };

          // have 1st client join room
          client.emit(SocketEvents.JOIN, reqData, (_resData: JoinEmitResponseData) => {
            const newUser = _createTestNewUser('Bob');
            const reqData: JoinRequestData = { roomId: room.id, newUser };

            // have 2nd client join room
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            client2.emit(SocketEvents.JOIN, reqData, (_resData: JoinEmitResponseData) => {});
          });
        });
      });
    });
  });

  const _initTestRoom = () => {
    const newRoom: NewRoom = {
      name: 'CPSC 110 Office Hours',
      adminPassword: '110'
    };
    const testRoom = RoomManager.addRoom(newRoom);
    return testRoom;
  };

  const _createTestNewUser = (name: string, isAdmin = false): NewUser => {
    return {
      name,
      isAdmin
    };
  };

  const _createTestUser = (id: string, name: string, isAdmin = false): User => {
    return {
      id,
      name,
      isAdmin
    };
  };
});
