import { NewUser, User } from '../types';

/**
 * Map that keeps track of minimal user data. Mostly needed for handling removals on disconnects (only have socket ids to find users).
 * key = socket.id, value = NewUser
 */
const users = new Map<string, NewUser>();

const addUser = (socketId: string, newUser: NewUser): void => {
  if (users.has(socketId)) {
    throw new Error(`User ${socketId} already exists in user map; didn't add.`);
  }

  users.set(socketId, newUser);
};

const removeUser = (socketId: string): NewUser => {
  if (!users.has(socketId)) {
    throw new Error(`User ${socketId} doesn't exist in user map; couldn't remove.`);
  }

  const user = users.get(socketId);
  users.delete(socketId);

  return user as NewUser;
};

// const addUser = (newUser) => {
//   // make sure there isn't another user with same name
//   const cleanName = newUser.name.trim().toLowerCase();
//   const existingUser = users.find(u => u.roomId === newUser.roomId && u.name === cleanName);
//   if (existingUser) {
//     throw new Error('Username is taken');
//   }

//   users.push(newUser);

//   // make sure appropriate room has reference to new user
//   const room = roomService.getRoom(newUser.roomId);
//   room.users.push(newUser);

//   return newUser;
// };

// /**
//  * Remove user with given id completely; remove from user service, rooms, and queues
//  * @param {string} socketId - should be socket id
//  */
// const removeUser = (socketId) => {
//   // remove user
//   const user = utils.removeIdFromArray(users, socketId, 'socketId');
//   if (!user) {
//     throw new Error(`User socket id "${socketId}" doesn't exist. Either an error or unregistered user disconnected.`);
//   }

//   // make sure user gets removed from appropriate room
//   const room = roomService.getRoom(user.roomId);
//   utils.removeIdFromArray(room.users, user.id);
//   utils.removeIdFromArray(room.queue, user.id);

//   return user;
// };

// const getUser = (id) => {
//   const user = users.find(u => u.id === id);
//   if (!user) {
//     throw new Error(`User with id ${id} doesn't exist!`);
//   }

//   return user;
// };

const cleanUser = (user: User): NewUser => {
  return {
    id: user.id,
    name: user.name,
    roomId: user.roomId,
    type: user.type,
  };
};

// const getAllUsers = () => {
//   return users;
// };

export default {
  addUser,
  removeUser,
  cleanUser
};