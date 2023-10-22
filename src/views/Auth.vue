<template>
	<div class="page-auth">
		<div class="page-auth__img">
			<img class="page-auth__image" src="@/assets/auth.svg" alt="auth" />
		</div>
		<div class="page-auth__auth">
			<img class="page-auth__logo" src="@/assets/logo.svg" alt="Bookmarks" />
			<div class="auth">
				<form class="form-auth" @submit.prevent="onAuth">
					<div class="form__group_max">
						<label for="identifier">Имя пользователя</label>
					</div>
					<div class="form__group_max">
						<input
							v-model="auth.identifier"
							type="text"
							id="identifier"
							placeholder="Логин"
						/>
					</div>
					<div class="form__group_max mt-5">
						<label for="password">Пароль</label>
					</div>
					<div class="form__group_max">
						<input
							v-model="auth.password"
							type="password"
							id="password"
							placeholder="Пароль"
						/>
					</div>
					<div class="form__group_max mt-10">
						<button type="submit">Авторизация</button>
					</div>
					<div v-if="isError" class="form__group_max mt-10">
						<div class="form__error">
							{{ errorText ? errorText : 'Неверный логин или пароль' }}
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';
import user from '@/service/endpoints/user';

const userStore = useUserStore();
const menuStore = useMenuStore();
const router = useRouter();
const isError = ref(false);
const errorText = ref('');
const auth = reactive({
	identifier: null,
	password: null,
});

const onAuth = async () => {
	isError.value = false;
	errorText.value = false;
	if (auth.identifier && auth.identifier) {
		await user
			.postAuth(auth)
			.then((response) => {
				userStore.setUserData(
					response.data.jwt,
					response.data.user.id,
					response.data.user.username,
					response.data.user.email,
					response.data.user.lastName,
					response.data.user.firstName,
					response.data.user.wDLActive,
					response.data.user.wDLStart,
					response.data.user.wDLEnd,
					response.data.user.wWeatherActive,
					response.data.user.wWeatherOption,
					response.data.user.searchEngine
				);
				router.push(`/category/${menuStore.slugArr[0]}`);
			})
			.catch((error) => {
				isError.value = true;
				console.log(error);
			});
	} else {
		isError.value = true;
		errorText.value = 'Заполните данные для авторизации';
	}
};
</script>

<style lang="scss" scoped></style>
