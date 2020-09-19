const SocketEvents = Object.freeze({
  JOIN: 'join',
  CREATE_ROOM: 'create_room',
  DISCONNECT: 'disconnect',
  LEAVE: 'leave',
  NEW_USER_JOIN: 'new_user_join',
  ROOM_CHECK: 'room_check',
  ENQUEUE: 'enqueue',
  DEQUEUE: 'dequeue',
});

module.exports = {
  SocketEvents
}
