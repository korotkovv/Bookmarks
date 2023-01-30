<template>
	<div class="main__subcategory subcategory">
		<ul class="subcategory__list">
			<template v-if="subCat">
				<li
					v-for="item in subCat"
					:key="item.id"
					class="subcategory__item"
					:class="item.id === menuStore.idCategory ? 'active' : ''"
					:id="item.id"
				>
					<span
						class="subcategory__link"
						@click="getCatId(item.id, item.attributes.title)"
					>
						<i
							:class="
								item.attributes.icon ? item.attributes.icon : 'las la-code'
							"
						></i>
						{{ item.attributes.title }}
					</span>
					<div
						v-if="settingStore.isEdit && item.attributes.title !== 'Общее'"
						class="app-edit-subcategory"
						@click.prevent="openDialogSubCategoryEdit(item.id)"
					>
						<i class="las la-cog"></i>
					</div>
				</li>
			</template>

			<li class="subcategory__add" @click.prevent="openDialogSubCategoryAdd">
				<i class="las la-plus"></i> <span>Добавить</span>
			</li>
		</ul>
		<sub-category-add
			v-if="dialogSubCategoryAdd.status"
			:id-category="menuStore.currentMainCategory"
			:is-open="dialogSubCategoryAdd.status"
			@success="dialogYes"
			@close="dialogClose"
		></sub-category-add>

		<sub-category-edit
			v-if="dialogSubCategoryEdit.status && dialogSubCategoryEdit.id"
			:id-category="menuStore.currentMainCategory"
			:id-sub-category="dialogSubCategoryEdit.id"
			:is-open="dialogSubCategoryEdit.status"
			@success="dialogYes"
			@close="dialogClose"
		></sub-category-edit>
	</div>
</template>

<script setup>
import { onMounted, computed, ref, reactive } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';
import SubCategoryAdd from './SubCategoryAdd.vue';
import SubCategoryEdit from './SubCategoryEdit.vue';

const settingStore = useSettingStore();
const menuStore = useMenuStore();

const isLoading = ref(false);

const dialogSubCategoryAdd = reactive({
	status: false,
});

const dialogSubCategoryEdit = reactive({
	status: false,
	id: 0,
});

/**
 * Открываем окно добавления категории
 */
const openDialogSubCategoryAdd = () => {
	dialogSubCategoryAdd.status = true;
};

/**
 * Открываем окно редактирования категории
 */
const openDialogSubCategoryEdit = (id) => {
	dialogSubCategoryEdit.id = id;
	dialogSubCategoryEdit.status = true;
};

/**
 * Закрываем окно при отмене добавления категории
 */
const dialogClose = () => {
	dialogSubCategoryAdd.status = false;
	dialogSubCategoryEdit.status = false;
};

/**
 * Закрываем окно и обновляем список при добавлении категории
 */
const dialogYes = () => {
	dialogSubCategoryAdd.status = false;
	dialogSubCategoryEdit.status = false;
	menuStore.getCategoryMenu();
};

/**
 * Получаем список подкатегорий
 */
const subCat = computed(() => {
	if (menuStore.slug) {
		const res = menuStore.menu.filter(
			(item) => item.attributes.slug === menuStore.slug
		);
		const sub = res[0]?.attributes.categoties.data;
		const links = res[0]?.attributes.links.data;
		const id = res[0]?.id;
		const name = res[0]?.attributes.title;
		//	console.log('name', name);
		if (Array.isArray(sub) && sub.length > 0) {
			menuStore.setIdCategory(sub[0].id);
			menuStore.setCurrentMainCategory(id);
			menuStore.setNameCategory(sub[0]?.attributes.title);
			if (Array.isArray(links) && links.length > 0) {
				const findItem = sub.find((el) => el.attributes.title === 'Общее');
				//		console.log('findItem', findItem);
				if (!findItem)
					sub.push({
						id: id,
						attributes: {
							icon: 'las la-code',
							title: 'Общее',
						},
					});
			}
			return sub;
		} else {
			menuStore.setIdCategory(id);
			menuStore.setCurrentMainCategory(id);
			menuStore.setNameCategory(name);
			return [
				{
					id: id,
					attributes: {
						icon: 'las la-code',
						title: 'Общее',
					},
				},
			];
		}
	}
	return false;
});

/**
 * Получаем ID категории
 * @param {number} id  - ID подкатегории
 * @param {string} name  - Название  подкатегории
 */
const getCatId = (id, name) => {
	menuStore.setIdCategory(id);
	menuStore.setNameCategory(name);
};

onMounted(() => {
	isLoading.value = true;
});
</script>

<style lang="scss" scoped></style>
