<template>
	<component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import '@/scss/style.scss';
import MainLayout from '@/layout/MainLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
export default {
	name: 'App',

	data: () => ({
		isAuth: true,
	}),
	computed: {
		layout() {
			return this.$route.meta.layout;
		},
	},
	components: {
		'main-layout': MainLayout,
		'auth-layout': AuthLayout,
	},
};
</script>
