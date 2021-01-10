/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NewRoom, NewUser, SocketData, CleanRoom, User } from '../types';
import logger from './logger';

export const toNewRoom = (object: any): NewRoom  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name),
    adminPassword: parseString(object.adminPassword),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toCleanRoom = (object: any): CleanRoom  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    id: parseString(object.id),
    name: parseString(object.name)
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toUser = (object: any): User  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    id: parseString(object.id),
    name: parseString(object.name),
    roomId: parseString(object.roomId),
    isAdmin: parseBoolean(object.isAdmin, 'User', 'isAdmin')
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

// we pass in id
export const toNewUser = (object: any): NewUser  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name),
    isAdmin: parseBoolean(object.isAdmin, 'NewUser', 'isAdmin')
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toSocketData = (object: any): SocketData  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    username: unstrictParseString(object.username, 'SocketData', 'username'),
    roomId: unstrictParseString(object.roomId, 'SocketData', 'roomId'),
    adminPassword: unstrictParseString(object.adminPassword, 'SocketData', 'adminPassword'),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

const unstrictParseString = (str: any, modelName: string, propName: string): string | undefined => {
  if (!str || !isString(str)) {
    logger.info(`(unstrict parse) ${modelName} ${propName} is missing or invalid: ${str}`);
    return undefined;
  }
  return str;
};

export const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error(`Expected string but got: ${str}`);
  }
  return str;
};

const parseBoolean = (bool: any, modelName: string, propName: string): boolean => {
  if (!isBoolean(bool)) {
    throw new Error(`${modelName} ${propName} is missing or invalid: ${bool}`);
  }
  return bool;
};

const isString = (val: any): val is string => {
  return typeof val === 'string' || val instanceof String;
};

const isBoolean = (val: any): val is boolean => {
  return typeof val === 'boolean' || val instanceof Boolean;
};