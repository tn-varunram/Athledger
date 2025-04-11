// src/services/api.js
import axios from 'axios';

const BASE_URMS_URL = 'http://localhost:8080/urms'; // Example
const BASE_SMS_URL = 'http://localhost:8081/sms';
const BASE_SBS_URL = 'http://localhost:8082/sbs';
// Notification typically won't be called directly (they listen to Kafka events), 
// but you might have an endpoint for re-sending confirmations, etc.

export const loginUser = async (username, password) => {
  // Example endpoint to URMS
  const response = await axios.post(`${BASE_URMS_URL}/login`, {
    username,
    password,
  });
  return response.data; // { token: '...', role: '...' }
};

export const registerUser = async (userInfo) => {
  const response = await axios.post(`${BASE_URMS_URL}/register`, userInfo);
  return response.data;
};

export const fetchAvailableSlots = async (sportName, token) => {
  // Communicate with Slot Management Service or Booking Service
  const response = await axios.get(`${BASE_SBS_URL}/slots`, {
    params: { sport: sportName },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // e.g. list of slot objects
};

export const bookSlot = async (slotId, token) => {
  const response = await axios.post(
    `${BASE_SBS_URL}/book`,
    { slotId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const cancelSlot = async (bookingId, token) => {
  const response = await axios.delete(`${BASE_SBS_URL}/cancel/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


