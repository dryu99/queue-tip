/**
 * @typedef Room
 * @property {string} id
 * @property {string} name
 * @property {object[]} users
 * @property {object[]} queue
 */

/**
 * Description
 * @type {Map<string, Room>}
 */
// eslint-disable-next-line no-undef
const rooms = new Map();

const putRoom = (id, room) => {
  if (rooms.has(id)) {
    throw new Error('Room already exists, uuid fudged up somehow');
  }

  const roomData = {
    id: room.id,
    name: room.name,
    users: [],
    queue: []
  };

  rooms.set(id, roomData);

  return roomData;
};

/**
 * fdsfds
 * @param {string} id
 * @returns {Room}
 */
const getRoom = (id) => {
  if (!rooms.has(id)) {
    throw new Error(`room ${id} doesn't exist`);
  }
  return rooms.get(id);
};

/**
 * @returns {Room[]}
 */
const getAllRooms = () => {
  // eslint-disable-next-line no-undef
  return Array.from(rooms.values());
};

const getUsersInRoom = (roomId) => {
  return [...getRoom(roomId).users];
};

const getQueuedUsersInRoom = (roomId) => {
  return [...getRoom(roomId).queue];
};

module.exports = {
  putRoom,
  getRoom,
  getAllRooms,
  getUsersInRoom,
  getQueuedUsersInRoom
};