import axios from 'axios';
const baseUrl = '/api/rooms';

const getSingle = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const checkAdminPassword = async (adminPassword, roomId) => {
  const res = await axios.post(`${baseUrl}/check-admin-password`, { adminPassword, roomId });
  return res.data;
};

export default {
  getSingle,
  checkAdminPassword
};