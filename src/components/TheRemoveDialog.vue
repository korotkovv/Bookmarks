<template>
	<div v-if="isOpen" class="modal active modal_center">
		<div class="modal__remove">
			<div class="modal__header">
				<div class="modal__title">Подтвердите удаление</div>
				<div class="modal__close" @click="dialogClose">&times;</div>
			</div>
			<div class="modal__body">Вы действительно хотите удалить?</div>
			<div class="modal__footer">
				<div class="modal__action">
					<button class="btn modal__del" @click.prevent="dialogSuccess">
						<i class="las la-trash"></i> Удалить
					</button>

					<button
						class="btn_outline modal__btn_close"
						@click.prevent="dialogClose"
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(['close', 'success']);

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
		default: false,
	},
});

/**
 * Подтверждение действия
 */
const dialogSuccess = () => {
	emit('success');
};

/**
 * Отмена действия
 */
const dialogClose = () => {
	emit('close');
};
</script>

<style lang="scss" scoped></style>
