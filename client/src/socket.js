import io from 'socket.io-client';

const socket = io();

export const emitCreateRoom = (newRoom, callback) => {
  socket.emit(SocketEvents.CREATE_ROOM, newRoom, callback);
};

export const emitCheckRoom = (roomId, callback) => {
  socket.emit(SocketEvents.ROOM_CHECK, { roomId }, callback);
};

export const emitEnqueue = (data, callback) => {
  socket.emit(SocketEvents.ENQUEUE, data, callback);
};

export const emitDequeue = (data, callback) => {
  socket.emit(SocketEvents.DEQUEUE, data, callback);
};

export const emitJoin = (data, callback) => {
  socket.emit(SocketEvents.JOIN, data, callback);
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
  UPDATE_USER: 'update_user'
});

export default socket;