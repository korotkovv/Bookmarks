<template>
	<main class="main">
		<sub-category></sub-category>
		<div class="main__header">
			<div class="main__title">
				{{ menuStore.nameCategory ? menuStore.nameCategory : 'Нет данных' }}
			</div>
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
import { onMounted, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSettingStore } from '@/stores/settings';
import { useMenuStore } from '@/stores/menu';

import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import SubCategory from '@/components/Category/SubCategory.vue';
import LinkGrid from '@/components/Link/LinkGrid.vue';
import LinkList from '@/components/Link/LinkList.vue';
import links from '@/service/endpoints/links';

const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const menuStore = useMenuStore();

const linksList = ref([]);

/**
 * Получаем список ссылок категории
 * @param {number} id - ID Категории
 */
const getLinks = async (id) => {
	linksList.value = await links
		.getLinks(id ? id : 1)
		.then((response) => {
			return response.data.data.attributes.links.data;
		})
		.catch((error) => console.log(error));
};

/**
 * Обновление категории
 */
const refreshLinksList = () => {
	getLinks(menuStore.idCategory);
};

onMounted(() => {
	menuStore.setSlug(route.params.slug);
});

watch(
	() => route.params.slug,
	(newV, oldV) => {
		if (menuStore.slugChecked(route.params.slug) > -1) {
			menuStore.setSlug(route.params.slug);
			getLinks(menuStore.idCategory);
		} else {
			router.push('/404');
		}
	}
);

watch(
	() => menuStore.idCategory,
	(newV, oldV) => {
		if (menuStore.idCategory) {
			getLinks(menuStore.idCategory);
		}
	}
);
</script>

<style lang="scss" scoped></style>
