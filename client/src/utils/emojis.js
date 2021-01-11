// TODO consider caching emojis with user metadata

const EMOJIS = [
  '🐢','🐍','🦖','🐡','🐠','🐬','🐳','🐅',
  '🦓','🦍','🐘','🦏','🐫','🦒','🐂','🐄','🐎',
  '🐖','🐑','🐐','🦌','🐕','🐈','🐓','🦃','🐇',
  '🐿','🦔','🐉','🦆','🦅','🦇','🐝','🐛',
  '🐜','🌛','🗿','🐒'
];

const getUserEmoji = (user) => {
  const firstCharCode = user.name.charCodeAt(0);
  const index = !isNaN(firstCharCode)
    ? firstCharCode % EMOJIS.length
    : Math.floor(Math.random() * EMOJIS.length);

  return EMOJIS[index];
};

export default {
  getUserEmoji
};