import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const getRides = async () => {
  const res = await api.get('/api/rides');
  return res.data;
};

export const getBookings = async () => {
  const res = await api.get('/api/bookings');
  return res.data;
};

export const createBooking = async ({ destination, rideType, fare }) => {
  const res = await api.post('/api/bookings', { destination, rideType, fare });
  return res.data;
};

export const getBooking = async (id) => {
  const res = await api.get(`/api/bookings/${id}`);
  return res.data;
};

export default api;
