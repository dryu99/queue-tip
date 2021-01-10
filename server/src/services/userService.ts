import { NewUser, User } from '../types';
import logger from '../utils/logger';
import roomService from './roomService';

/**
 * Map that keeps track of all users that have joined a room.
 * Needed for handling removals on disconnects (only have socket ids to find users).
 *    key = socket.id, value = NewUser
 */
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

const addUser = (userId: string, roomId: string, newUser: NewUser): User => {
  if (users.has(userId)) {
    logger.error(`User ${userId} '${newUser.name}' already exists in user map; re-added user.`);
    // TODO throw error here?
  }

  const user: User = {
    id: userId,
    name: newUser.name,
    isAdmin: newUser.isAdmin,
    roomId
  };

  // add to user service
  users.set(userId, user);

  // add user to respective room
  roomService.addUser(user, user.roomId);

  return user;
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