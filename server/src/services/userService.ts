import { NewUser } from '../types';
import logger from '../utils/logger';

/**
 * Map that keeps track of all users that have joined a room.
 * Mostly needed for handling removals on disconnects (only have socket ids to find users).
 *    key = socket.id, value = NewUser
 */
const users = new Map<string, NewUser>();

const addUser = (socketId: string, newUser: NewUser): void => {
  if (users.has(socketId)) {
    logger.error(`User ${socketId} already exists in user map; re-added user.`);
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

const getUsers = (): NewUser[] => {
  return Array.from(users.values());
};

const hasUser = (socketId: string): boolean => {
  return users.has(socketId);
};

export default {
  addUser,
  removeUser,
  getUsers,
  hasUser
};