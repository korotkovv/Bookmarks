<template>
	<div v-if="isOpen" class="modal modal__editLink active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">
					Редактировать ссылку id: {{ editLink.id }} | {{ idCategory }}
				</div>
				<div class="modal__close" @click="dialogEditClose">&times;</div>
			</div>
			<form @submit.prevent="dialogEditSuccess">
				<div class="modal__body">
					<div class="form__row">
						<div class="form__col">
							<div class="form__group_max">
								<label for="linkName">Заголовок <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model="v$.title.$model"
									id="linkName"
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
								<label for="linkUrl">Ссылка <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model="v$.link.$model"
									id="linkUrl"
									type="text"
									placeholder="Ссылка"
								/>
								<template v-if="v$.link.$dirty">
									<div
										v-for="error of v$.link.$silentErrors"
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
									v-model="editLink.category"
									id="category"
									placeholder="Категория"
								>
									<template v-for="item in menuStore.menu" :key="item.id">
										<option :value="item.id">
											{{ item.attributes.title }}
										</option>
										<template
											v-if="item.attributes.categoties?.data.length > 0"
										>
											<option
												v-for="el in item.attributes.categoties.data"
												:key="el.id"
												:value="el.id"
												class="app-options-subcategory"
											>
												-{{ el.attributes.title }}
											</option>
										</template>
									</template>
								</select>
							</div>
							<div class="form__group_max">
								<label for="linkDesc">Описание</label>
							</div>
							<div class="form__group_max">
								<textarea
									v-model.trim="editLink.desc"
									id="linkDesc"
									type="text"
									placeholder="Описание"
								/>
							</div>
						</div>
						<div class="form__col">
							<div class="form__group_max">
								<label for="linkSort">Сортировка <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model="v$.sort.$model"
									id="linkSort"
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
							<div class="form__group_max">
								<label for="linkColor">Цвет </label>
							</div>
							<div class="form__group_max mb-6">
								<select
									v-model="editLink.color"
									id="linkColor"
									placeholder="Цвет"
								>
									<option value="standard" selected>Стандарт</option>
									<option value="orange">Оранжевый</option>
									<option value="blue">Синий</option>
									<option value="green">Зелёный</option>
									<option value="yellow">Жёлтый</option>
									<option value="purple">Фиолетовый</option>
								</select>
							</div>
							<div class="form__group_max mb-10">
								<input
									v-model.trim="icon"
									type="checkbox"
									id="iconCheckbox"
									name="checkbox-group"
									checked
								/>
								<label for="iconCheckbox">Показывать иконку</label>
							</div>
							<template v-if="icon">
								<div class="form__group_max">
									<label for="linkIcon">Иконка <span>*</span></label>
								</div>
								<div class="form__group">
									<input
										v-model="vI$.icon.$model"
										id="linkIcon"
										type="text"
										class="form__input form__input_max form__input_icon"
										placeholder="Иконка"
										readonly
									/>
									<icon-add
										:icons="editLink.icon"
										@update:icons="editLink.icon = $event"
									></icon-add>
									<template v-if="vI$.icon.$dirty">
										<div
											v-for="error of vI$.icon.$silentErrors"
											:key="error.$message"
											class="form__error"
										>
											{{ error.$message }}
										</div>
									</template>
								</div>
							</template>
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
							@click.prevent="removeDialogOpen(editLink.id, editLink.title)"
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
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';
import links from '@/service/endpoints/links';
import IconAdd from '@/components/Icons/IconAdd.vue';
import TheRemoveDialog from '@/components/TheRemoveDialog.vue';
import useVuelidate from '@vuelidate/core';
import {
	minLength,
	required,
	helpers,
	numeric,
	minValue,
	url,
} from '@vuelidate/validators';

const userStore = useUserStore();
const settingStore = useSettingStore();
const menuStore = useMenuStore();

const emit = defineEmits(['close', 'success']);

