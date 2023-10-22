<template>
	<div v-if="linkItem" class="links__item link" :title="linkItem.url">
		<div class="link__setting" @click.prevent="openDialogLinkEdit">
			<i class="las la-sliders-h"></i>
		</div>
		<a :href="linkItem.url" class="link__url">
			<div class="link__img" :class="colorTheme">
				<i v-if="linkItem.icon" :class="linkItem.icon"></i>
				<span v-else class="link__tag">{{ linkItem.title }}</span>
			</div>
			<div class="link__body">
				<div class="link__title">{{ linkItem.title }}</div>
				<div class="link__desc">{{ linkItem.desc }}</div>
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
			return 'link__img_dark';
		case 'orange':
			return 'link__img_orange';
		case 'blue':
			return 'link__img_indigo';
		case 'green':
			return 'link__img_green';
		case 'yellow':
			return 'link__img_yellow';
		case 'purple':
			return 'link__img_purple';
		case 'red':
			return 'list__img_red';
		default:
			return 'link__img_dark';
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
