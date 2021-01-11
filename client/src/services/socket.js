import io from 'socket.io-client';

export const SocketEvents = Object.freeze({
  JOIN: 'join',
  LEAVE: 'leave',
  CREATE_ROOM: 'create_room',
  DISCONNECT: 'disconnect',
  ENQUEUE: 'enqueue',
  DEQUEUE: 'dequeue',
  TRY_ADMIN_STATUS: 'try_admin_status'
});

const socket = io();

export default socket;