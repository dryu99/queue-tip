import { config } from 'dotenv';
import { ensure } from '../utils/index';

// load .env contents into process.env
config();

const PORT =  ensure(process.env.PORT);
const MONGODB_URI = process.env.NODE_ENV === 'production'
  ? ensure(process.env.MONGODB_URI)
  : ensure(process.env.TEST_MONGODB_URI);

export default { PORT, MONGODB_URI };