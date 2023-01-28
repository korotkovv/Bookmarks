import { defineStore } from 'pinia';
import links from '@/service/endpoints/links';
import { ref } from 'vue';

export const useMenuStore = defineStore('menu', () => {
	const menu = ref([]);
	const subMenu = ref(null);
	const slug = ref(null);
	const idCategory = ref(null);
	const nameCategory = ref(null);

	const getCategoryMenu = async () => {
		menu.value = await links
			.getCategoryAll()
			.then((response) => {
				return response.data.data;
			})
			.catch((error) => console.log(error));
	};

	const getSubCategoryMenu = (slug) => {
		if (menu.value.length > 0) {
			const res = menu.value.filter((item) => {
				item.attributes.slug === slug;
			});

			subMenu.value = res || [];
		}
	};

	const setSlug = (slugValue) => {
		if (typeof slugValue !== 'undefined') {
			slug.value = slugValue;
		} else {
			slug.value = null;
		}
	};

	const setIdCategory = (id) => {
		if (typeof id !== 'undefined') {
			idCategory.value = id;
		} else {
			idCategory.value = null;
		}
	};

	const setNameCategory = (name) => {
		if (typeof name !== 'undefined') {
			nameCategory.value = name;
		} else {
			nameCategory.value = null;
		}
	};

	return {
		menu,
		subMenu,
		slug,
		idCategory,
		nameCategory,
		getCategoryMenu,
		getSubCategoryMenu,
		setSlug,
		setIdCategory,
		setNameCategory,
	};
});
