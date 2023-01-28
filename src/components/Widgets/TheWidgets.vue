<template>
	<div class="main__widgets widgets">
		<widget-deadline></widget-deadline>
		<widget-weather></widget-weather>
	</div>
</template>

<script setup>
import WidgetDeadline from './Deadline/index.vue';
import WidgetWeather from './Weather/index.vue';
</script>

<style lang="scss" scoped></style>
