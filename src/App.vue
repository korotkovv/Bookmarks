<template>
	<main-layout v-if="layout === 'main'"></main-layout>
	<auth-layout v-else-if="layout === 'auth'"></auth-layout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useSettingStore } from '@/stores/settings';
import MainLayout from '@/layout/MainLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import '@/scss/style.scss';

const userStore = useUserStore();
const settingStore = useSettingStore();
const route = useRoute();
const layout = ref('auth');
userStore.tokenChecked();

layout.value = route.meta.layout || 'auth';

const setTheme = () => {
	let htmlElement = document.documentElement;

	if (settingStore.appTheme === 'dark') {
		localStorage.setItem('theme', 'dark');
		htmlElement.setAttribute('theme', 'dark');
	} else if (settingStore.appTheme === 'light') {
		localStorage.setItem('theme', 'light');
		htmlElement.setAttribute('theme', 'light');
	} else if (settingStore.appTheme === 'black') {
		localStorage.setItem('theme', 'black');
		htmlElement.setAttribute('theme', 'black');
	}
};

onMounted(() => {
	setTheme();
});

watch(
	() => route.meta.layout,
	() => {
		layout.value = route.meta.layout;
	}
);

watch(
	() => settingStore.appTheme,
	() => {
		setTheme();
	}
);
</script>
