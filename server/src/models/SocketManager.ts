import { SocketEvents, AcknowledgementCallback as AckCallback, EventData } from '../types';
import { parseString, toCleanRoom, toNewRoom, toNewUser, toUser } from '../utils';
import logger from '../utils/logger';
import roomService from '../services/roomService';

export default class SocketManager {
  private io: SocketIO.Server;

  constructor(io: SocketIO.Server) {
    this.io = io;
  }

  // initialize all socket event handlers
  public initHandlers(): void {
    this.io.on(SocketEvents.CONNECTION, (socket) => {
      logger.event(SocketEvents.CONNECTION);
      logger.printAppState();

      // TODO would love to just use an HTTP request to handle this but we need socket id.
      // Create a new room and cache on server
      socket.on(SocketEvents.CREATE_ROOM, (data: EventData, callback: AckCallback) => {
        this.handleSocketEvent(SocketEvents.CREATE_ROOM, data, callback, () => {
          const newRoom = toNewRoom(data.newRoom);
          const room = roomService.addRoom(newRoom);

          const newUser = toNewUser(data.newUser);
          const user = toUser({ ...newUser, id: socket.id });

          // have admin user join room
          socket.join(room.id);
          room.addUser(user);

          // send back relevant room and user data to sender
          const cleanRoom = toCleanRoom(room);
          callback({ room: cleanRoom, user });
        });
      });

      // Let other clients know new user has joined the room
      socket.on(SocketEvents.JOIN, (data: EventData, callback: AckCallback) => {
        this.handleSocketEvent(SocketEvents.JOIN, data, callback, () => {
          const roomId = parseString(data.roomId);
          const room = roomService.getRoom(roomId);

          const newUser = toNewUser(data.newUser);
          const user = toUser({ ...newUser, id: socket.id });

          // have user join room
          socket.join(roomId);
          room.addUser(user);

          // broadcast new user to all clients in room except sender
          socket.broadcast.to(roomId).emit(
            SocketEvents.JOIN,
            { newUser: user }
          );

          // send back relevant room data to sender so they can init room state
          callback({ user, queue: room.queue, userCount: room.users.length });
        });
      });

      // Enqueue user in specified room.
      socket.on(SocketEvents.ENQUEUE, (data: EventData, callback: AckCallback) => {
        this.handleSocketEvent(SocketEvents.ENQUEUE, data, callback, () => {
          const roomId = parseString(data.roomId);
          const room = roomService.getRoom(roomId);
          const user = toUser(data.user);

          // enqueue user
          room.queue.push(user);

          // broadcast new enqueued user to all clients in room including sender
          this.io.in(roomId).emit(
            SocketEvents.ENQUEUE,
            { enqueuedUser: user }
          );
        });
      });

      // Dequeue user in specified room.
      socket.on(SocketEvents.DEQUEUE, (data: EventData, callback: AckCallback) => {
        this.handleSocketEvent(SocketEvents.DEQUEUE, data, callback, () => {
          const roomId = parseString(data.roomId);
          const room = roomService.getRoom(roomId);

          // dequeue user
          const user = room.queue.shift();

          if (user) {
            // broadcast dequeued user to all clients in room including sender
            this.io.in(roomId).emit(
              SocketEvents.DEQUEUE,
              { dequeuedUserId: user.id }
            );
          } else {
            logger.error(`Room ${roomId} was empty, couldn't dequeue.`);
          }
        });
      });

      // Broadcast to other clients in room about disconnect, and delete room if empty
      socket.on(SocketEvents.DISCONNECTING, () => {
        try {
          logger.event(SocketEvents.DISCONNECTING);
          const socketSids = Object.keys(this.io.sockets.adapter.sids[socket.id]);

          // if length > 1, socket was in a room
          if (socketSids.length > 1) {
            // NOTE: this logic assumes that the user will be in 1 room max at a time
            const roomId = socketSids[1];
            const room = roomService.getRoom(roomId);

            // update user count
            room.removeUser(socket.id);

            // broadcast disconnected user to all clients in room except sender
            socket.broadcast.to(roomId).emit(
              SocketEvents.LEAVE,
              { disconnectedUserId: socket.id }
            );

            // delete room from memory if it is empty
            const socketRoom = this.io.sockets.adapter.rooms[roomId];
            if (!socketRoom || socketRoom.length === 1) {
              logger.info(`Room ${roomId} is empty now, deleting from memory...`);
              roomService.removeRoom(roomId);
            }
          }
        } catch (e) {
          const error = e as Error;
          logger.error(error);
        }

        logger.printAppState();
      });
    });
  }

  // executes given event handler and uses acknowledgement callback to send error back to client on failure
  // this is what every socket handler should call to keep consistency.
  private handleSocketEvent(
    event: string,
    data: unknown,
    callback: AckCallback,
    eventHandler: () => void
  ) {
    try {
      logger.event(`${event} event received`, data);

      if (data === null || data === undefined) {
        throw Error('event data was null or undefined');
      }

      eventHandler();
    } catch (e) {
      const error = e as Error;
      logger.error(error);
      callback({ error: error.message });
    }

    logger.printAppState();
  }
}