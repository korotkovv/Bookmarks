<template>
	<div class="widgets__weather weather">
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

<script>
export default {
	name: 'WidgetWeather',
};
</script>

<style lang="scss" scoped></style>
