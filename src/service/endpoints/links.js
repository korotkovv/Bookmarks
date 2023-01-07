import api from '../api';

const links = {
	/**
	 * categories
	 */
	getCategoryAll: () =>
		api.get(
			'/api/categoties?sort[0]=sort%3Aasc&filters[isMain][$eq]=true&populate=categoties&populate=links'
		),
	getMainCategory: () =>
		api.get('/api/categoties?sort[0]=sort%3Aasc&filters[isMain][$eq]=true'),
	getSubCategory: (idMain) =>
		api.get(`/api/categoties/${idMain}?sort[0]=sort%3Aasc&populate=categoties`),
	getLinks: (idCategory) =>
		//	api.get(`/api/categoties/${idCategory}?populate=links&sort[0]=sort%3Aasc`),
		api.get(
			`/api/categoties/${idCategory}?populate[links][sort][0]=sort%3Aasc`
		),

	/**
	 * link
	 */
	getLink: (id) => api.get(`/api/links/${id}?&populate=categoty`),
	postLink: (title, link, icon, sort, color, desc, categotyId) =>
		api.post(`/api/links`, {
			data: {
				title: title,
				desc: desc,
				url: link,
				icon: icon,
				sort: +sort,
				categoty: +categotyId,
				color: color,
			},
		}),
	putLink: (id, title, link, icon, sort, color, desc, categotyId) =>
		api.put(`/api/links/${id}`, {
			data: {
				title: title,
				desc: desc,
				url: link,
				icon: icon,
				sort: +sort,
				categoty: +categotyId,
				color: color,
			},
		}),
	delLink: (id) => api.delete(`/api/links/${id}`),
};

export default links;
