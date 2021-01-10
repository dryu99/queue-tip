/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NewRoom, NewUser, CleanRoom, User } from '../types';

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
    name: parseString(object.name),
    userCount: parseNumber(object.userCount),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const toUser = (object: any): User  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    id: parseString(object.id),
    name: parseString(object.name),
    isAdmin: parseBoolean(object.isAdmin)
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

// we pass in id
export const toNewUser = (object: any): NewUser  => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name),
    isAdmin: parseBoolean(object.isAdmin)
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

export const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error(`Expected string but got: ${str}`);
  }
  return str;
};

const parseBoolean = (bool: any): boolean => {
  if (!isBoolean(bool)) {
    throw new Error(`Expected boolean but got: ${bool}`);
  }
  return bool;
};

const parseNumber = (num: any): number => {
  if (!isNumber(num)) {
    throw new Error(`Expected number but got: ${num}`);
  }
  return num;
};

const isString = (val: any): val is string => {
  return typeof val === 'string' || val instanceof String;
};

const isBoolean = (val: any): val is boolean => {
  return typeof val === 'boolean' || val instanceof Boolean;
};

const isNumber = (val: any): val is number => {
  return typeof val === 'number' || val instanceof Number;
};