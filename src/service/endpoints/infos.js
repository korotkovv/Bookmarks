import api from '../api';

const infos = {
	getInfos: () => api.get(`/api/infos?sort[0]=sort%3Aasc`),
	getInfo: (id) => api.get(`/api/infos/${id}`),
	postInfo: (title, text, sort) =>
		api.post(`/api/infos`, {
			data: {
				title: title,
				text: text,
				sort: sort,
			},
		}),
	putInfo: (id, title, text, sort) =>
		api.put(`/api/infos/${id}`, {
			data: {
				title: title,
				text: text,
				sort: sort,
			},
		}),
	delInfo: (id) => api.delete(`/api/infos/${id}`),
};

export default infos;
