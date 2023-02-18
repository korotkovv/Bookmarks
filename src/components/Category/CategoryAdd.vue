<template>
	<div v-if="isOpen" class="modal active">
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

							<div class="form__group">
								<input
									v-model="v$.icon.$model"
									id="icon"
									type="text"
									class="form__input form__input_max form__input_icon"
									placeholder="Иконка"
									readonly
								/>

								<icon-add
									:icons="addCategory.icon"
									@update:icons="addCategory.icon = $event"
								></icon-add>
							</div>
							<template v-if="v$.icon.$dirty">
								<div
									v-for="error of v$.icon.$silentErrors"
									:key="error.$message"
									class="form__error"
								>
									{{ error.$message }}
								</div>
							</template>
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
import { reactive, ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useSettingStore } from '@/stores/settings';
import links from '@/service/endpoints/links';
import IconAdd from '@/components/Icons/IconAdd.vue';
import useVuelidate from '@vuelidate/core';
import {
	minLength,
	required,
	helpers,
	numeric,
	minValue,
} from '@vuelidate/validators';

const userStore = useUserStore();
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
	icon: '',
	sort: 1,
});

// Валидация
const requiredNameLength = ref(2);
const rules = computed(() => ({
	title: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 2 символа`,
			minLength(requiredNameLength.value)
		),
	},
	slug: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 2 символа`,
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
	icon: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 2 символа`,
			minLength(2)
		),
	},
}));

const v$ = useVuelidate(rules, addCategory);

/**
 * Добавление новой категории
 * @param {string} title - Заголовок категории
 * @param {string} slug - slug категории
 * @param {string} icon - Иконка категории
 * @param {number} sort - Сортировка категории
 * @param {number} userId - ID пользователя
 */
const addCategorySend = async (title, slug, icon, sort, userId) => {
	await links
		.postMainCategory(title, slug, icon, sort, userId)
		.then((response) => {
			//	console.log(response.data);
			settingStore.addToast('success', `Добавлена категория '${title}'`);
			emit('success');
			resetFields();
			return response.data;
		})
		.catch((error) => {
			if (error.response.data.error?.details?.errors[0]?.path[0] === 'slug') {
				settingStore.addToast(
					'error',
					`Поле slug с таким значением уже существует, slug должно быть уникальным значением`
				);
			} else {
				settingStore.addToast('error', error.response.data.error?.message);
			}
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
		addCategory.title &&
		addCategory.slug &&
		addCategory.icon &&
		addCategory.sort
	) {
		addCategorySend(
			addCategory.title,
			addCategory.slug.toLowerCase(),
			addCategory.icon,
			addCategory.sort,
			userStore.userData.id
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
	addCategory.title = null;
	addCategory.slug = null;
	addCategory.icon = null;
	addCategory.sort = 1;
};
</script>

<style lang="scss" scoped></style>
