<template>
	<main class="main">
		<sub-category></sub-category>
		<div class="main__header">
			<div class="main__title">Корзина</div>
			<div class="main__switcher switcher">
				<button
					class="switcher__grid"
					:class="settingStore.switcher === 'grid' ? 'active' : ''"
					@click="settingStore.switcherGridHandle"
				>
					<i class="lab la-buromobelexperte"></i>
				</button>
				<button
					class="switcher__list"
					:class="settingStore.switcher === 'list' ? 'active' : ''"
					@click="settingStore.switcherListHandle"
				>
					<i class="las la-list"></i>
				</button>
			</div>
		</div>
		<div class="main__body">
			<link-grid
				v-if="settingStore.switcher === 'grid'"
				:linksList="linksList"
				@refresh="refreshLinksList"
			></link-grid>
			<link-list
				v-else="settingStore.switcher === 'list'"
				:linksList="linksList"
				@refresh="refreshLinksList"
			></link-list>
			<the-widgets v-if="settingStore.isWatchWidgets"></the-widgets>
		</div>
	</main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useSettingStore } from '@/stores/settings';
import { useMenuStore } from '@/stores/menu';
import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import SubCategory from '@/components/Category/SubCategory.vue';
import LinkGrid from '@/components/Link/LinkGrid.vue';
import LinkList from '@/components/Link/LinkList.vue';
import links from '@/service/endpoints/links';

const userStore = useUserStore();
const settingStore = useSettingStore();
const menuStore = useMenuStore();
const linksList = ref([]);

/**
 * Получаем список ссылок без категории
 * @param {number} userId - ID пользователя
 */
const getLinksTrash = async (userId) => {
	linksList.value = await links
		.getTrash(userId)
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => console.log(error));
};

const refreshLinksList = () => {
	getLinks(menuStore.idCategory);
};

onMounted(() => {
	getLinksTrash(userStore.userData.id);
});
</script>

<style lang="scss" scoped></style>
