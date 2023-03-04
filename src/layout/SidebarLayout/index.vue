<template>
	<aside v-if="settingStore.isOpenMenu" class="sidebar">
		<div class="sidebar__category category">
			<ul v-if="menuStore.menu.length > 0" class="category__list">
				<li
					v-for="item in menuStore.menu"
					:key="item.id"
					class="category__item"
				>
					<router-link
						:to="'/category/' + item.attributes.slug"
						class="category__link"
					>
						<i v-if="item.attributes.icon" :class="item.attributes.icon"></i>
						<i v-else class="lar la-star"></i>
						<span>{{ item.attributes.title }}</span>
					</router-link>
					<div
						v-if="settingStore.isEdit"
						class="app-edit-category"
						@click.prevent="openDialogCategoryEdit(item.id)"
					>
						<i class="las la-cog"></i>
					</div>
				</li>
				<li
					v-if="settingStore.isEdit"
					class="category__item category__item_trash"
				>
					<router-link :to="'/trash'" class="category__link">
						<i class="lar la-trash-alt"></i>
						<span>Корзина</span>
					</router-link>
				</li>
				<li class="category__add" @click.prevent="openDialogCategoryAdd">
					<i class="las la-plus"></i> <span>Добавить</span>
				</li>
			</ul>
			<the-preloader v-else size="small"></the-preloader>
		</div>
		<information-sidebar></information-sidebar>
		<category-add
			v-if="dialogCategoryAdd.status"
			:is-open="dialogCategoryAdd.status"
			@success="dialogYes"
			@close="dialogClose"
		></category-add>
		<category-edit
			v-if="dialogCategoryEdit.status && dialogCategoryEdit.id"
			:id-category="dialogCategoryEdit.id"
			:is-open="dialogCategoryEdit.status"
			@success="dialogYes"
			@close="dialogClose"
		></category-edit>
	</aside>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, reactive } from 'vue';
import { useSettingStore } from '@/stores/settings';
import { useMenuStore } from '@/stores/menu';
import CategoryAdd from '@/components/Category/CategoryAdd.vue';
import CategoryEdit from '@/components/Category/CategoryEdit.vue';
import InformationSidebar from '@/components/Information/InformationSidebar.vue';
import ThePreloader from '@/components/ThePreloader.vue';

const menuStore = useMenuStore();
const settingStore = useSettingStore();

const isLoading = ref(false);

const dialogCategoryAdd = reactive({
	status: false,
});

const dialogCategoryEdit = reactive({
	status: false,
	id: 0,
});

/**
 * Открываем окно добавления категории
 */
const openDialogCategoryAdd = () => {
	dialogCategoryAdd.status = true;
};

/**
 * Открываем окно редактирования категории
 */
const openDialogCategoryEdit = (id) => {
	dialogCategoryEdit.id = id;
	dialogCategoryEdit.status = true;
};

/**
 * Закрываем окно при отмене добавления категории
 */
const dialogClose = () => {
	dialogCategoryAdd.status = false;
	dialogCategoryEdit.status = false;
};

/**
 * Закрываем окно и обновляем список при добавлении категории
 */
const dialogYes = () => {
	dialogCategoryAdd.status = false;
	dialogCategoryEdit.status = false;
	menuStore.getCategoryMenu();
};

onBeforeMount(() => {
	isLoading.value = true;
});
onMounted(() => {
	//	menuStore.getCategoryMenu();
	isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
