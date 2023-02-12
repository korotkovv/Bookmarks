<template>
	<div v-if="isOpen" class="modal active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Выбрать иконку</div>
				<div class="modal__close" @click.prevent="dialogClose">&times;</div>
			</div>

			<div class="modal__body">
				<div class="app-icons">
					<div class="app-icons__list">
						<i
							v-for="(icon, idx) in iconArr"
							key="idx"
							class="app-icons__item"
							:class="
								currentIconIdx === idx
									? 'app-icons__item_active' + ' ' + icon
									: icon
							"
							:title="icon"
							@click.prevent="setIcon(icon, idx)"
						>
						</i>
					</div>
				</div>
			</div>
			<div class="modal__footer">
				<div class="modal__action">
					<button class="btn modal__btn_save" @click.prevent="dialogAddSuccess">
						<i class="las la-plus"></i> Выбрать
					</button>

					<button
						class="btn_outline modal__btn_close"
						@click.prevent="dialogClose"
					>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import iconArr from '@/components/Icons/iconArr';

const emit = defineEmits(['update:icon', 'close', 'success']);
const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
		default: false,
	},
	icon: {
		type: String,
		required: true,
		default: false,
	},
});

const currentIcon = ref('');
const currentIconIdx = ref(null);

/**
 * Закрытие окна иконок
 */
const dialogClose = () => {
	emit('close');
};

/**
 * Добавление иконки
 */
const dialogAddSuccess = () => {
	emit('success');
	emit('update:icon', currentIcon.value);
};

const setIcon = (icon, idx) => {
	currentIcon.value = icon;
	currentIconIdx.value = idx;
};
</script>

<style lang="scss" scoped></style>
