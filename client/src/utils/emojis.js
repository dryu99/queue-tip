// TODO consider caching emojis with user metadata

// b/c of % operator, order is 'h', 'i', 'j', etc
const EMOJIS = [
  '🐢','🐍','🦖','🐡','🐬','🐳','🦔',
  '🐘','🦒','🐄','🐎','🐖','🦌','🐕',
  '🐈','🐓','🐇','🐿','🐅','🐉','🦆',
  '🐝','🗿','🌛','🐒','🐑'
];

const getUserEmoji = (user) => {
  const firstCharCode = user.name.toLowerCase().charCodeAt(0);
  const index = !isNaN(firstCharCode)
    ? firstCharCode % EMOJIS.length
    : Math.floor(Math.random() * EMOJIS.length);

  return EMOJIS[index];
};

export default {
  getUserEmoji
};