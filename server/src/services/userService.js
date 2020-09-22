const utils = require('../utils/utils');
const roomService = require('./roomService');

const users = [];

const addUser = (newUser) => {
  // make sure there isn't another user with same name
  const cleanName = newUser.name.trim().toLowerCase();
  const existingUser = users.find(u => u.roomId === newUser.roomId && u.name === cleanName);
  if (existingUser) {
    throw new Error('Username is taken');
  }

  users.push(newUser);

  // make sure appropriate room has reference to new user
  const room = roomService.getRoom(newUser.roomId);
  room.users.push(newUser);

  return newUser;
};

/**
 * Remove user with given id completely; remove from user service, rooms, and queues
 * @param {string} socketId - should be socket id
 */
const removeUser = (socketId) => {
  // remove user
  const user = utils.removeIdFromArray(users, socketId, 'socketId');
  if (!user) {
    throw new Error(`User socket id "${socketId}" doesn't exist. Either an error or unregistered user disconnected.`);
  }

  // make sure user gets removed from appropriate room
  const room = roomService.getRoom(user.roomId);
  utils.removeIdFromArray(room.users, user.id);
  utils.removeIdFromArray(room.queue, user.id);

  return user;
};

const getUser = (id) => {
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error(`User with id ${id} doesn't exist!`);
  }

  return user;
};

const cleanUser = (user) => {
  const userCopy = { ...user };
  delete userCopy.roomId;
  delete userCopy.socketId;
  return userCopy;
};

const getAllUsers = () => {
  return users;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  cleanUser,
  getAllUsers
};