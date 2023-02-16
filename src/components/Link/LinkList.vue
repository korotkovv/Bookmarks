<template>
	<div class="main__links lists">
		<template v-if="linksList.length > 0">
			<link-list-item
				v-for="linkItem in linksList"
				:linkItem="linkItem.attributes"
				:key="linkItem.id"
				:id-link="linkItem.id"
				:id-category="menuStore.idCategory"
				@refresh="refreshLinks"
			></link-list-item>
		</template>
		<div class="lists__item addlist" @click="openDialogLinkAdd">
			<div href="#?" class="addlist__url">
				<div class="addlist__img">
					<img
						v-if="settingStore.appTheme === 'light'"
						src="@/assets/plus-small-black.svg"
						alt="plus"
					/>
					<img v-else src="@/assets/plus-small.svg" alt="plus" />
				</div>
				<div class="addlist__body">
					<div class="addlist__title">Добавить</div>
					<div class="addlist__desc">Добавить закладку</div>
				</div>
			</div>
		</div>
		<link-add
			v-if="dialogLinkAdd.status"
			:id-category="menuStore.idCategory"
			:is-open="dialogLinkAdd.status"
			@success="dialogYes"
			@close="dialogClose"
		></link-add>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import { useSettingStore } from '@/stores/settings';
import { useMenuStore } from '@/stores/menu';
import LinkListItem from './LinkListItem.vue';
import LinkAdd from './LinkAdd.vue';

const menuStore = useMenuStore();
const settingStore = useSettingStore();
const emit = defineEmits(['refresh']);
const props = defineProps({
	linksList: {
		type: Array,
		required: false,
		default: [],
	},
});

const dialogLinkAdd = reactive({
	status: false,
});

/**
 * Открытие окна добавления ссылки
 */
const openDialogLinkAdd = () => {
	dialogLinkAdd.status = true;
};

/**
 * Закрытие окна добавления ссылки, при нажатии Отмена
 */
const dialogClose = () => {
	dialogLinkAdd.status = false;
};
/**
 * Закрытие окна добавления ссылки, при нажатии Добавить
 */
const dialogYes = () => {
	dialogLinkAdd.status = false;
	emit('refresh');
};

/**
 * Обновление ссылок
 */
const refreshLinks = () => {
	emit('refresh');
};
</script>

<style lang="scss" scoped></style>
