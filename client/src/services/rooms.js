import axios from 'axios';
const baseUrl = '/api/rooms';

const getSingle = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default {
  getSingle
};