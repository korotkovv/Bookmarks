<template>
	<div
		v-if="
			userStore.userData.widgetWeather.active &&
			userStore.userData.widgetWeather.option
		"
		class="widgets__weather weather"
	>
		<div class="weather__left">
			<div class="weather__title">Погода</div>
			<div class="weather__morning">утром <span>−3°</span></div>
			<div class="weather__night">ночью <span>−5°</span></div>
			<div class="weather__clouds">Малооблочно</div>
		</div>
		<div class="weather__right">
			<img src="@/assets/cloud-sun-solid.svg" alt="Малооблочно" />
			<div class="weather__temperature">-2°</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

//
</script>

<style lang="scss" scoped></style>
