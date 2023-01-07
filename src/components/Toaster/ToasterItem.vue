<template>
	<div class="toaster__item" :class="colorToast">
		<div class="toaster__close" @click="closeToast">&times;</div>
		<div class="toaster__text">{{ text }}</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useSettingStore } from '@/stores/settings';
export default {
	name: 'ToasterItem',
	emits: ['close-toast'],
	props: {
		type: {
			type: String,
			required: false,
			default: 'success',
		},
		text: {
			type: String,
			required: false,
			default: 'success',
		},
	},

	data: () => ({
		//
	}),
	computed: {
		colorToast() {
			switch (this.type) {
				case 'success':
					return 'toaster__item_success';
				case 'warning':
					return 'toaster__item_warning';
				case 'error':
					return 'toaster__item_error';
				default:
					return 'toaster__item_success';
			}
		},
	},

	methods: {
		/**
		 * Нажатие на кнопку закрыть
		 */
		closeToast() {
			this.$emit('close-toast');
		},
		...mapActions(useSettingStore, ['removeToast']),
	},

	mounted() {
		setTimeout(
			function () {
				this.removeToast();
			}.bind(this),
			5500
		);
	},
};
</script>

<style lang="scss" scoped></style>
