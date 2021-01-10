import { v4 as uuidv4 } from 'uuid';
import { NewRoom, Room, User } from '../types';

const rooms = new Map<string, Room>();

// set remove timer when:
// 1) you add a new room
// 2) a user disconnects
// if there are no users in the room when the timer ends, delete room

// const setRemoveTimer = (room: Room) => {
//   clearTimeout(1);

//   setTimeout(() => {
//     if (room.users.length === 0) {
//       removeRoom(room.id);
//     }
//   }, 180000);
// };

const addRoom = (newRoom: NewRoom): Room => {
  const newID = uuidv4(); // generate random id

  if (rooms.has(newID)) {
    throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
  }

  const room: Room = {
    id: newID,
    name: newRoom.name,
    adminPassword: newRoom.adminPassword,
    queue: [],
    users: []
  };

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
const getQueuedUsersInRoom = (roomId: string): User[] => {
  return [...getRoom(roomId).queue];
};

const enqueueUser = (user: User, roomId: string): void => {
  const queue = getRoom(roomId).queue;

  const existingQueuedUser = queue.find(u => u.name === user.name);
  if (existingQueuedUser) {
    throw new Error(`user ${user.name} already exists in queue in room ${roomId}; couldn't be enqueued`);
  }

  queue.push(user);
};

// TODO rename id param to userId
const dequeueUser = (name: string, roomId: string): User => {
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

const addUser = (user: User, roomId: string): void => {
  const room = getRoom(roomId);

  const existingUser = room.users.find(u => u.name === user.name);
  if (existingUser) {
    throw new Error(`user ${user.name} already exists in room ${roomId}; couldn't be added`);
  }

  room.users.push(user);
};

const removeUser = (name: string, roomId: string): User => {
  const room = getRoom(roomId);

  const index = room.users.findIndex(u => u.name === name);
  if (index === -1) {
    throw new Error(`user ${name} doesn't exist in queue in room ${roomId}; couldn't be dequeued`);
  }

  return room.users.splice(index, 1)[0];
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
  verifyAdminPassword,
  addUser,
  removeUser
};