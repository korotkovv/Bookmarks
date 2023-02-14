import api from '../api';

const user = {
	postAuth: (data) => api.post(`/api/auth/local`, data),
	getAuth: () => api.get(`/api/users/me`),
	putUser: (
		id,
		username,
		email,
		lastName,
		firstName,
		wDLActive,
		wDLStart,
		wDLEnd,
		wWeatherActive,
		wWeatherOption
	) =>
		api.put(`/api/user/me`, {
			data: {
				id: id,
				username: username,
				email: email,
				lastName: lastName,
				firstName: firstName,
				wDLActive: wDLActive,
				wDLStart: wDLStart,
				wDLEnd: wDLEnd,
				wWeatherActive: wWeatherActive,
				wWeatherOption: wWeatherOption,
			},
		}),
};

export default user;
