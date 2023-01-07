<template>
	<div v-if="linkItem" class="links__item link">
		<div class="link__setting" @click.prevent="openDialogLinkEdit">
			<i class="las la-sliders-h"></i>
		</div>
		<a :href="linkItem.url" class="link__url" target="_blank">
			<div class="link__img" :class="colorTheme">
				<i v-if="linkItem.icon" :class="linkItem.icon"></i>
				<span v-else class="list__tag">{{ linkItem.title }}</span>
			</div>
			<div class="link__body">
				<div class="link__title">{{ linkItem.title }}</div>
				<div class="link__desc">{{ linkItem.desc }} {{ linkItem.color }}</div>
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
				default:
					return 'link__img_dark';
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
