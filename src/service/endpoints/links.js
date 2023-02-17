import api from '../api';

const links = {
	/**
	 * categories
	 */
	getCategoryAll: () =>
		api.get(
			'/api/categoties?sort[0]=sort%3Aasc&filters[isMain][$eq]=true&populate[categoties][sort][0]=sort%3Aasc&populate=links'
		),
	getMainCategory: () =>
		api.get('/api/categoties?sort[0]=sort%3Aasc&filters[isMain][$eq]=true'),
	getSubCategory: (idMain) =>
		api.get(`/api/categoties/${idMain}?sort[0]=sort%3Aasc&populate=categoties`),
	/* getLinks: (idCategory, page, pageSize) =>
		api.get(
			`/api/categoties/${idCategory}?pagination%5Bpage%5D=${
				page ? page : 1
			}&pagination%5BpageSize%5D=${
				pageSize ? pageSize : 100
			}&populate[links][sort][0]=sort%3Aasc`
		), */
	getLinks: (idCategory, page, pageSize) =>
		api.get(
			`/api/links?sort[0]=sort%3Aasc&populate=categoty&pagination%5Bpage%5D=${
				page ? page : 1
			}&pagination%5BpageSize%5D=${
				pageSize ? pageSize : 100
			}&filters[categoty][id]=${idCategory}`
		),

	/**
	 * Main category
	 */
	getCategory: (id) => api.get(`/api/categoties/${id}?populate=categoty`),
	postMainCategory: (title, slug, icon, sort) =>
		api.post(`/api/categoties`, {
			data: {
				isMain: true,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
			},
		}),
	putMainCategory: (id, title, slug, icon, sort) =>
		api.put(`/api/categoties/${id}`, {
			data: {
				isMain: true,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
			},
		}),
	postSubCategory: (idCategory, title, slug, icon, sort) =>
		api.post(`/api/categoties`, {
			data: {
				isMain: false,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
				categoty: idCategory,
			},
		}),
	putSubCategory: (idCategory, id, title, slug, icon, sort) =>
		api.put(`/api/categoties/${id}`, {
			data: {
				isMain: false,
				title: title,
				slug: slug,
				icon: icon,
				sort: +sort,
				categoty: idCategory,
			},
		}),

	delCategory: (id) => api.delete(`/api/categoties/${id}`),

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

	// корзина, ссылки без категорий
	getTrash: () =>
		api.get(
			`/api/links?populate=categoty&filters[categoty][title][$null]=true`
		),
};

export default links;
