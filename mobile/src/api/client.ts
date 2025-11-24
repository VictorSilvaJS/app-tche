import axios from 'axios';
import { getToken } from '../storage/token';

// Ajuste a BASE_URL conforme ambiente:
// Emulador Android: pode usar http://10.0.2.2:8000
// Emulador iOS (Simulator): http://localhost:8000
// Dispositivo físico: substitua pelo IP da sua máquina ex: http://192.168.0.15:8000
// Ngrok (externo): cole a URL https://xxxx.ngrok-free.app
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://nonliturgical-freya-uncivilized.ngrok-free.dev';

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
