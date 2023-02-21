import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingStore = defineStore('setting', () => {
	const name = ref('Bookmarks');
	const isEdit = ref(false);
	const isWatchWidgets = ref(
		localStorage.getItem('widgets')
			? JSON.parse(localStorage.getItem('widgets'))
			: true
	);
	const appTheme = ref(
		localStorage.getItem('appTheme') ? localStorage.getItem('appTheme') : 'dark'
	);
	const switcher = ref(
		localStorage.getItem('switcher') ? localStorage.getItem('switcher') : 'grid'
	);
	const isOpenSettings = ref(false);
	const toasterList = ref([]);
	const isOpenMenu = ref(true);
	const isOpenUserMenu = ref(false);

	/**
	 * Открытие/ закрытие меню пользователя
	 */
	const toggleUserMenu = () => {
		isOpenUserMenu.value = !isOpenUserMenu.value;
	};

	/**
	 * Открытие/ закрытие меню
	 */
	const toggleMenu = () => {
		isOpenMenu.value = !isOpenMenu.value;
	};

	/**
	 * Открытие/ закрытие меню пользователя
	 */
	const closeUserMenu = () => {
		isOpenUserMenu.value = false;
	};

	/**
	 * Открытие/ закрытие меню
	 */
	const closeMenu = () => {
		isOpenMenu.value = false;
	};

	/**
	 * Переключение режима редактирования категорий
	 */
	const handleEdit = () => {
		isEdit.value = !isEdit.value;
	};

	/**
	 * Переключение отображения виджетов
	 */
	const handleWidgets = () => {
		if (isWatchWidgets.value) {
			localStorage.setItem('widgets', false);
		} else {
			localStorage.setItem('widgets', true);
		}
		isWatchWidgets.value = !isWatchWidgets.value;
	};

	/**
	 * Переключить в режим grid
	 */
	const switcherGridHandle = () => {
		if (switcher.value === 'list' || switcher.value === 'compact') {
			switcher.value = 'grid';
			localStorage.setItem('switcher', 'grid');
		}
	};

	/**
	 * Переключить в режим grid
	 */
	const switcherCompactHandle = () => {
		if (switcher.value === 'list' || switcher.value === 'grid') {
			switcher.value = 'compact';
			localStorage.setItem('switcher', 'compact');
		}
	};

	/**
	 * Переключить в режим list
	 */
	const switcherListHandle = () => {
		if (switcher.value === 'grid' || switcher.value === 'compact') {
			switcher.value = 'list';
			localStorage.setItem('switcher', 'list');
		}
	};

	/**
	 * Переключить тему
	 */
	const appThemeHandle = () => {
		if (appTheme.value === 'dark') {
			appTheme.value = 'black';
			localStorage.setItem('appTheme', 'black');
		} else if (appTheme.value === 'black') {
			appTheme.value = 'light';
			localStorage.setItem('appTheme', 'light');
		} else if (appTheme.value === 'light') {
			appTheme.value = 'dark';
			localStorage.setItem('appTheme', 'dark');
		} else {
			appTheme.value = 'dark';
			localStorage.setItem('appTheme', 'dark');
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
		isEdit,
		appTheme,
		switcher,
		isWatchWidgets,
		isOpenSettings,
		toasterList,
		isOpenMenu,
		isOpenUserMenu,
		handleEdit,
		handleWidgets,
		appThemeHandle,
		switcherGridHandle,
		switcherCompactHandle,
		switcherListHandle,
		closeToast,
		addToast,
		removeToast,
		toggleUserMenu,
		toggleMenu,
		closeUserMenu,
		closeMenu,
	};
});
