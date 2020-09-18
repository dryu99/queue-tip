// map, key = room id, val = room data
const rooms = {};

const putRoom = (id, room) => {
  if (!rooms[id]) {
    rooms[id] = room;
  }
};

const getRoom = (id) => {
  return rooms[id];
};

const getAllRooms = () => {
  return rooms;
};

module.exports = {
  putRoom,
  getRoom,
  getAllRooms
};