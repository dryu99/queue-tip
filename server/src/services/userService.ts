import { NewUser, User } from '../types';

// We cache user metadata in this map so we can verify which user names have been taken.
// key = id, val = User
const users = new Map<string, User>();

const getUser = (userId: string): User => {
  const user = users.get(userId);
  if (!user) {
    throw new Error(`User ${userId} doesn't exist; can't retrieve.`);
  }

  return user;
};

const getUsers = (): NewUser[] => {
  return Array.from(users.values());
};

const addUser = (id: string, newUser: NewUser): User => {
  if (users.has(id)) {
    throw Error(`User ${id} '${newUser.name}' already exists in user map; couldn't add.`);
  }

  // create full user
  const user: User = {
    id,
    name: newUser.name,
    isAdmin: newUser.isAdmin
  };

  // cache user
  users.set(id, user);

  return user;
};

const removeUser = (id: string): User => {
  if (!users.has(id)) {
    throw new Error(`User ${id} doesn't exist in user map; couldn't remove.`);
  }

  // remove from cache
  const user = users.get(id) as User; // user guaranteed to exist b/c 1st condition
  users.delete(id);

  return user;
};

const hasUser = (socketId: string): boolean => {
  return users.has(socketId);
};

export default {
  getUser,
  addUser,
  removeUser,
  getUsers,
  hasUser
};