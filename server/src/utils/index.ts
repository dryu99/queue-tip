/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NewRoom, NewUser, SocketData, CleanUser, SocketRoomData, UserType, CleanRoom } from '../types';

export const toNewRoom = (object: any): NewRoom  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name, 'NewRoom', 'name'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toCleanRoom = (object: any): CleanRoom  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    id: parseString(object.id, 'CleanRoom', 'id'),
    name: parseString(object.name, 'CleanRoom', 'name'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toNewUser = (object: any): NewUser  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    // id: parseString(object.id, 'NewUser', 'id'),
    name: parseString(object.name, 'NewUser', 'name'),
    roomId: parseString(object.roomId, 'NewUser', 'roomId'),
    type: parseUserType(object.type)
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toCleanUser = (object: any): CleanUser  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    id: parseString(object.id, 'CleanUser', 'id'),
    roomId: parseString(object.roomId, 'CleanUser', 'roomId'),
    name: parseString(object.name, 'CleanUser', 'name'),
    type: parseUserType(object.type)
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

const parseUserType = (userType: any): UserType => {
  if (!userType || !isUserType(userType)) {
    throw new Error('NewUser is missing or invalid: type');
  }
  return userType;
};

const isUserType = (val: any): val is UserType => {
  return Object.values(UserType).includes(val);
};

const isString = (val: any): val is string => {
  return typeof val === 'string' || val instanceof String;
};