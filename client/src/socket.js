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

export const emitTryAdminStatus = (data, callback) => {
  socket.emit(SocketEvents.TRY_ADMIN_STATUS, data, callback);
};

export const SocketEvents = Object.freeze({
  JOIN: 'join',
  LEAVE: 'leave',
  CREATE_ROOM: 'create_room',
  DISCONNECT: 'disconnect',
  ROOM_CHECK: 'room_check',
  ENQUEUE: 'enqueue',
  DEQUEUE: 'dequeue',
  TRY_ADMIN_STATUS: 'try_admin_status'
});

export default socket;