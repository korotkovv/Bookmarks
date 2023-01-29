<template>
	<div v-if="isOpen" class="modal modal__addlink active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить ссылку</div>
				<div class="modal__close" @click="dialogAddClose">&times;</div>
			</div>
			<form @submit.prevent="dialogAddSuccess">
				<div class="modal__body">
					<div class="form__row">
						<div class="form__col">
							<div class="form__group_max">
								<label for="linkName">Заголовок <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model.trim="addLink.title"
									id="linkName"
									type="text"
									placeholder="Заголовок"
									required
								/>
							</div>
							<div class="form__group_max">
								<label for="linkUrl">Ссылка <span>*</span></label>
							</div>
							<div class="form__group_max mb-6">
								<input
									v-model.trim="addLink.link"
									id="linkUrl"
									type="text"
									placeholder="Ссылка"
									required
								/>
							</div>
							<div class="form__group_max">
								<label for="linkColor">Категория</label>
							</div>
							<div class="form__group_max mb-6">
								<select
									v-model="addLink.category"
									id="linkColor"
									placeholder="Цвет"
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
									v-model="addLink.sort"
									id="linkSort"
									type="number"
									min="0"
									placeholder="Сортировка"
									required
								/>
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
								</select>
							</div>
							<div class="form__group_max mb-10">
								<input
									v-model.trim="icon"
									type="checkbox"
									id="widgetWeatherCheckbox"
									name="checkbox-group"
									checked
								/>
								<label for="widgetWeatherCheckbox">Показывать иконку</label>
							</div>
							<template v-if="icon">
								<div class="form__group_max">
									<label for="linkIcon">Иконка <span>*</span></label>
								</div>
								<div class="form__group_max">
									<input
										v-model.trim="addLink.icon"
										id="linkIcon"
										type="text"
										placeholder="Иконка"
										required
									/>
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
							@click.prevent="dialogAddClose"
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
import { onMounted, reactive, ref, watch } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';
import links from '@/service/endpoints/links';

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
	icon: 'las la-apple-alt',
	sort: 1,
	color: 'standard',
	desc: null,
	category: null,
});
const icon = ref(true);

/**
 * Добавление новой ссылки
 * @param {string} title - Заголовок ссылки
 * @param {string} link - Url ссылки
 * @param {string} icon - Иконка ссылки
 * @param {number} sort - Сортировка ссылки
 * @param {string} color - Цветовая схема ссылки
 * @param {string} desc - Описание ссылки
 * @param {number} categotyId - Id категории
 */
const addLinkSend = async (
	title,
	link,
	icon,
	sort,
	color,
	desc,
	categotyId
) => {
	await links
		.postLink(title, link, icon, sort, color, desc, categotyId)
		.then((response) => {
			console.log(response.data);
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
const dialogAddClose = () => {
	emit('close');
};

/**
 * Сохранение ссылки
 */
const dialogAddSuccess = () => {
	if (
		addLink.title &&
		addLink.link &&
		addLink.title &&
		addLink.category &&
		addLink.sort
	) {
		addLinkSend(
			addLink.title,
			addLink.link,
			addLink.icon,
			addLink.sort,
			addLink.color,
			addLink.desc,
			addLink.category
		);
	} else {
		console.log('Что то не заполнено');
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
