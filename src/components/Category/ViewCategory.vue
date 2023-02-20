<template>
	<main class="main">
		<sub-category></sub-category>
		<div class="main__header">
			<h1 class="main__title">
				{{
					menuStore.nameCategory ? menuStore.nameCategory : 'Выберите категорию'
				}}
			</h1>
			<div v-if="menuStore.nameCategory" class="main__switcher switcher">
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
			<div v-if="menuStore.nameCategory" class="main__wrap">
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

				<div v-if="pagination.pageCount > 1" class="pagination">
					<ul>
						<li v-if="pagination.page > 1" @click.prevent="prevPaginationPage">
							<span><i class="las la-angle-double-left"></i></span>
						</li>
						<li
							v-for="(item, idx) of pagination.pageCount"
							:key="idx"
							@click.prevent="setPaginationPage(idx + 1)"
						>
							<span :class="pagination.page === idx + 1 ? 'active' : ''">{{
								idx + 1
							}}</span>
						</li>
						<li
							v-if="pagination.pageCount > pagination.page"
							@click.prevent="nextPaginationPage"
						>
							<span><i class="las la-angle-double-right"></i></span>
						</li>
					</ul>
				</div>
			</div>
			<div v-else class="main__wrap"><h3>Категория не выбрана!</h3></div>

			<the-widgets v-if="settingStore.isWatchWidgets"></the-widgets>
		</div>
	</main>
</template>

<script setup>
import { onMounted, watch, ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useSettingStore } from '@/stores/settings';
import { useMenuStore } from '@/stores/menu';

import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import SubCategory from '@/components/Category/SubCategory.vue';
import LinkGrid from '@/components/Link/LinkGrid.vue';
import LinkList from '@/components/Link/LinkList.vue';
import links from '@/service/endpoints/links';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const settingStore = useSettingStore();
const menuStore = useMenuStore();

const linksList = ref([]);

const pagination = reactive({
	page: 1,
	pageSize: 50,
	pageCount: 1,
	total: 1,
});

/**
 * Получаем список ссылок категории
 * @param {number} id - ID Категории
 * @param {number} page - ID текущая страница
 * @param {number} pageSize - ID Количество на странице
 * @param {number} userId - ID пользователя
 */
const getLinks = async (id, page, pageSize, userId) => {
	linksList.value = await links
		.getLinks(id, page, pageSize, userId)
		.then((response) => {
			//	console.log(response.data);
			if (response.status === 200) {
				pagination.page = response.data.meta.pagination.page;
				pagination.pageSize = response.data.meta.pagination.pageSize;
				pagination.pageCount = response.data.meta.pagination.pageCount;
				pagination.total = response.data.meta.pagination.total;
			}
			return response.data.data;
		})
		.catch((error) => console.log(error));
};

/**
 * Обновление категории
 */
const refreshLinksList = () => {
	getLinks(
		menuStore.idCategory,
		pagination.page,
		pagination.pageSize,
		userStore.userData.id
	);
};

/**
 * Отправка запроса при изменении пагинации
 */
const setPaginationPage = (idx) => {
	if (pagination.page !== idx) {
		getLinks(
			menuStore.idCategory,
			idx,
			pagination.pageSize,
			userStore.userData.id
		);
	}
};

/**
 * Загрузить предыдущую страницу
 */
const prevPaginationPage = () => {
	if (pagination.page > 1) {
		getLinks(
			menuStore.idCategory,
			pagination.page - 1,
			pagination.pageSize,
			userStore.userData.id
		);
	}
};

/**
 * Загрузить предыдущую страницу
 */
const nextPaginationPage = () => {
	if (pagination.pageCount > pagination.page) {
		getLinks(
			menuStore.idCategory,
			pagination.page + 1,
			pagination.pageSize,
			userStore.userData.id
		);
	}
};

onMounted(() => {
	menuStore.setSlug(route.params.slug);

	if (route.path === '/category' || route.path === '/category/') {
		router.push(`/category/${menuStore.slugArr[0]}`);
	}
	getLinks(menuStore.idCategory, 1, pagination.pageSize, userStore.userData.id);
});

watch(
	() => route.params.slug,
	(newV, oldV) => {
		if (!route.params.slug) {
			router.push(`/category/${menuStore.slugArr[0]}`);
		}
		if (menuStore.slugChecked(route.params.slug) > -1) {
			menuStore.setSlug(route.params.slug);
			if (!route.params.slug) {
				router.push(`/category/${menuStore.slugArr[0]}`);
			}
		} else {
			router.push(`/category/${menuStore.slugArr[0]}`);
		}
	}
);

watch(
	() => route.path,
	(newV, oldV) => {
		if (route.path === '/category' || route.path === '/category/') {
			router.push(`/category/${menuStore.slugArr[0]}`);
		}
	}
);

watch(
	() => menuStore.idCategory,
	(newV, oldV) => {
		if (menuStore.idCategory) {
			getLinks(
				menuStore.idCategory,
				1,
				pagination.pageSize,
				userStore.userData.id
			);
		}
	}
);
</script>

<style lang="scss" scoped></style>
