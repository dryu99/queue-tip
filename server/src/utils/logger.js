const info = (...params) => {
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

module.exports = { info, event, error };