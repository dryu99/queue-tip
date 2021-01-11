// helpful for quickly filling in form fields when testing
export const generateTestId = (length) => {
  let result = '';

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  return result;
};