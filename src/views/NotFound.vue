<template>
	<div class="not-found">
		<div class="not-found__img">
			<img class="not-found__image" src="@/assets/not-found.svg" alt="auth" />
		</div>
		<div class="not-found__info">
			<img class="not-found__logo" src="@/assets/logo.svg" alt="Bookmarks" />
			<div class="not-found__title">Ошибка 404</div>
			<div class="not-found__desc">Страница не найдена или недоступна</div>
			<router-link to="/" class="not-found__btn">На главную</router-link>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
