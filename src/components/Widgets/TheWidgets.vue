<template>
	<div
		v-if="
			userStore.userData.widgetWeather.active ||
			userStore.userData.widgetDL.active
		"
		class="main__widgets widgets"
	>
		<widget-deadline></widget-deadline>
		<widget-weather></widget-weather>
	</div>
</template>

<script setup>
import WidgetDeadline from './Deadline/index.vue';
import WidgetWeather from './Weather/index.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
