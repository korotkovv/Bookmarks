<template>
	<main class="main">
		<div class="main__header">
			<div class="main__title">
				<h1>Информация</h1>
			</div>
		</div>
		<div class="main__body">
			<div v-if="!isLoading" class="info">
				<div v-if="infosList?.length > 0" class="info__list">
					<div v-for="item of infosList" :key="item.id" class="info__item">
						<div class="info__title">{{ item.attributes.title }}</div>
						<div class="info__text">{{ item.attributes.text }}</div>
						<div class="info__setting" @click.prevent="openDialogEdit(item.id)">
							<i class="las la-sliders-h"></i>
						</div>
					</div>
				</div>
				<div v-else class="info__empty">Нет записей</div>
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

					<div class="addInfo__body" @click="openDialogAdd">
						<div class="addInfo__title">Добавить запись</div>
					</div>
				</div>
			</div>
			<div v-else class="info-loading">
				<the-preloader size="standard"></the-preloader>
			</div>

			<the-widgets v-if="settingStore.isWatchWidgets"></the-widgets>
		</div>
		<info-add
			v-if="dialogAdd.status"
			:is-open="dialogAdd.status"
			@success="dialogYes"
			@close="dialogClose"
		></info-add>
		<info-edit
			v-if="dialogEdit.status"
			:id-info="dialogEdit.id"
			:is-open="dialogEdit.status"
			@success="dialogYes"
			@close="dialogClose"
		></info-edit>
	</main>
</template>

<script>
export default {
	name: 'InfoView',
};
</script>

<script setup>
import { reactive, ref } from 'vue';
import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import { useSettingStore } from '@/stores/settings';
import infos from '@/service/endpoints/infos';
import ThePreloader from '@/components/ThePreloader.vue';
import InfoAdd from '@/components/Information/InfoAdd.vue';
import InfoEdit from '@/components/Information/InfoEdit.vue';

const settingStore = useSettingStore();

const isLoading = ref(false);
const infosList = ref([]);

const dialogAdd = reactive({
	status: false,
});

const dialogEdit = reactive({
	status: false,
	id: null,
});

/**
 * Получаем список всех записей
 *
 */
const getInfos = async () => {
	isLoading.value = true;
	infosList.value = await infos
		.getInfos()
		.then((response) => {
			console.log(response.data.data);
			return response.data.data;
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => {
			isLoading.value = false;
		});
};

getInfos();

/**
 * Открытие окна редактирования
 * @param {number} id - ID Записи
 */
const openDialogEdit = (id) => {
	dialogEdit.id = id;
	dialogEdit.status = true;
	console.log(id);
};

/**
 * Открытие окна добавления
 */
const openDialogAdd = () => {
	dialogAdd.status = true;
};

/**
 * Закрытие окон
 */
const dialogClose = () => {
	dialogAdd.status = false;
	dialogEdit.status = false;
	dialogEdit.id = null;
};

/**
 * Закрытие окон и обновление списка
 */
const dialogYes = () => {
	dialogAdd.status = false;
	dialogEdit.status = false;
	dialogEdit.id = null;
	getInfos();
};
</script>

<style scoped></style>
