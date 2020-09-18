const users = [];

const addUser = ({ id, name, roomId }) => {
  const cleanName = name.trim().toLowerCase();
  const existingUser = users.find(u => u.roomId === roomId && u.name === cleanName);
  if (existingUser) {
    throw new Error('Username is taken');
  }

  const user = { id, name, roomId };
  users.push(user);
  return user;
};

const removeUser = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error(`User with id ${id} doesn't exist!`);
  }

  return users.splice(index, 1)[0];
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

const getUsersInRoom = (roomId) => {
  return users.filter(u => u.roomId === roomId);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getAllUsers,
  getUsersInRoom
};