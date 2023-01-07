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
									v-model.trim="editLink.title"
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
									v-model.trim="editLink.link"
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
									v-model="editLink.category"
									id="linkColor"
									placeholder="Цвет"
								>
									<template v-for="item in menu" :key="item.id">
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
									v-model="editLink.sort"
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
										v-model.trim="editLink.icon"
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
							@click.prevent="removeLink(editLink.id, editLink.title)"
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

<script>
import { mapState, mapActions } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';
import links from '@/service/endpoints/links';

export default {
	name: 'LinkEdit',
	emits: ['close', 'success'],

	props: {
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
	},

	data: () => ({
		form: false,
		editLink: {
			id: null,
			title: null,
			link: null,
			icon: null,
			sort: 1,
			color: 'standard',
			desc: null,
			category: null,
		},
		icon: true,
	}),

	computed: {
		...mapState(useMenuStore, ['menu']),
	},

	methods: {
		/**
		 * Получаем данные конкретной ссылки
		 * @param {number} id - ID ссылки
		 */
		async getLink(id) {
			await links
				.getLink(id)
				.then((response) => {
					console.log(response.data.data.attributes);
					if (response.data.data.attributes) {
						this.editLink.id = id;
						this.editLink.title = response.data.data.attributes.title;
						this.editLink.link = response.data.data.attributes.url;

						this.editLink.sort = response.data.data.attributes.sort;
						this.editLink.color = response.data.data.attributes.color
							? response.data.data.attributes.color
							: 'standard';
						this.editLink.desc = response.data.data.attributes.desc;
						this.editLink.category =
							response.data.data.attributes.categoty.data.id;
						if (response.data.data.attributes.icon) {
							this.editLink.icon = response.data.data.attributes.icon;
						} else {
							this.icon = false;
						}
					}
					return response.data;
				})
				.catch((error) => {
					this.addToast('error', error.response.data.error.message);
					return console.log(error);
				});
		},

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
		 */
		async editLinkSend(id, title, link, icon, sort, color, desc, categotyId) {
			await links
				.putLink(id, title, link, icon, sort, color, desc, categotyId)
				.then((response) => {
					//	console.log(response.data);
					return response.data;
				})
				.then(() => {
					this.addToast('success', `Ссылка '${title}' изменена`);
					this.$emit('success');
					this.resetFields();
				})
				.catch((error) => {
					this.addToast('error', error);
					return console.log(error);
				});
		},

		/**
		 * Закрытие окна формы
		 */
		dialogEditClose() {
			this.$emit('close');
		},

		/**
		 * Сохранение изменений
		 */
		dialogEditSuccess() {
			//	console.log(this.editLink);
			//	console.log(this.idCategory);
			this.icon ? null : (this.editLink.icon = null);

			if (
				this.editLink.id &&
				this.editLink.title &&
				this.editLink.link &&
				this.editLink.title &&
				this.editLink.category &&
				this.editLink.sort
			) {
				this.editLinkSend(
					this.editLink.id,
					this.editLink.title,
					this.editLink.link,
					this.editLink.icon,
					this.editLink.sort,
					this.editLink.color,
					this.editLink.desc,
					this.editLink.category
				);
			} else {
				console.log('Что то не заполнено');
			}
		},

		/**
		 * Сброс полей формы в значение по умолчанию
		 */
		resetFields() {
			this.editLink.title = null;
			this.editLink.link = null;
			this.editLink.icon = null;
			this.editLink.sort = 1;
			this.editLink.color = 'standard';
			this.editLink.desc = null;
			this.icon = true;
		},

		/**
		 * Начальное значение категории для select
		 * @param {number} id - ID категории
		 */
		getCategoryId(id) {
			this.editLink.category = id;
		},

		/**
		 * Удаление ссылки
		 * @param {number} id - ID ссылки
		 */
		async removeLink(id, title) {
			await links
				.delLink(id)
				.then((response) => {
					//	console.log(response.data);
				})
				.then(() => {
					this.addToast('error', `Ссылка '${title}' удалена`);
					this.$emit('success');
					this.resetFields();
				})
				.catch((error) => {
					this.addToast('error', error.response.data.error.message);
					return console.log(error);
				});
		},

		...mapActions(useSettingStore, ['addToast']),
	},
	created() {
		//		this.getCategoryId(this.idCategory);
		//	this.getLink(this.idLink);
		//	console.log(this.idLink);
	},
	mounted() {
		this.getLink(this.idLink);
	},
	watch: {
		idCategory(val) {
			this.getCategoryId(this.idCategory);
		},
	},
};
</script>

<style lang="scss" scoped></style>
