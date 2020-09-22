import { NewRoom, Room, User } from '../types';

const rooms = new Map<string, Room>();

const addRoom = (newRoom: NewRoom): Room => {
  if (rooms.has(newRoom.id)) {
    throw new Error('Room already exists, uuid fudged up somehow');
  }

  const room: Room = {
    id: newRoom.id,
    name: newRoom.name,
    users: [],
    queue: []
  };

  rooms.set(newRoom.id, room);

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

const cleanRoom = (room: Room): NewRoom  => {
  return {
    id: room.id,
    name: room.name
  };
};

const addUserToRoom = (user: User, roomId: string): number => {
  const users = getRoom(roomId).users;

  const existingUser = users.find(u => u.id === user.id);
  if (existingUser) {
    throw new Error(`user ${user.id} already exists in room ${user.roomId}; didn't add.`);
  }

  return users.push(user);
};

const removeUserFromRoom = (socketId: string, roomId: string): User => {
  const users = getRoom(roomId).users;

  const index = users.findIndex(u => u.socketId === socketId);
  if (index === -1) {
    throw new Error(`user with socket id ${socketId} doesn't exist in room ${roomId}; couldn't remove.`);
  }

  return users.splice(index, 1)[0];
};

// returns a ref to a new User array (not array linked to room!)
const getUsersInRoom = (roomId: string): User[] => {
  return [...getRoom(roomId).users];
};

// returns a ref to a new User array (not array linked to room!)
const getQueuedUsersInRoom = (roomId: string): User[] => {
  return [...getRoom(roomId).queue];
};

const enqueueUser = (user: User, roomId: string): number => {
  const queue = getRoom(roomId).queue;
  return queue.push(user);
};

// TODO rename id param to userId
const dequeueUser = (id: string, roomId: string): User => {
  const queue = getRoom(roomId).queue;

  const index = queue.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error(`user ${id} doesn't exist in room ${roomId}; couldn't be dequeued`);
  }

  return queue.splice(index, 1)[0];
};

export default {
  addRoom,
  removeRoom,
  removeAllRooms,
  getRoom,
  getAllRooms,
  cleanRoom,
  addUserToRoom,
  removeUserFromRoom,
  getUsersInRoom,
  getQueuedUsersInRoom,
  enqueueUser,
  dequeueUser
};