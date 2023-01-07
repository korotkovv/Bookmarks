<template>
	<div v-if="isOpen" class="modal modal__addlink active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить ссылку id:{{ idCategory }}</div>
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

<script>
import { mapState, mapActions } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import { useSettingStore } from '@/stores/settings';
import links from '@/service/endpoints/links';

export default {
	name: 'LinkAdd',
	emits: ['close', 'success'],

	props: {
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
		addLink: {
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
		 * Добавление новой ссылки
		 * @param {string} title - Заголовок ссылки
		 * @param {string} link - Url ссылки
		 * @param {string} icon - Иконка ссылки
		 * @param {number} sort - Сортировка ссылки
		 * @param {string} color - Цветовая схема ссылки
		 * @param {string} desc - Описание ссылки
		 * @param {number} categotyId - Id категории
		 */
		async addLinkSend(title, link, icon, sort, color, desc, categotyId) {
			await links
				.postLink(title, link, icon, sort, color, desc, categotyId)
				.then((response) => {
					//console.log(response.data);
					return response.data;
				})
				.then(() => {
					this.addToast('success', `Добавлена ссылка '${title}'`);
					this.$emit('success');
					this.resetFields();
				})
				.catch((error) => {
					this.addToast('error', error.response.data.error.message);
					return console.log(error);
				});
		},

		/**
		 * Закрытие окна формы
		 */
		dialogAddClose() {
			this.$emit('close');
		},

		/**
		 * Сохранение ссылки
		 */
		dialogAddSuccess() {
			//console.log(this.addLink);
			//console.log(this.idCategory);
			if (
				this.addLink.title &&
				this.addLink.link &&
				this.addLink.title &&
				this.addLink.category &&
				this.addLink.sort
			) {
				this.addLinkSend(
					this.addLink.title,
					this.addLink.link,
					this.addLink.icon,
					this.addLink.sort,
					this.addLink.color,
					this.addLink.desc,
					this.addLink.category
				);
			} else {
				console.log('Что то не заполнено');
			}
		},

		/**
		 * Сброс полей формы в значение по умолчанию
		 */
		resetFields() {
			this.addLink.title = null;
			this.addLink.link = null;
			this.addLink.icon = null;
			this.addLink.sort = 1;
			this.addLink.color = 'standard';
			this.addLink.desc = null;
			this.icon = true;
		},

		/**
		 * Начальное значение категории для select
		 */
		getCategoryId(id) {
			this.addLink.category = id;
		},

		...mapActions(useSettingStore, ['addToast']),
	},
	created() {
		this.getCategoryId(this.idCategory);
	},
	watch: {
		idCategory(val) {
			this.getCategoryId(this.idCategory);
		},
	},
};
</script>

<style lang="scss" scoped></style>
