import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingStore = defineStore('setting', () => {
	const name = ref('Bookmarks');
	const switcher = ref(
		localStorage.getItem('switcher') ? localStorage.getItem('switcher') : 'grid'
	);
	const isOpenSettings = ref(false);
	const toasterList = ref([]);

	/**
	 * Переключить в режим grid
	 */
	const switcherGridHandle = () => {
		if (switcher.value === 'list') {
			switcher.value = 'grid';
			localStorage.setItem('switcher', 'grid');
		}
	};

	/**
	 * Переключить в режим list
	 */
	const switcherListHandle = () => {
		if (switcher.value === 'grid') {
			switcher.value = 'list';
			localStorage.setItem('switcher', 'list');
		}
	};

	/**
	 * Закрытие одного уведомления
	 * @param {number} idx - индекс уведомления в массиве
	 */
	const closeToast = (idx) => {
		toasterList.value.splice(idx, 1);
	};

	/**
	 * Добавление уведомления в список
	 * @param {string} type - тип уведомления success | warning | error
	 * @param {string} text - текст уведомления
	 */
	const addToast = (type, text) => {
		toasterList.value.push({ type: type, text: text });
	};

	/**
	 * Удаление первого элемента из списка уведомлений
	 */
	const removeToast = () => {
		toasterList.value.shift();
	};

	return {
		name,
		switcher,
		isOpenSettings,
		toasterList,
		switcherGridHandle,
		switcherListHandle,
		closeToast,
		addToast,
		removeToast,
	};
});
