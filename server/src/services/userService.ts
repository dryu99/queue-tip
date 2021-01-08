import { NewUser, User } from '../types';
import logger from '../utils/logger';
import roomService from './roomService';

/**
 * Map that keeps track of all users that have joined a room.
 * Needed for handling removals on disconnects (only have socket ids to find users).
 *    key = socket.id, value = NewUser
 */
const users = new Map<string, User>();

const addUser = (socketId: string, user: User): void => {
  if (users.has(socketId)) {
    logger.error(`User ${socketId} already exists in user map; re-added user.`);
  }

  // add to user service
  users.set(socketId, user);

  // add user to respective room
  roomService.addUser(user, user.roomId);
};

const removeUser = (socketId: string): User => {
  if (!users.has(socketId)) {
    throw new Error(`User ${socketId} doesn't exist in user map; couldn't remove.`);
  }

  // remove from user service
  const user = users.get(socketId) as User; // user guaranteed to exist b/c 1st condition
  users.delete(socketId);

  // remove from respective room
  roomService.removeUser(user.name, user.roomId);

  return user;
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