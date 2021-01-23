import { nanoid } from 'nanoid';
import Room from '../models/Room';
import { NewRoom } from '../types';

// We cache live room metadata in this map so new clients can init their rooms properly.
// key = id, val = Room
const rooms = new Map<string, Room>();

const addRoom = (newRoom: NewRoom): Room => {
  const newId = nanoid(8);

  if (rooms.has(newId)) {
    throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
  }

  const room = new Room(newId, newRoom.name, newRoom.adminPassword);
  rooms.set(room.id, room);

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

  rooms.delete(id);
};

export default {
  addRoom,
  removeRoom,
  getRoom,
  getAllRooms,
};