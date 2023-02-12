import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import user from '@/service/endpoints/user';

export const useUserStore = defineStore('user', () => {
	const isAuth = ref(false);
	const userData = reactive({
		username: null,
		token: null,
		email: null,
	});

	const router = useRouter();

	/**
	 * Установка данных пользователя
	 * @param {string} token - токен пользователя
	 * @param {object} username - имя пользователя
	 * @param {object} email - e-mail пользователя
	 */
	const setUserData = (token, username, email) => {
		console.log('Авторизация');
		localStorage.setItem('token', token);
		userData.token = token;
		userData.username = username;
		userData.email = email;
		isAuth.value = true;
	};

	/**
	 * Выход из приложения
	 */
	const logout = () => {
		isAuth.value = false;
		userData.username = null;
		userData.token = null;
		userData.email = null;
		tokenRemove();
		router.push('/auth');
	};

	/**
	 * Проверка наличия токена в хранилище
	 */
	const tokenChecked = async () => {
		const tokenStorage = localStorage.getItem('token') || null;
		if (tokenStorage) {
			//		console.log(tokenStorage);
			await user
				.getAuth()
				.then((response) => {
					console.log(response);
					setUserData(
						tokenStorage,
						response.data.username,
						response.data.email
					);
				})
				.catch((error) => {
					router.push('/auth');
					console.log(error);
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
