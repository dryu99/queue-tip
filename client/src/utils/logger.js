const info = (...params) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    console.log(...params);
  }
};

const event = (...params) => {
  info('<EV> ', params);
};

const error = (...params) => {
  console.error(...params);
};

export default { info, event, error };