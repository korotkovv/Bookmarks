import api from '../api';

const infos = {
	getInfos: (userId) =>
		api.get(`/api/infos?filters[user][id]=${userId}&sort[0]=sort%3Aasc`),
	getInfo: (id) => api.get(`/api/infos/${id}`),
	postInfo: (title, text, sort, userId) =>
		api.post(`/api/infos`, {
			data: {
				title: title,
				text: text,
				sort: sort,
				user: userId,
			},
		}),
	putInfo: (id, title, text, sort, userId) =>
		api.put(`/api/infos/${id}`, {
			data: {
				title: title,
				text: text,
				sort: sort,
				user: userId,
			},
		}),
	delInfo: (id) => api.delete(`/api/infos/${id}`),
};

export default infos;
