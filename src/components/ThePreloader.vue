<template>
	<div class="app-preloader">
		<div v-if="size === 'small'" class="app-preloader__spinner-small"></div>
		<div v-else class="app-preloader__spinner"></div>
	</div>
</template>

<script setup>
const props = defineProps({
	size: {
		type: String,
		required: false,
		default: 'standard',
	},
});
</script>

<style lang="scss" scoped></style>
