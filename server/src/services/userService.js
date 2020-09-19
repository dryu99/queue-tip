const utils = require('../utils');
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

const removeUser = (id) => {
  // remove user
  const user = utils.removeIdFromArray(users, id);
  if (!user) {
    throw new Error(`User with id ${id} doesn't exist!`);
  }

  // make sure user gets removed from appropriate room
  const room = roomService.getRoom(user.roomId);
  utils.removeIdFromArray(room.users, id);
  utils.removeIdFromArray(room.queue, id);

  return user;
};

const getUser = (id) => {
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error(`User with id ${id} doesn't exist!`);
  }

  return user;
};

const getAllUsers = () => {
  return users;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getAllUsers
};