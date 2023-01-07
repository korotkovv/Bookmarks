import api from '../api';
import { makeUrlEndpoint } from '../api-config.js';

const roles = {
	getRoles: () => api.get(`${makeUrlEndpoint}/roles`),
	getRole: (id) => api.get(`${makeUrlEndpoint}/roles/${id}`),
	postRoles: (formData) => api.post(`${makeUrlEndpoint}/roles`, formData),
	putRoles: (id, formData) =>
		api.put(`${makeUrlEndpoint}/roles/${id}`, formData),
	delRoles: (id) => api.delete(`${makeUrlEndpoint}/roles/${id}`),
};

export default roles;
