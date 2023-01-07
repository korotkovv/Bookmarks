import axios from 'axios';

const API_URL_DEV = 'http://localhost:1337';
//export const API_URL = process.env.VITE_HTTP_BACKEND_HOST || API_URL_DEV;

// настройки axios
const api = axios.create({
	baseURL: API_URL_DEV,
	//makeUrl,
	headers: { 'Content-Type': 'application/json' },
});

/* api.interceptors.request.use(
	(config) => {
		const authToken = localStorage.getItem('token');
		if (authToken) {
			config.headers.Authorization = `bearer ${authToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
); */

export default api;