const props = defineProps({
	idLink: {
		type: Number,
		required: true,
	},
	idCategory: {
		type: Number,
		required: false,
	},
	isOpen: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const form = ref(false);
const editLink = reactive({
	id: null,
	title: null,
	link: null,
	icon: '',
	sort: 1,
	color: 'standard',
	desc: null,
	category: null,
});
const icon = ref(true);

const removeDialog = reactive({
	status: false,
	id: null,
	title: null,
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
	link: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		url: helpers.withMessage(`Поле должно быть ссылкой`, url),
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

const rulesIcon = computed(() => ({
	icon: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 4 символа`,
			minLength(4)
		),
	},
}));

const v$ = useVuelidate(rules, editLink);
const vI$ = useVuelidate(rulesIcon, editLink);

/**
 * Получаем данные конкретной ссылки
 * @param {number} id - ID ссылки
 */
const getLink = async (id) => {
	await links
		.getLink(id)
		.then((response) => {
			//console.log(response.data?.data.attributes);
			if (response.data?.data.attributes) {
				editLink.id = id;
				editLink.title = response.data?.data.attributes.title;
				editLink.link = response.data?.data.attributes.url;

				editLink.sort = response.data?.data.attributes.sort;
				editLink.color = response.data?.data.attributes.color
					? response.data?.data.attributes.color
					: 'standard';
				editLink.desc = response.data?.data.attributes.desc;
				editLink.category = response.data?.data.attributes.categoty.data.id;
				if (response.data?.data.attributes.icon) {
					editLink.icon = response.data?.data.attributes.icon;
				} else {
					icon.value = false;
				}
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
 * @param {string} link - Url ссылки
 * @param {string} icon - Иконка ссылки
 * @param {number} sort - Сортировка ссылки
 * @param {string} color - Цветовая схема ссылки
 * @param {string} desc - Описание ссылки
 * @param {number} categotyId - ID категории
 * @param {number} userId - ID пользователя
 */
const editLinkSend = async (
	id,
	title,
	link,
	icon,
	sort,
	color,
	desc,
	categotyId,
	userId
) => {
	await links
		.putLink(id, title, link, icon, sort, color, desc, categotyId, userId)
		.then((response) => {
			//console.log(response.data);
			return response.data;
		})
		.then(() => {
			settingStore.addToast('success', `Ссылка '${title}' изменена`);
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
	//	console.log(v$.value.$error);
	if (v$.value.$error) return;

	if (icon.value) {
		vI$.value.$touch();
		if (vI$.value.$error) return;
	}
	if (
		!v$.value.$error &&
		editLink.id &&
		editLink.title &&
		editLink.link &&
		editLink.color &&
		editLink.category &&
		editLink.sort
	) {
		icon.value ? null : (editLink.icon = '');
		editLinkSend(
			editLink.id,
			editLink.title,
			editLink.link,
			editLink.icon,
			editLink.sort,
			editLink.color,
			editLink.desc,
			editLink.category,
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
	editLink.title = null;
	editLink.link = null;
	editLink.icon = null;
	editLink.sort = 1;
	editLink.color = 'standard';
	editLink.desc = null;
	icon.value = true;
};

/**
 * Начальное значение категории для select
 * @param {number} id - ID категории
 */
const getCategoryId = (id) => {
	editLink.category = id;
};

/**
 * Удаление ссылки
 * @param {number} id - ID ссылки
 */
const removeLink = async (id, title) => {
	await links
		.delLink(id)
		.then((response) => {
			//console.log(response.data);
		})
		.then(() => {
			settingStore.addToast('error', `Ссылка '${title}' удалена`);
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
	removeLink(removeDialog.id, removeDialog.title);
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
	getLink(props.idLink);
	//getCategoryId(props.idCategory);
});

watch(
	() => props.idCategory,
	(newV, oldV) => {
		getCategoryId(props.idCategory);
	}
);
</script>

<style lang="scss" scoped></style>
