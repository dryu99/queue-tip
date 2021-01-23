import { config } from 'dotenv';
import { ensure } from '../utils/index';

// load .env contents into process.env
config();

const PORT =  ensure(process.env.PORT);
const MONGODB_URI = ensure(process.env.MONGODB_URI);

export default { PORT, MONGODB_URI };