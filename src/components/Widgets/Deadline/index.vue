<template>
	<div
		v-if="
			userStore.userData.widgetDL.active &&
			userStore.userData.widgetDL.start &&
			userStore.userData.widgetDL.end
		"
		class="widgets__deadline deadline"
	>
		<div class="deadline__title">Deadline</div>
		<table class="deadline__table">
			<tr>
				<td>Осталось</td>
				<td>{{ daysLeft }} дней</td>
			</tr>
			<tr>
				<td>Прошло</td>
				<td>{{ daysHavePassed }} дней</td>
			</tr>
			<tr>
				<td>Выполнено</td>
				<td>{{ percentageOfCompletion }} %</td>
			</tr>
		</table>
		<div class="deadline__footer">
			<div class="deadline__start">{{ startDate }}</div>
			<div class="deadline__end">{{ endDate }}</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const today = ref(null);
const daysLeft = ref(null);
const daysHavePassed = ref(null);
const percentageOfCompletion = ref(null);

/* const daysLeft = computed(() => {
	if (userStore.userData.widgetDL.end) {
		return dateDiff(
			parseDate(today),
			parseDate(userStore.userData.widgetDL.end)
		);
	}
	return '-';
});

const daysHavePassed = computed(() => {
	return 100;
});

const percentageOfCompletion = computed(() => {
	return '10%';
}); */

const startDate = computed(() => {
	return userStore.userData.widgetDL.start
		? userStore.userData.widgetDL.start.split('-').reverse().join('.')
		: '-';
});

const endDate = computed(() => {
	return userStore.userData.widgetDL.end
		? userStore.userData.widgetDL.end.split('-').reverse().join('.')
		: '-';
});

/**
 * Получаем сегодняшнюю дату
 */
const getToDay = () => {
	const day = new Date();
	const dd = String(day.getDate()).padStart(2, '0');
	const mm = String(day.getMonth() + 1).padStart(2, '0');
	const yyyy = day.getFullYear();
	return `${yyyy}-${mm}-${dd}`;
};

/**
 * Вычисляем разницу между датами
 */

const dateDiff = (startDate, endDate) => {
	const start = +parseDate(startDate);
	const end = +parseDate(endDate);
	return Math.round(+(end - start) / (1000 * 60 * 60 * 24));
};

/**
 * преобразовываем дату в миллисекунды
 */
const parseDate = (str) => {
	const date = new Date(str);
	return date.getTime();
};

const dataCalculation = () => {
	if (userStore.userData.widgetDL.end) {
		daysLeft.value = dateDiff(today.value, userStore.userData.widgetDL.end);
	} else {
		daysLeft.value = '-';
	}
	if (userStore.userData.widgetDL.start) {
		daysHavePassed.value = dateDiff(
			userStore.userData.widgetDL.start,
			today.value
		);
	} else {
		daysHavePassed.value = '-';
	}

	if (
		userStore.userData.widgetDL.start &&
		userStore.userData.widgetDL.end &&
		daysLeft.value
	) {
		const allDay = dateDiff(
			userStore.userData.widgetDL.start,
			userStore.userData.widgetDL.end
		);
		percentageOfCompletion.value = Math.round((daysLeft.value * 100) / allDay);
	} else {
		percentageOfCompletion.value = '-';
	}
};

onMounted(() => {
	today.value = getToDay();
	dataCalculation();
});

//
</script>

<style lang="scss" scoped></style>
