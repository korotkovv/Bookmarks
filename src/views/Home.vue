<template>
	<router-view></router-view>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';

const router = useRouter();
const menuStore = useMenuStore();

onMounted(() => {
	router.push(`/category/${menuStore.slugArr[0]}`);
});

watch(
	() => menuStore.slugArr,
	() => {
		if (menuStore.slugArr.length > 0) {
			router.push(`/category/${menuStore.slugArr[0]}`);
		}
	}
);
</script>

<style lang="scss" scoped></style>
