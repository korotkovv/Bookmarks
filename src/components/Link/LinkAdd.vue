<template>
	<div v-if="isOpen" class="modal active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить ссылку</div>
				<div class="modal__close" @click="dialogClose">&times;</div>
			</div>
			<form @submit.prevent="dialogAddSuccess" class="modal__form">
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
									v-model="addLink.category"
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
									v-model.trim="addLink.desc"
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
									v-model="addLink.color"
									id="linkColor"
									placeholder="Цвет"
								>
									<option value="standard" selected>Стандарт</option>
									<option value="orange">Оранжевый</option>
									<option value="blue">Синий</option>
									<option value="green">Зелёный</option>
									<option value="yellow">Жёлтый</option>
									<option value="purple">Фиолетовый</option>
									<option value="red">Красный</option>
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
										:icons="addLink.icon"
										@update:icons="addLink.icon = $event"
									></icon-add>
								</div>
								<template v-if="vI$.icon.$dirty">
									<div
										v-for="error of vI$.icon.$silentErrors"
										:key="error.$message"
										class="form__error"
									>
										{{ error.$message }}
									</div>
								</template>
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
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useMenuStore } from '@/stores/menu';
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
	url,
} from '@vuelidate/validators';

const userStore = useUserStore();
const settingStore = useSettingStore();
const menuStore = useMenuStore();

const emit = defineEmits(['close', 'success']);

const props = defineProps({
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
const addLink = reactive({
	title: null,
	link: null,
	icon: '',
	sort: 1,
	color: 'standard',
	desc: null,
	category: null,
});
const icon = ref(true);

// Валидация
const myURL = helpers.regex(
	/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
);
const requiredNameLength = ref(3);
const rules = computed(() => ({
	title: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 3 символа`,
			minLength(requiredNameLength.value)
		),
	},
	link: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		url: helpers.withMessage(`Поле должно быть ссылкой`, myURL),
		minLength: helpers.withMessage(
			`Минимальная длина: 3 символа`,
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

const v$ = useVuelidate(rules, addLink);
const vI$ = useVuelidate(rulesIcon, addLink);

/**
 * Добавление новой ссылки
 * @param {string} title - Заголовок ссылки
 * @param {string} link - Url ссылки
 * @param {string} icon - Иконка ссылки
 * @param {number} sort - Сортировка ссылки
 * @param {string} color - Цветовая схема ссылки
 * @param {string} desc - Описание ссылки
 * @param {number} categotyId - Id категории
 * @param {number} userId - ID пользователя
 */
const addLinkSend = async (
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
		.postLink(title, link, icon, sort, color, desc, categotyId, userId)
		.then((response) => {
			//console.log(response.data);
			return response.data;
		})
		.then(() => {
			settingStore.addToast('success', `Добавлена ссылка '${title}'`);
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

	if (icon.value) {
		vI$.value.$touch();
		if (vI$.value.$error) return;
	}

	if (
		!v$.value.$error &&
		addLink.title &&
		addLink.link &&
		addLink.color &&
		addLink.category &&
		addLink.sort > -1
	) {
		icon.value ? null : (addLinkSend.icon = '');
		addLinkSend(
			addLink.title,
			addLink.link,
			addLink.icon,
			addLink.sort,
			addLink.color,
			addLink.desc,
			addLink.category,
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
	addLink.title = null;
	addLink.link = null;
	addLink.icon = null;
	addLink.sort = 1;
	addLink.color = 'standard';
	addLink.desc = null;
	icon.value = true;
};

/**
 * Начальное значение категории для select
 * @param {number} id - ID категории
 */
const getCategoryId = (id) => {
	addLink.category = id;
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
