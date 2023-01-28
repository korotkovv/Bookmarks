<template>
	<aside class="sidebar">
		<div class="sidebar__category category">
			<ul v-if="menuStore.menu.length > 0" class="category__list">
				<li
					v-for="item in menuStore.menu"
					:key="item.id"
					class="category__item"
				>
					<router-link :to="'/' + item.attributes.slug" class="category__link">
						<i v-if="item.attributes.icon" :class="item.attributes.icon"></i>
						<i v-else class="lar la-star"></i>
						<span>{{ item.attributes.title }}</span>
					</router-link>
				</li>
				<li class="category__add" @click="addCategory">
					<i class="las la-plus"></i> <span>Добавить</span>
				</li>
			</ul>
			<div v-else>Загрузка ...</div>
		</div>
		<information-sidebar></information-sidebar>
	</aside>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

import { useMenuStore } from '@/stores/menu';
import InformationSidebar from '@/components/Information/InformationSidebar.vue';

const menuStore = useMenuStore();

const isLoading = ref(false);

const addCategory = () => {
	console.log('Добавляем категорию');
};

onBeforeMount(() => {
	isLoading.value = true;
});
onMounted(() => {
	menuStore.getCategoryMenu();
	isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
