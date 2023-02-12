<template>
	<main-layout v-if="layout === 'main'"></main-layout>
	<auth-layout v-else-if="layout === 'auth'"></auth-layout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import MainLayout from '@/layout/MainLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import '@/scss/style.scss';

const userStore = useUserStore();
const route = useRoute();
const layout = ref('auth');
userStore.tokenChecked();

layout.value = route.meta.layout || 'auth';

watch(
	() => route.meta.layout,
	() => {
		layout.value = route.meta.layout;
	}
);
</script>
