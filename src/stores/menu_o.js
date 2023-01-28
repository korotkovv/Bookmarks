import { defineStore } from 'pinia';
import links from '@/service/endpoints/links';

export const useMenuStore = defineStore('menu', {
	state: () => ({
		menu: [],
		subMenu: null,
		slug: null,
		idCategory: null,
		nameCategory: null,
	}),

	actions: {
		async getCategoryMenu() {
			this.menu = await links
				.getCategoryAll()
				.then((response) => {
					return response.data.data;
				})
				.catch((error) => console.log(error));
		},
		getSubCategoryMenu(slug) {
			if (this.menu.length > 0) {
				const res = this.menu.filter((item) => {
					item.attributes.slug === slug;
				});

				this.subMenu = res || [];
			}
		},
		setSlug(slug) {
			if (typeof slug !== 'undefined') {
				this.slug = slug;
			} else {
				this.slug = null;
			}
		},
		setIdCategory(id) {
			if (typeof id !== 'undefined') {
				this.idCategory = id;
			} else {
				this.idCategory = null;
			}
		},
		setNameCategory(name) {
			if (typeof name !== 'undefined') {
				this.nameCategory = name;
			} else {
				this.nameCategory = null;
			}
		},
	},
});
