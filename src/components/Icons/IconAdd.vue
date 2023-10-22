<template>
	<button class="btn__icon" @click.prevent="openDialogAddIcon">
		<i class="las la-plus"></i>
	</button>
	<icon-list
		:icon="icon"
		:is-open="isOpen"
		@success="dialogYes"
		@close="dialogClose"
		@update:icon="icon = $event"
	></icon-list>
</template>

<script setup>
import { ref } from 'vue';
import IconList from './IconList.vue';

const props = defineProps({
	icons: {
		type: String,
		required: true,
		default: false,
	},
});
const isOpen = ref(false);
const icon = ref('');
const emit = defineEmits(['update:icons']);

/**
 * Открытие окна добавления иконки
 */
const openDialogAddIcon = () => {
	isOpen.value = !isOpen.value;
};

/**
 * Закрытие окна добавления иконки (отмена)
 */
const dialogClose = () => {
	isOpen.value = false;
};

/**
 * Закрытие окна добавления иконки  (выбор)
 */
const dialogYes = () => {
	isOpen.value = false;
	emit('update:icons', icon);
};
</script>

<style lang="scss" scoped></style>
