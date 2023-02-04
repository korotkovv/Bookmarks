<template>
	<button class="btn__icon" @click.prevent="openDialogAddIcon">
		<i class="las la-plus"></i>
	</button>
	<icon-list
		:is-open="isOpen"
		@success="dialogYes"
		@close="dialogClose"
	></icon-list>
</template>

<script setup>
import { ref } from 'vue';
import IconList from './IconList.vue';

const isOpen = ref(false);

const emit = defineEmits(['icon']);

const openDialogAddIcon = () => {
	isOpen.value = !isOpen.value;
};

const dialogClose = () => {
	isOpen.value = false;
};

const dialogYes = () => {
	isOpen.value = false;
	emit('icon');
};
</script>

<style lang="scss" scoped></style>
