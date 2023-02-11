import { defineStore } from 'pinia';
import links from '@/service/endpoints/links';
import { ref } from 'vue';

export const useMenuStore = defineStore('menu', () => {
	const menu = ref([]);
	const slugArr = ref([]);

	const slug = ref(null);
	const idCategory = ref(null);
	const currentMainCategory = ref(null);
	const nameCategory = ref(null);

	const getCategoryMenu = async () => {
		menu.value = await links
			.getCategoryAll()
			.then((response) => {
				//	setSlugArr(response.data.data);
				// console.log(response.data.data);
				setSlugArr(response.data.data);
				return response.data.data;
			})
			.catch((error) => console.log(error));
	};

	const setSlugArr = (menu) => {
		const arr = [];
		menu.map((item) => {
			if (item?.attributes?.slug) {
				arr.push(item.attributes.slug);
			}
		});
		slugArr.value = arr;
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

	const setCurrentMainCategory = (id) => {
		if (typeof id !== 'undefined') {
			currentMainCategory.value = id;
		} else {
			currentMainCategory.value = null;
		}
	};

	const setNameCategory = (name) => {
		if (typeof name !== 'undefined') {
			nameCategory.value = name;
		} else {
			nameCategory.value = null;
		}
	};

	const slugChecked = (slug) => {
		return slugArr.value.findIndex((item) => item === slug);
	};

	return {
		menu,
		slugArr,
		slug,
		idCategory,
		currentMainCategory,
		nameCategory,
		getCategoryMenu,
		setSlug,
		setIdCategory,
		setCurrentMainCategory,
		setNameCategory,
		slugChecked,
	};
});
