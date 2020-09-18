// map, key = room id, val = room data
const rooms = {};

const putRoom = (id, room) => {
  if (!rooms[id]) {
    rooms[id] = room;
  }

  return rooms[id];
};

const getRoom = (id) => {
  if (!rooms[id]) {
    throw new Error(`room ${id} doesn't exist`);
  }
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