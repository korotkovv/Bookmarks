<template>
	<div class="toaster__item" :class="colorToast">
		<div class="toaster__close" @click="closeToast">&times;</div>
		<div class="toaster__text">{{ props.text }}</div>
	</div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useSettingStore } from '@/stores/settings';

const settingStore = useSettingStore();

const emit = defineEmits(['close-toast']);

const props = defineProps({
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
});

const colorToast = computed(() => {
	switch (props.type) {
		case 'success':
			return 'toaster__item_success';
		case 'warning':
			return 'toaster__item_warning';
		case 'error':
			return 'toaster__item_error';
		default:
			return 'toaster__item_success';
	}
});

/**
 * Нажатие на кнопку закрыть
 */
const closeToast = () => {
	emit('close-toast');
};

onMounted(() => {
	setTimeout(
		function () {
			settingStore.removeToast();
		}.bind(this),
		4000
	);
});
</script>

<style lang="scss" scoped></style>
