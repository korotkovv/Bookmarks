<template>
	<main class="main">
		<div class="main__header">
			<div class="main__title">
				<h1>Информация</h1>
			</div>
		</div>
		<div class="main__body">
			<div class="info">
				<div class="info__list">
					<div class="info__item">
						<div class="info__title">Карта Тинькофф</div>
						<div class="info__text">5536913946800675</div>
						<div class="info__setting"><i class="las la-sliders-h"></i></div>
					</div>
					<div class="info__item">
						<div class="info__title">Карта Сбер</div>
						<div class="info__text">5536913946800675</div>
						<div class="info__setting" @click.prevent="openDialogEdit">
							<i class="las la-sliders-h"></i>
						</div>
					</div>
				</div>
				<div class="info__empty">Нет записей</div>
				<div class="info__add addInfo">
					<div class="addInfo__img">
						<svg
							width="25"
							height="26"
							viewBox="0 0 25 26"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect y="12" width="25" height="2" fill="#E7E7F1"></rect>
							<rect
								x="11.5"
								y="25.5"
								width="25"
								height="2"
								transform="rotate(-90 11.5 25.5)"
								fill="#E7E7F1"
							></rect>
						</svg>
					</div>

					<div class="addInfo__body">
						<div class="addInfo__title">Добавить запись</div>
					</div>
				</div>
			</div>

			<the-widgets v-if="settingStore.isWatchWidgets"></the-widgets>
		</div>
	</main>
</template>

<script>
export default {
	name: 'InfoView',
};
</script>

<script setup>
import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import { useSettingStore } from '@/stores/settings';

import {
	onBeforeMount,
	onBeforeUpdate,
	onMounted,
	onUpdated,
	provide,
	reactive,
	ref,
	watch,
} from 'vue';

const settingStore = useSettingStore();

const openDialogEdit = () => {};
</script>

<style scoped></style>
