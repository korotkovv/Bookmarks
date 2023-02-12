<template>
	<div v-if="isOpen" class="modal active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Редактировать записи</div>
				<div class="modal__close" @click="dialogEditClose">&times;</div>
			</div>
			<form @submit.prevent="dialogEditSuccess">
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
									placeholder="Описание"
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
							<i class="las la-save"></i>
							Сохранить
						</button>
						<button
							class="btn_outline modal__btn_close"
							@click.prevent="dialogEditClose"
						>
							Закрыть
						</button>
					</div>
					<div class="modal__delete">
						<button
							class="btn_delete modal__btn_delete"
							@click.prevent="removeDialogOpen(editInfo.id, editInfo.title)"
						>
							<i class="las la-trash-alt"></i>
							Удалить
						</button>
					</div>
				</div>
			</form>
		</div>
		<the-remove-dialog
			v-if="removeDialog.status"
			:is-open="removeDialog.status"
			@success="removeDialogYes"
			@close="removeDialogNo"
		>
		</the-remove-dialog>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useSettingStore } from '@/stores/settings';
import infos from '@/service/endpoints/infos';
import TheRemoveDialog from '@/components/TheRemoveDialog.vue';
import useVuelidate from '@vuelidate/core';
import {
	minLength,
	required,
	helpers,
	numeric,
	minValue,
} from '@vuelidate/validators';

const settingStore = useSettingStore();

const emit = defineEmits(['close', 'success']);

const props = defineProps({
	idInfo: {
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
const editInfo = reactive({
	id: null,
	title: null,
	text: null,
	sort: 1,
});

const removeDialog = reactive({
	status: false,
	id: null,
	title: null,
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

const v$ = useVuelidate(rules, editInfo);

/**
 * Получаем данные конкретной ссылки
 * @param {number} id - ID ссылки
 */
const getInfo = async (id) => {
	await infos
		.getInfo(id)
		.then((response) => {
			console.log(response.data?.data.attributes);
			if (response.data?.data.attributes) {
				editInfo.id = id;
				editInfo.title = response.data?.data.attributes.title;
				editInfo.text = response.data?.data.attributes.text;
				editInfo.sort = response.data?.data.attributes.sort;
			}
			return response;
		})
		.catch((error) => {
			settingStore.addToast('error', error.response.data?.error?.message);
			return console.log(error);
		});
};

/**
 * Изменение ссылки
 * @param {number} id - ID ссылки
 * @param {string} title - Заголовок ссылки
 * @param {string} text - Url ссылки
 * @param {number} sort - Сортировка ссылки

 */
const editInfoSend = async (id, title, text, sort) => {
	await infos
		.putInfo(id, title, text, sort)
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.then(() => {
			settingStore.addToast('success', `Запись '${title}' изменена`);
			emit('success');
			resetFields();
		})
		.catch((error) => {
			settingStore.addToast('error', error.response.data?.error?.message);
			return console.log(error);
		});
};

/**
 * Закрытие окна формы
 */
const dialogEditClose = () => {
	emit('close');
};

/**
 * Сохранение изменений
 */
const dialogEditSuccess = () => {
	v$.value.$touch();
	if (v$.value.$error) return;

	if (
		!v$.value.$error &&
		editInfo.id &&
		editInfo.title &&
		editInfo.text &&
		editInfo.sort
	) {
		editInfoSend(editInfo.id, editInfo.title, editInfo.text, editInfo.sort);
	} else {
		console.log('Что то не заполнено');
		console.log(v$.value.$error);
	}
};

/**
 * Сброс полей формы в значение по умолчанию
 */
const resetFields = () => {
	editInfo.title = null;
	editInfo.text = null;
	editInfo.sort = 1;
};

/**
 * Удаление записи
 * @param {number} id - ID записи
 * @param {string} title - ID записи
 */
const removeInfo = async (id, title) => {
	await infos
		.delInfo(id)
		.then((response) => {
			console.log(response.data);
		})
		.then(() => {
			settingStore.addToast('error', `Запись '${title}' удалена`);
			emit('success');
			resetFields();
		})
		.catch((error) => {
			settingStore.addToast('error', error.response.data.error?.message);
			return console.log(error);
		});
};

/**
 * Открытие окна подтверждения удаления
 * @param {number} id - Id
 * @param {string} title  - заголовок
 */
const removeDialogOpen = (id, title) => {
	removeDialog.status = true;
	removeDialog.id = id;
	removeDialog.title = title;
};

/**
 * Подтверждение действия
 */
const removeDialogYes = () => {
	removeInfo(removeDialog.id, removeDialog.title);
	removeDialog.status = false;
	removeDialog.id = null;
	removeDialog.title = null;
};

/**
 * Отмена действия
 */
const removeDialogNo = () => {
	removeDialog.status = false;
	removeDialog.id = null;
	removeDialog.title = null;
};

onMounted(() => {
	getInfo(props.idInfo);
});
</script>

<style lang="scss" scoped></style>
