import axios from 'axios';

const baseURL =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api` 
    : 'http://localhost:3000/api';           

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});