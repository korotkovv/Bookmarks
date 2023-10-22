<template>
	<div v-if="linkItem" class="lists__item list" :title="linkItem.url">
		<div class="list__setting" @click.prevent="openDialogLinkEdit">
			<i class="las la-sliders-h"></i>
		</div>
		<a :href="linkItem.url" class="list__url">
			<div class="list__img" :class="colorTheme">
				<i v-if="linkItem.icon" :class="linkItem.icon"></i>
				<span v-else class="list__tag">{{
					linkItem.title[0].toUpperCase()
				}}</span>
			</div>
			<div class="list__body">
				<div class="list__title">{{ linkItem.title }}</div>
				<div class="list__desc">{{ linkItem.desc }}</div>
			</div>
		</a>
	</div>
	<template v-if="isOpenEditLink">
		<link-edit
			v-if="dialogLinkEdit.status"
			:id-link="idLink"
			:id-category="idCategory"
			:is-open="dialogLinkEdit.status"
			@success="dialogYes"
			@close="dialogClose"
		></link-edit>
	</template>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import LinkEdit from './LinkEdit.vue';

const emit = defineEmits(['refresh']);
const props = defineProps({
	idLink: {
		type: Number,
		required: true,
	},
	linkItem: {
		type: Object,
		required: true,
		default: null,
	},
	idCategory: {
		type: Number,
		required: false,
	},
});
const isOpenEditLink = ref(false);
const dialogLinkEdit = reactive({
	status: false,
});
const colorTheme = computed(() => {
	switch (props.linkItem.color) {
		case 'standard':
			return 'list__img_dark';
		case 'orange':
			return 'list__img_orange';
		case 'blue':
			return 'list__img_indigo';
		case 'green':
			return 'list__img_green';
		case 'yellow':
			return 'list__img_yellow';
		case 'purple':
			return 'list__img_purple';
		case 'red':
			return 'list__img_red';
		default:
			return 'list__img_dark';
	}
});

/**
 * Открываем окно редактирование ссылки
 */
const openDialogLinkEdit = () => {
	isOpenEditLink.value = true;
	dialogLinkEdit.status = true;
};

/**
 * Закрываем окно редактирование ссылки
 */
const dialogClose = () => {
	dialogLinkEdit.status = false;
	isOpenEditLink.value = false;
};

/**
 * Нажатие кнопки сохранения изменений
 */
const dialogYes = () => {
	dialogLinkEdit.status = false;
	isOpenEditLink.value = false;
	emit('refresh');
};
</script>

<style lang="scss" scoped></style>
