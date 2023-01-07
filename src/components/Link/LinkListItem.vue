<template>
	<div v-if="linkItem" class="lists__item list">
		<div class="list__setting" @click.prevent="openDialogLinkEdit">
			<i class="las la-sliders-h"></i>
		</div>
		<a :href="linkItem.url" class="list__url" target="_blank">
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
			:id-link="idLink"
			:id-category="idCategory"
			:is-open="dialogLinkEdit.status"
			@success="dialogYes"
			@close="dialogClose"
		></link-edit>
	</template>
</template>

<script>
import LinkEdit from './LinkEdit.vue';

export default {
	emits: ['refresh'],
	props: {
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
	},
	data: () => ({
		isOpenEditLink: false,
		dialogLinkEdit: {
			status: false,
		},
		dialogLink: false,
	}),
	computed: {
		colorTheme() {
			switch (this.linkItem.color) {
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
				default:
					return 'list__img_dark';
			}
		},
	},

	methods: {
		/**
		 * Открываем окно редактирование ссылки
		 */
		openDialogLinkEdit() {
			this.isOpenEditLink = true;
			this.dialogLinkEdit.status = true;
		},

		/**
		 * Закрываем окно редактирование ссылки
		 */
		dialogClose() {
			this.dialogLinkEdit.status = false;
			this.isOpenEditLink = false;
		},

		/**
		 * Нажатие кнопки сохранения изменений
		 */
		dialogYes() {
			this.dialogLinkEdit.status = false;
			this.isOpenEditLink = false;
			this.$emit('refresh');
		},
	},
	components: {
		LinkEdit,
	},
};
</script>

<style lang="scss" scoped></style>
