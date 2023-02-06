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
						<label for="login">Имя пользователя</label>
					</div>
					<div class="form__group_max">
						<input
							v-model="auth.login"
							type="text"
							id="login"
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

const isError = ref(false);
const errorText = ref('');
const auth = reactive({
	login: null,
	password: null,
});

const onAuth = () => {
	isError.value = false;
	errorText.value = false;
	if (auth.login && auth.password) {
		console.log('Авторизация');
	} else {
		isError.value = true;
		errorText.value = 'Заполните данные для авторизации';
	}
};
//
</script>

<style lang="scss" scoped></style>
