import api from '../api';

const links = {
	/**
	 * categories
	 */
	getCategoryAll: (userId) =>
		api.get(
			`/api/categoties?sort[0]=sort%3Aasc&filters[user][id]=${userId}&filters[isMain][$eq]=true&populate[categoties][sort][0]=sort%3Aasc&populate=links`
		),
	getMainCategory: (userId) =>
		api.get(
			`/api/categoties?sort[0]=sort%3Aasc&filters[user][id]=${userId}&filters[isMain][$eq]=true`
		),
	getSubCategory: (idMain, userId) =>
		api.get(
			`/api/categoties/${idMain}?filters[user][id]=${userId}&sort[0]=sort%3Aasc&populate=categoties`
		),
	getLinks: (idCategory, page, pageSize, userId) =>
		api.get(
			`/api/links?filters[user][id]=${userId}&sort[0]=sort%3Aasc&populate=categoty&pagination%5Bpage%5D=${
				page ? page : 1
			}&pagination%5BpageSize%5D=${
				pageSize ? pageSize : 100
			}&filters[categoty][id]=${idCategory}`
		),

	/**
	 * Main category
	 */
	getCategory: (id) => api.get(`/api/categoties/${id}?populate=categoty`),
	postMainCategory: (title, slug, icon, sort, userId) =>
		api.post(`/api/categoties`, {
			data: {
				isMain: true,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
				user: userId,
			},
		}),
	putMainCategory: (id, title, slug, icon, sort, userId) =>
		api.put(`/api/categoties/${id}`, {
			data: {
				isMain: true,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
				user: userId,
			},
		}),
	postSubCategory: (idCategory, title, slug, icon, sort, userId) =>
		api.post(`/api/categoties`, {
			data: {
				isMain: false,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
				categoty: idCategory,
				user: userId,
			},
		}),
	putSubCategory: (idCategory, id, title, slug, icon, sort, userId) =>
		api.put(`/api/categoties/${id}`, {
			data: {
				isMain: false,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
				categoty: idCategory,
				user: userId,
			},
		}),

	delCategory: (id) => api.delete(`/api/categoties/${id}`),

	/**
	 * link
	 */
	getLink: (id) => api.get(`/api/links/${id}?&populate=categoty`),
	postLink: (title, link, icon, sort, color, desc, categotyId, userId) =>
		api.post(`/api/links`, {
			data: {
				title: title,
				desc: desc,
				url: link,
				icon: icon,
				sort: +sort,
				categoty: +categotyId,
				color: color,
				user: userId,
			},
		}),
	putLink: (id, title, link, icon, sort, color, desc, categotyId, userId) =>
		api.put(`/api/links/${id}`, {
			data: {
				title: title,
				desc: desc,
				url: link,
				icon: icon,
				sort: +sort,
				categoty: +categotyId,
				color: color,
				user: userId,
			},
		}),
	delLink: (id) => api.delete(`/api/links/${id}`),

	// корзина, ссылки без категорий
	getTrash: (userId) =>
		api.get(
			`/api/links?populate=categoty&filters[categoty][title][$null]=true&filters[user][id]=${userId}`
		),
};

export default links;
