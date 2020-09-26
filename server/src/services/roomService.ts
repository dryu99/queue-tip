import { v4 as uuidv4 } from 'uuid';
import { NewRoom, Room, NewUser } from '../types';

const rooms = new Map<string, Room>();

const addRoom = (newRoom: NewRoom): Room => {
  const room: Room = {
    id: uuidv4(), // generate random id
    name: newRoom.name,
    adminPassword: newRoom.adminPassword,
    queue: []
  };

  if (rooms.has(room.id)) {
    throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
  }

  rooms.set(room.id, room);

  return room;
};

// TODO change output to boolean
const removeRoom = (id: string): void => {
  if (!rooms.has(id)) {
    throw new Error(`room ${id} doesn't exist`);
  }

  rooms.delete(id);
};

const removeAllRooms = (): void => {
  rooms.clear();
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

// returns a ref to a new User array (not array linked to room!)
const getQueuedUsersInRoom = (roomId: string): NewUser[] => {
  return [...getRoom(roomId).queue];
};

const enqueueUser = (user: NewUser, roomId: string): void => {
  const queue = getRoom(roomId).queue;

  const existingQueuedUser = queue.find(u => u.name === user.name);
  if (existingQueuedUser) {
    throw new Error(`user ${user.name} already exists in queue in room ${roomId}; couldn't be enqueued`);
  }

  queue.push(user);
};

// TODO rename id param to userId
const dequeueUser = (name: string, roomId: string): NewUser => {
  const queue = getRoom(roomId).queue;

  const index = queue.findIndex(u => u.name === name);
  if (index === -1) {
    throw new Error(`user ${name} doesn't exist in queue in room ${roomId}; couldn't be dequeued`);
  }

  return queue.splice(index, 1)[0];
};

const verifyAdminPassword = (passwordAttempt: string, roomId: string): boolean => {
  const password = getRoom(roomId).adminPassword;
  return passwordAttempt === password;
};

export default {
  addRoom,
  removeRoom,
  removeAllRooms,
  getRoom,
  getAllRooms,
  getQueuedUsersInRoom,
  enqueueUser,
  dequeueUser,
  verifyAdminPassword
};