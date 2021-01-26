import { nanoid } from 'nanoid';
import MongoRoom from '../models/MongoRoom';
import Room from '../models/Room';
import { NewRoom } from '../types';
import logger from '../utils/logger';

// We cache live room metadata in this map so new clients can init their rooms properly.
// key = id, val = Room
const rooms = new Map<string, Room>();

const addRoom = (newRoom: NewRoom): Room => {
  const newId = nanoid(8);

  if (rooms.has(newId)) {
    throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
  }

  // save room in memory
  const room = new Room(newId, newRoom.name, newRoom.adminPassword);
  rooms.set(room.id, room);

  // save room in db
  _saveRoomInDatabase(room);

  return room;
};

const getRoom = (id: string): Room => {
  if (!rooms.has(id)) {
    throw new Error(`room ${id} doesn't exist`);
  }
  return rooms.get(id) as Room; // TODO change signature to Room | null
};

const getAllRooms = (): Room[] => {
  return Array.from(rooms.values());
};

// TODO change output to boolean
const removeRoom = (id: string): void => {
  if (!rooms.has(id)) {
    throw new Error(`room ${id} doesn't exist`);
  }

  _updateRoomInDatabase(id);

  // delete room from memory
  rooms.delete(id);
};

// TODO make another abstraction for db fns
const _saveRoomInDatabase = (room: Room) => {
  const mongoRoom = new MongoRoom({
    id: room.id,
    name: room.name,
    totalUsersJoined: room.totalUsersJoined
  });

  mongoRoom.save()
    .then(() => logger.info(`Room '${room.name}' saved to database.`))
    .catch(() => logger.error(`Room '${room.name}' couldn't be saved to database.`));
};

const _updateRoomInDatabase = (id: string) => {
  const room = rooms.get(id) as Room;
  const updatedRoomData = {
    totalUsersJoined: room.totalUsersJoined
  };

  // can't find by mongo id b/c we don't save mongo id in memory
  MongoRoom.findOneAndUpdate({ id }, updatedRoomData)
    .then(() => logger.info(`Room '${room.name}' updated in database.`))
    .catch(() => logger.error(`Room '${room.name}' couldn't be updated to database.`));
};

export default {
  addRoom,
  removeRoom,
  getRoom,
  getAllRooms,
};