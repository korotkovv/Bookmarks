<template>
	<div v-if="isOpen" class="modal modal__addlink active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить категорию</div>
				<div class="modal__close" @click="dialogClose">&times;</div>
			</div>
			<form @submit.prevent="dialogAddSuccess">
				<div class="modal__body">
					<div class="form__row">
						<div class="form__col">
							<div class="form__group_max">
								<label for="title">Заголовок <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model.trim="addCategory.title"
									id="title"
									type="text"
									placeholder="Заголовок"
									required
								/>
							</div>
							<div class="form__group_max">
								<label for="slug">Slug<span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model.trim="addCategory.slug"
									id="slug"
									type="text"
									placeholder="Slug"
									required
								/>
							</div>
						</div>
						<div class="form__col">
							<div class="form__group_max">
								<label for="sort">Сортировка <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model="addCategory.sort"
									id="sort"
									type="number"
									min="0"
									placeholder="Сортировка"
									required
								/>
							</div>

							<div class="form__group_max">
								<label for="icon">Иконка <span>*</span></label>
							</div>
							<div class="form__group_max">
								<input
									v-model.trim="addCategory.icon"
									id="icon"
									type="text"
									placeholder="Иконка"
									required
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="modal__footer">
					<div class="modal__action">
						<button class="btn modal__btn_save" type="submit">
							<i class="las la-plus"></i> Добавить
						</button>

						<button
							class="btn_outline modal__btn_close"
							@click.prevent="dialogClose"
						>
							Закрыть
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useSettingStore } from '@/stores/settings';
import links from '@/service/endpoints/links';

const settingStore = useSettingStore();

const emit = defineEmits(['close', 'success']);

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const form = ref(false);
const addCategory = reactive({
	isMain: true,
	title: null,
	slug: null,
	icon: 'las la-campground',
	sort: 1,
});

/**
 * Добавление новой категории
 * @param {string} title - Заголовок категории
 * @param {string} slug - slug категории
 * @param {string} icon - Иконка категории
 * @param {number} sort - Сортировка категории
 */
const addCategorySend = async (title, slug, icon, sort) => {
	await links
		.postMainCategory(title, slug, icon, sort)
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.then(() => {
			settingStore.addToast(
				'success',
				`Добавлена главная категория '${title}'`
			);
			emit('success');
			resetFields();
		})
		.catch((error) => {
			settingStore.addToast('error', error.response.data.error?.message);
			return console.log(error);
		});
};

/**
 * Закрытие окна формы
 */
const dialogClose = () => {
	emit('close');
};

/**
 * Сохранение ссылки
 */
const dialogAddSuccess = () => {
	if (
		addCategory.title &&
		addCategory.slug &&
		addCategory.icon &&
		addCategory.sort
	) {
		addCategorySend(
			addCategory.title,
			addCategory.slug,
			addCategory.icon,
			addCategory.sort
		);
	} else {
		console.log('Что то не заполнено');
	}
};

/**
 * Сброс полей формы в значение по умолчанию
 */
const resetFields = () => {
	addCategory.title = null;
	addCategory.slug = null;
	addCategory.icon = null;
	addCategory.sort = 1;
};
</script>

<style lang="scss" scoped></style>
