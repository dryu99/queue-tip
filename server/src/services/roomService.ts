import { v4 as uuidv4 } from 'uuid';
import { NewRoom, Room, User, NewUser, CleanRoom } from '../types';

const rooms = new Map<string, Room>();

const addRoom = (newRoom: NewRoom): Room => {
  const room: Room = {
    id: uuidv4(), // generate random id
    name: newRoom.name,
    users: [],
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

const cleanRoom = (room: Room): CleanRoom  => {
  return {
    id: room.id,
    name: room.name
  };
};

const addUserToRoom = (socketId: string, newUser: NewUser): User => {
  const users = getRoom(newUser.roomId).users;

  const user: User = {
    ...newUser,
    id: uuidv4(), // randomly generate id
    socketId
  };

  // note: we aren't storing the bare name, just using it for duplication checks
  const bareName = user.name.trim().toLowerCase();

  const existingUser = users.find(u => {
    return u.id === user.id
      || u.name.trim().toLowerCase() === bareName;
  });
  if (existingUser) {
    throw new Error(`user ${user.name} already exists in room ${user.roomId}; didn't add.`);
  }

  users.push(user);

  return user;
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

const enqueueUser = (id: string, roomId: string): User => {
  const users = getRoom(roomId).users;

  const existingUser = users.find(u => u.id === id);
  if (!existingUser) {
    throw new Error(`user ${id} doesn't exist in user list in room ${roomId}; couldn't be enqueued`);
  }

  const queue = getRoom(roomId).queue;
  queue.push(existingUser);

  return existingUser;
};

// TODO rename id param to userId
const dequeueUser = (id: string, roomId: string): User => {
  const queue = getRoom(roomId).queue;

  const index = queue.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error(`user ${id} doesn't exist in queue in room ${roomId}; couldn't be dequeued`);
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