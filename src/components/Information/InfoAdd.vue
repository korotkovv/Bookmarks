<template>
	<div v-if="isOpen" class="modal active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить запись</div>
				<div class="modal__close" @click="dialogClose">&times;</div>
			</div>
			<form @submit.prevent="dialogAddSuccess" class="modal__form">
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
								<label for="text">Текст <span>*</span></label>
							</div>
							<div class="form__group_max">
								<textarea
									v-model="v$.text.$model"
									id="text"
									type="text"
									placeholder="Текст"
								/>
								<template v-if="v$.text.$dirty">
									<div
										v-for="error of v$.text.$silentErrors"
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
import infos from '@/service/endpoints/infos';
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
const addInfo = reactive({
	title: null,
	text: null,
	sort: 1,
});
const icon = ref(true);

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
	text: {
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
}));

const v$ = useVuelidate(rules, addInfo);

/**
 * Добавление новой записи
 * @param {string} title - Заголовок ссылки
 * @param {string} text - Url ссылки
 * @param {number} sort - Сортировка ссылки
 * @param {number} userId - ID пользователя
 */
const addInfoSend = async (title, text, sort, userId) => {
	await infos
		.postInfo(title, text, sort, userId)
		.then((response) => {
			//console.log(response.data);
			return response.data;
		})
		.then(() => {
			settingStore.addToast('success', `Добавлена запись '${title}'`);
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

	if (v$.value.$error) return;

	if (!v$.value.$error && addInfo.title && addInfo.text && addInfo.sort > -1) {
		addInfoSend(
			addInfo.title,
			addInfo.text,
			addInfo.sort,
			userStore.userData.id
		);
	} else {
		console.log('Что-то не заполнено');
		//console.log(v$.value.$error);
	}
};

/**
 * Сброс полей формы в значение по умолчанию
 */
const resetFields = () => {
	addInfo.title = null;
	addInfo.text = null;
	addInfo.sort = 1;
};
</script>

<style lang="scss" scoped></style>
