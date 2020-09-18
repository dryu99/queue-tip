import io from 'socket.io-client';
const SERVER_URL = 'localhost:3003';

const socket = io(SERVER_URL);

export const SocketEvents = Object.freeze({
  JOIN: 'join',
  CREATE_ROOM: 'create_room',
  DISCONNECT: 'disconnect',
  LEAVE: 'leave',
  NEW_USER_JOIN: 'new_user_join'
});

export default socket;