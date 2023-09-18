import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';
import user from '@/service/endpoints/user';

export const useUserStore = defineStore('user', () => {
	const menuStore = useMenuStore();
	const isAuth = ref(false);
	const userData = reactive({
		id: null,
		username: null,
		lastName: null,
		firstName: null,
		token: null,
		email: null,
		widgetDL: {
			active: false,
			start: null,
			end: null,
		},
		widgetWeather: {
			active: false,
			option: null,
		},
		searchEngine: null,
	});

	const router = useRouter();

	/**
	 * Установка данных пользователя
	 * @param {string} token - токен пользователя
	 * @param {number} id - ID пользователя
	 * @param {string} username - username пользователя
	 * @param {string} email - e-mail пользователя
	 * @param {string} lastName - фамилия пользователя
	 * @param {string} firstName - имя пользователя
	 * @param {string} wDLActive - виджет deadline активирован ли
	 * @param {string} wDLStart -  виджет deadline дата старта
	 * @param {string} wDLEnd - виджет deadline дата завершения
	 * @param {string} wWeatherActive - виджет weather активирован ли
	 * @param {string} wWeatherOption - виджет weather опции
	 * @param {string} searchEngine - поисковая система
	 */
	const setUserData = (
		token,
		id,
		username,
		email,
		lastName,
		firstName,
		wDLActive,
		wDLStart,
		wDLEnd,
		wWeatherActive,
		wWeatherOption,
		searchEngine
	) => {
		//	console.log('Авторизация');
		localStorage.setItem('token', token);
		userData.id = id;
		userData.token = token;
		userData.username = username;
		userData.lastName = lastName;
		userData.firstName = firstName;
		userData.email = email;

		userData.widgetDL.active = wDLActive;
		userData.widgetDL.start = wDLStart;
		userData.widgetDL.end = wDLEnd;
		userData.widgetWeather.active = wWeatherActive;
		userData.widgetWeather.option = wWeatherOption;
		userData.searchEngine = searchEngine;
		menuStore.getCategoryMenu();
		isAuth.value = true;
	};

	/**
	 * Выход из приложения
	 */
	const logout = () => {
		isAuth.value = false;
		userData.id = null;
		userData.username = null;
		userData.lastName = null;
		userData.firstName = null;
		userData.token = null;
		userData.email = null;
		userData.widgetDL.active = false;
		userData.widgetDL.start = null;
		userData.widgetDL.end = null;
		userData.widgetWeather.active = false;
		userData.widgetWeather.option = null;
		userData.searchEngine = null;
		tokenRemove();
		router.push('/auth');
	};

	/**
	 * Проверка наличия токена в хранилище
	 */
	const tokenChecked = async () => {
		const tokenStorage = localStorage.getItem('token') || null;
		if (tokenStorage) {
			console.log(tokenStorage);
			await user
				.getAuth()
				.then((response) => {
					console.log(response);
					setUserData(
						tokenStorage,
						response.data.id,
						response.data.username,
						response.data.email,
						response.data.lastName,
						response.data.firstName,
						response.data.wDLActive,
						response.data.wDLStart,
						response.data.wDLEnd,
						response.data.wWeatherActive,
						response.data.wWeatherOption,
						response.data.searchEngine
					);
				})
				.catch((error) => {
					router.push('/auth');
					console.log(error);
					tokenRemove();
				});
			return true;
		} else {
			router.push('/auth');
			return false;
		}
	};

	/**
	 * Удаление токена из  хранилища
	 */
	const tokenRemove = () => {
		localStorage.removeItem('token');
	};

	return {
		isAuth,
		userData,
		setUserData,
		logout,
		tokenChecked,
	};
});
