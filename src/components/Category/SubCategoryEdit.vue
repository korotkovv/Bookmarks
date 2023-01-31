<template>
	<div v-if="isOpen" class="modal modal__addlink active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">
					Редактировать подкатегории id: {{ idCategory }} || {{ idSubCategory }}
				</div>
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
									v-model="v$.title.$model"
									id="title"
									type="text"
									placeholder="Заголовок"
								/>
								<template v-if="v$.title.$dirty">
									<div
										v-for="error of v$.title.$silentErrors"
										:key="error.$message"
										class="form__error"
									>
										{{ error.$message }}
									</div>
								</template>
							</div>
							<div class="form__group_max">
								<label for="slug">Slug<span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model="v$.slug.$model"
									id="slug"
									type="text"
									placeholder="Slug"
								/>
								<template v-if="v$.slug.$dirty">
									<div
										v-for="error of v$.slug.$silentErrors"
										:key="error.$message"
										class="form__error"
									>
										{{ error.$message }}
									</div>
								</template>
							</div>
							<div class="form__group_max">
								<label for="category">Категория</label>
							</div>
							<div class="form__group_max mb-6">
								<select
									v-model="editSubCategory.category"
									id="category"
									placeholder="Категория"
								>
									<template v-for="item in menuStore.menu" :key="item.id">
										<option :value="item.id">
											{{ item.attributes.title }}
										</option>
									</template>
								</select>
							</div>
						</div>
						<div class="form__col">
							<div class="form__group_max">
								<label for="sort">Сортировка <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model="v$.sort.$model"
									id="sort"
									type="number"
									min="0"
									placeholder="Сортировка"
									required
								/>
								<template v-if="v$.sort.$dirty">
									<div
										v-for="error of v$.sort.$silentErrors"
										:key="error.$message"
										class="form__error"
									>
										{{ error.$message }}
									</div>
								</template>
							</div>

							<div class="form__group_max">
								<label for="icon">Иконка <span>*</span></label>
							</div>
							<div class="form__group_max">
								<input
									v-model.trim="editSubCategory.icon"
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
							<i class="las la-save"></i> Сохранить
						</button>

						<button
							class="btn_outline modal__btn_close"
							@click.prevent="dialogClose"
						>
							Закрыть
						</button>
					</div>
					<div class="modal__delete">
						<button
							class="btn_delete modal__btn_delete"
							@click.prevent="
								removeSubCategory(idSubCategory, editSubCategory.title)
							"
						>
							<i class="las la-trash-alt"></i>
							Удалить
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';
import links from '@/service/endpoints/links';
import useVuelidate from '@vuelidate/core';
import {
	minLength,
	required,
	helpers,
	numeric,
	minValue,
} from '@vuelidate/validators';

const settingStore = useSettingStore();
const menuStore = useMenuStore();

const emit = defineEmits(['close', 'success']);

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
		default: false,
	},
	idCategory: {
		type: Number,
		required: true,
	},
	idSubCategory: {
		type: Number,
		required: true,
	},
});

const form = ref(false);
const editSubCategory = reactive({
	category: null,
	id: null,
	isMain: true,
	title: null,
	slug: null,
	icon: null,
	sort: 1,
});

// Валидация
const requiredNameLength = ref(4);
const rules = computed(() => ({
	title: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 4 символа`,
			minLength(requiredNameLength.value)
		),
	},
	slug: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 4 символа`,
			minLength(requiredNameLength.value)
		),
	},
	sort: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		numeric: helpers.withMessage(`Вы можете ввести только цифры`, numeric),
		minValue: helpers.withMessage(
			`Значение не должно быть отрицательным`,
			minValue(0)
		),
	},
}));

const v$ = useVuelidate(rules, editSubCategory);

/**
 * Получаем данные главной категории
 * @param {number} id - ID категории
 */
const getSubCategory = async (id) => {
	await links
		.getCategory(id)
		.then((response) => {
			console.log(response.data?.data.attributes);
			if (response.data?.data.attributes) {
				editSubCategory.title = response.data?.data.attributes.title;
				editSubCategory.slug = response.data?.data.attributes.slug;
				editSubCategory.icon = response.data?.data.attributes.icon;
				editSubCategory.sort = response.data?.data.attributes.sort;
			}
			return response;
		})
		.catch((error) => {
			settingStore.addToast('error', error.response.data?.error?.message);
			return console.log(error);
		});
};

/**
 * Изменение категории
 * @param {number} idCategory - ID категории
 * @param {number} id - ID подкатегории
 * @param {string} title - Заголовок подкатегории
 * @param {string} slug - slug подкатегории
 * @param {string} icon - Иконка подкатегории
 * @param {number} sort - Сортировка подкатегории
 */
const editSubCategorySend = async (idCategory, id, title, slug, icon, sort) => {
	await links
		.putSubCategory(idCategory, id, title, slug, icon, sort)
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.then(() => {
			settingStore.addToast('success', `Изменена главная категория '${title}'`);
			emit('success');
			resetFields();
		})
		.catch((error) => {
			settingStore.addToast('error', error.response.data.error?.message);
			return console.log(error);
		});
};

/**
 * Удаление подкатегории
 * @param {number} id - ID подкатегории
 * @param {string} title - Название подкатегории
 */
const removeSubCategory = async (id, title) => {
	await links
		.delCategory(id)
		.then((response) => {
			console.log(response.data);
		})
		.then(() => {
			settingStore.addToast('error', `Подкатегория '${title}' удалена`);
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
	v$.value.$touch();
	//	console.log(v$.value.$error);
	if (v$.value.$error) return;

	if (
		!v$.value.$error &&
		editSubCategory.category &&
		props.idSubCategory &&
		editSubCategory.title &&
		editSubCategory.slug &&
		editSubCategory.icon &&
		editSubCategory.sort
	) {
		editSubCategorySend(
			editSubCategory.category,
			props.idSubCategory,
			editSubCategory.title,
			editSubCategory.slug.toLowerCase(),
			editSubCategory.icon,
			editSubCategory.sort
		);
	} else {
		console.log('Что то не заполнено');
		console.log(v$.value.$error);
	}
};

/**
 * Сброс полей формы в значение по умолчанию
 */
const resetFields = () => {
	editSubCategory.category = null;
	editSubCategory.title = null;
	editSubCategory.slug = null;
	editSubCategory.icon = null;
	editSubCategory.sort = 1;
};

/**
 * Начальное значение категории для select
 * @param {number} id - ID категории
 */
const getCategoryId = (id) => {
	editSubCategory.category = id;
};

onMounted(() => {
	getSubCategory(props.idSubCategory);
	getCategoryId(props.idCategory);
});

watch(
	() => props.idSubCategory,
	(newV, oldV) => {
		getSubCategory(props.idSubCategory);
	},
	() => props.idCategory,
	(newV, oldV) => {
		getCategoryId(props.idCategory);
	}
);
</script>

<style lang="scss" scoped></style>
