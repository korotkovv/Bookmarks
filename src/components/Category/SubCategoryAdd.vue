<template>
	<div v-if="isOpen" class="modal modal__addlink active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить подкатегорию {{ idCategory }}</div>
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
									v-model="addSubCategory.category"
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
									v-model.trim="addSubCategory.icon"
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
	idCategory: {
		type: Number,
		required: true,
	},
	isOpen: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const form = ref(false);
const addSubCategory = reactive({
	isMain: false,
	category: null,
	title: null,
	slug: null,
	icon: 'las la-otter',
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

const v$ = useVuelidate(rules, addSubCategory);

/**
 * Добавление новой подкатегории
 * @param {number} idCategory - ID категории
 * @param {string} title - Заголовок подкатегории
 * @param {string} title - Заголовок подкатегории
 * @param {string} slug - slug подкатегории
 * @param {string} icon - Иконка подкатегории
 * @param {number} sort - Сортировка подкатегории
 */
const addSubCategorySend = async (idCategory, title, slug, icon, sort) => {
	await links
		.postSubCategory(idCategory, title, slug, icon, sort)
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.then(() => {
			settingStore.addToast('success', `Добавлена подкатегория '${title}'`);
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
		addSubCategory.category &&
		addSubCategory.title &&
		addSubCategory.slug &&
		addSubCategory.icon &&
		addSubCategory.sort
	) {
		addSubCategorySend(
			addSubCategory.category,
			addSubCategory.title,
			addSubCategory.slug.toLowerCase(),
			addSubCategory.icon,
			addSubCategory.sort
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
	addSubCategory.category = null;
	addSubCategory.title = null;
	addSubCategory.slug = null;
	addSubCategory.icon = null;
	addSubCategory.sort = 1;
};

/**
 * Начальное значение категории для select
 * @param {number} id - ID категории
 */
const getCategoryId = (id) => {
	addSubCategory.category = id;
};

onMounted(() => {
	getCategoryId(props.idCategory);
});

watch(
	() => props.idCategory,
	(newV, oldV) => {
		getCategoryId(props.idCategory);
	}
);
</script>

<style lang="scss" scoped></style>
