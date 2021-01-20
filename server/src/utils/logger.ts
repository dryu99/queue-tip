import roomService from '../services/roomService';
// import userService from '../services/userService';

/* eslint-disable @typescript-eslint/no-explicit-any */
const info = (...params: any[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...params);
  }
};

const event = (...params: any[]): void => {
  if (process.env.NODE_ENV === 'development') {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = date + ' ' + time;

    info(`<EV> ${dateTime}`, params);
  }
};

const error = (...params: any[]): void => {
  console.error('<ER>', ...params);
};

const printAppState = (): void => {
  info('--- SERVER STATE ---');
  info('ROOMS: ', roomService.getAllRooms().map(r => ({
    id: r.id,
    name: r.name,
    users: r.users.map(u => u.name),
    adminPassword: r.adminPassword,
    queue: r.queue.map(u => u.name)
  })));
};

export default { info, event, error, printAppState };