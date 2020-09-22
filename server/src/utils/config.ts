import { config } from 'dotenv';

// load .env contents into process.env
config();

const PORT = process.env.PORT || 3003;

export default { PORT };