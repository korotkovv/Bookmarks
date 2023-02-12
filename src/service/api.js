import axios from 'axios';
import { useUserStore } from '@/stores/user';

const API_URL_DEV = 'http://localhost:1337';
//export const API_URL = process.env.VITE_HTTP_BACKEND_HOST || API_URL_DEV;

// настройки axios
const api = axios.create({
	baseURL: API_URL_DEV,
	//makeUrl,
	headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

export default api;
