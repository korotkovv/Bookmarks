<template>
	<router-view></router-view>

	<!-- 	<div class="modal modal__addlink active">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить ссылку</div>
				<div class="modal__close">&times;</div>
			</div>
			<div class="modal__body"></div>

			<div class="modal__footer">
				<button class="btn modal__btn_save">Сохранить</button>
				<button class="btn_outline modal__btn_close">Закрыть</button>
			</div>
		</div>
	</div> -->

	<!-- <div class="modal modal__addcategory">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить категорию</div>
				<div class="modal__close">&times;</div>
			</div>
			<div class="modal__body"></div>

			<div class="modal__footer">
				<button class="btn modal__btn_save">Сохранить</button>
				<button class="btn_outline modal__btn_close">Закрыть</button>
			</div>
		</div>
	</div> -->

	<!-- 	<div class="modal modal__addsubcategory">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Добавить подкатегорию</div>
				<div class="modal__close">&times;</div>
			</div>
			<div class="modal__body"></div>

			<div class="modal__footer">
				<button class="btn modal__btn_save">Сохранить</button>
				<button class="btn_outline modal__btn_close">Закрыть</button>
			</div>
		</div>
	</div> -->
	<!-- <div class="modal modal__setting">
		<div class="modal__dialog">
			<div class="modal__header">
				<div class="modal__title">Настройки</div>
				<div class="modal__close">&times;</div>
			</div>
			<div class="modal__body setting">
				<div class="modal__tabs tabs">
					<div class="tabs__nav">
						<div class="tabs__item">
							<i class="las la-cog"></i><span>Общие</span>
						</div>
						<div class="tabs__item active">
							<i class="las la-cog"></i><span>Виджеты</span>
						</div>
						<div class="tabs__item">
							<i class="las la-cog"></i><span>Пин-код</span>
						</div>
						<div class="tabs__item">
							<i class="las la-cog"></i><span>Профиль</span>
						</div>
					</div>
					<div class="tabs__body">
						<div class="tabs__content">
							<div class="modal__headline">Тема оформления</div>
							<div class="modal__block">
								<div class="form__group">
									<input
										type="radio"
										id="themeDark"
										name="radio-theme"
										checked
									/>
									<label for="themeDark">Тёмная</label>
								</div>
								<div class="form__group">
									<input type="radio" id="themeWhite" name="radio-theme" />
									<label for="themeWhite">Светлая</label>
								</div>
							</div>
						</div>
						<div class="tabs__content active">
							<div class="modal__headline">Deadline</div>
							<div class="modal__block">
								<div class="form__group">
									<input
										type="checkbox"
										id="widgetDedlineCheckbox"
										name="checkbox-group"
										checked
									/>
									<label for="widgetDedlineCheckbox">Показывать виджет</label>
								</div>
								<div class="form__group">
									<div class="form__group_col">
										<label for="dedlineDateStart">Дата старта</label>
										<input type="date" id="dedlineDateStart" />
									</div>
									<div class="form__group_col">
										<label for="dedlineDateEnd">Дата дедлайна</label>
										<input type="date" id="dedlineDateEnd" />
									</div>
								</div>
							</div>
							<div class="modal__headline">Погода</div>
							<div class="modal__block">
								<div class="form__group">
									<input
										type="checkbox"
										id="widgetWeatherCheckbox"
										name="checkbox-group"
										checked
									/>
									<label for="widgetWeatherCheckbox">Показывать виджет</label>
								</div>
								<div class="form__group">
									<p>Вставьте ссылку на информер</p>
								</div>
								<div class="form__group">
									<input type="text" />
								</div>
							</div>
						</div>
						<div class="tabs__content">Пин-код</div>
						<div class="tabs__content">Профиль</div>
					</div>
				</div>
			</div>

			<div class="modal__footer">
				<button class="btn modal__btn_save">Сохранить</button>
				<button class="btn_outline modal__btn_close">Закрыть</button>
			</div>
		</div>
	</div> -->
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useSettingStore } from '@/stores/settings';

import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import SubCategory from '@/components/Category/SubCategory.vue';
import LinkGrid from '@/components/Link/LinkGrid.vue';
import LinkList from '@/components/Link/LinkList.vue';

// Components
export default {
	name: 'HomeView',

	data: () => ({
		slug: null,
	}),

	computed: {
		...mapState(useSettingStore, ['switcher']),
	},

	methods: {
		...mapActions(useSettingStore, [
			'switcherGridHandle',
			'switcherListHandle',
		]),
	},
	mounted() {},

	components: {
		TheWidgets,
		SubCategory,
		LinkGrid,
		LinkList,
	},
};
</script>

<style lang="scss" scoped></style>
