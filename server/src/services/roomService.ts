import { nanoid } from 'nanoid';
import { NewRoom, Room } from '../types';

// We cache live room metadata in this map.
const rooms = new Map<string, Room>();

const addRoom = (newRoom: NewRoom): Room => {
  const newId = nanoid(8);

  if (rooms.has(newId)) {
    throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
  }

  const room: Room = {
    id: newId,
    name: newRoom.name,
    adminPassword: newRoom.adminPassword,
    queue: [],
    userCount: 0
  };

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

const verifyAdminPassword = (passwordAttempt: string, roomId: string): boolean => {
  const password = getRoom(roomId).adminPassword;
  return passwordAttempt === password;
};

export default {
  addRoom,
  removeRoom,
  getRoom,
  getAllRooms,
  verifyAdminPassword,
};