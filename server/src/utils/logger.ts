import roomService from '../services/roomService';
import userService from '../services/userService';

/* eslint-disable @typescript-eslint/no-explicit-any */
const info = (...params: any[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...params);
  }
};

const event = (...params: any[]): void => {
  info('<EV> ', params);
};

const error = (...params: any[]): void => {
  console.error('<ER>', ...params);
};


const printAppState = (): void => {
  info('--- SERVER STATE ---');
  info('USERS:', userService.getUsers());
  info('ROOMS: ', roomService.getAllRooms().map(r => ({
    id: r.id,
    name: r.name,
    adminPassword: r.adminPassword,
    queue: r.queue.map(u => `${u.name}`),
    users: r.users.map(u => `${u.name}`)
  })));
  info('--------------------');
};

export default { info, event, error, printAppState };