/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NewRoom, NewUser, SocketData, SocketRoomData, CleanRoom, User } from '../types';

export const toNewRoom = (object: any): NewRoom  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name, 'NewRoom', 'name'),
    adminPassword: parseString(object.adminPassword, 'NewRoom', 'adminPassword'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toCleanRoom = (object: any): CleanRoom  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    id: parseString(object.id, 'CleanRoom', 'id'),
    name: parseString(object.name, 'CleanRoom', 'name'),
    adminPassword: parseString(object.adminPassword, 'CleanRoom', 'adminPassword'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toUser = (object: any): User  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name, 'User', 'name'),
    roomId: parseString(object.roomId, 'User', 'roomId'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toNewUser = (object: any): NewUser  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    roomId: parseString(object.roomId, 'NewUser', 'roomId'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toSocketRoomData = (object: any): SocketRoomData  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    roomId: parseString(object.roomId, 'SocketRoomData', 'roomId'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toSocketData = (object: any): SocketData  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    roomId: parseString(object.roomId, 'SocketData', 'roomId'),
    userId: parseString(object.userId, 'SocketData', 'userId')
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

const parseString = (str: any, modelName: string, propName: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`${modelName} ${propName} is missing or invalid: ${str}`);
  }
  return str;
};

const isString = (val: any): val is string => {
  return typeof val === 'string' || val instanceof String;
};