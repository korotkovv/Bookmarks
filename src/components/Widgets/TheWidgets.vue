<template>
	<div class="main__widgets widgets">
		<widget-deadline></widget-deadline>
		<widget-weather></widget-weather>
	</div>
</template>

<script>
import WidgetDeadline from './Deadline/index.vue';
import WidgetWeather from './Weather/index.vue';
export default {
	name: 'TheWidgets',
	components: {
		WidgetDeadline,
		WidgetWeather,
	},
};
</script>

<style lang="scss" scoped></style>
