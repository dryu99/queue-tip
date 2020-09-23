import { CleanUser, NewUser, User } from '../types';
import logger from '../utils/logger';

// TODO might be good to change this map to CleanUser but eh
/**
 * Map that keeps track of minimal user data. Mostly needed for handling removals on disconnects (only have socket ids to find users).
 * key = socket.id, value = NewUser
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

// TODO shouldn't need this fn, can use the utils toCleanUser fn
const cleanUser = (user: User): CleanUser => {
  return {
    id: user.id,
    name: user.name,
    roomId: user.roomId,
    type: user.type,
  };
};

export default {
  addUser,
  removeUser,
  cleanUser
};