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

export default { info, event, error };