import io from 'socket.io-client';
const SERVER_URL = 'localhost:3003';

const socket = io(SERVER_URL);

export const emitCreateRoom = (newRoom, callback) => {
  socket.emit(SocketEvents.CREATE_ROOM, newRoom, callback);
};

export const emitCheckRoom = (roomId, callback) => {
  socket.emit(SocketEvents.ROOM_CHECK, { roomId }, callback);
};

export const SocketEvents = Object.freeze({
  JOIN: 'join',
  CREATE_ROOM: 'create_room',
  DISCONNECT: 'disconnect',
  LEAVE: 'leave',
  NEW_USER_JOIN: 'new_user_join',
  ROOM_CHECK: 'room_check',
  ENQUEUE: 'enqueue',
  DEQUEUE: 'dequeue',
});

export default socket;