<template>
	<div
		v-if="
			userStore.userData.widgetWeather.active &&
			userStore.userData.widgetWeather.option &&
			weather
		"
		class="widgets__weather weather"
	>
		<div class="weather__left">
			<div class="weather__title">Погода</div>
			<div class="weather__info">
				ветер:
				<span>{{ weather.windspeed }} <span class="small-text">м/c</span></span>
			</div>
			<div class="weather__clouds">{{ weatherTitle }}</div>
		</div>
		<div class="weather__right">
			<img class="weather__img" :src="weatherImg" :alt="weatherTitle" />
			<div class="weather__temperature">
				{{ Math.round(weather.temperature) }}°
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const userStore = useUserStore();

const weather = reactive({});
const weatherImg = ref(new URL('@/assets/weather/d.svg', import.meta.url));
const weatherTitle = ref('не определено');

const coordinates = reactive({
	latitude: 57.68,
	longitude: 39.81,
});

/**
 * Получаем координаты из строки опций
 */

const getCoordinates = () => {
	if (userStore.userData.widgetWeather.option) {
		const arr = userStore.userData.widgetWeather.option.split('|');
		if (arr.length > 1) {
			coordinates.latitude = arr[0];
			coordinates.longitude = arr[1];
			console.log(coordinates);
		}
	}
};
getCoordinates();

const setWeathercode = () => {
	console.log(weather);
	switch (95) {
		// 0
		case 0:
			weatherImg.value = new URL('@/assets/weather/d.svg', import.meta.url);
			weatherTitle.value = 'ясно';
			break;
		// 1, 2, 3	Mainly clear, partly cloudy, and overcast
		case 1:
			weatherImg.value = new URL('@/assets/weather/d_c1.svg', import.meta.url);
			weatherTitle.value = 'в основном ясно';
			break;
		case 2:
			weatherImg.value = new URL('@/assets/weather/d_c2.svg', import.meta.url);
			weatherTitle.value = 'переменная облачность';
			break;
		case 3:
			weatherImg.value = new URL('@/assets/weather/c3.svg', import.meta.url);
			weatherTitle.value = 'облачно';
			break;
		// 45, 48	Fog and depositing rime fog
		case 45:
			weatherImg.value = new URL('@/assets/weather/c3.svg', import.meta.url);
			weatherTitle.value = 'туман';
			break;
		case 48:
			weatherImg.value = new URL('@/assets/weather/c3_s1.svg', import.meta.url);
			weatherTitle.value = 'туман и изморозь';
			break;
		// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
		case 51:
			weatherImg.value = new URL(
				'@/assets/weather/d_c1_r1.svg',
				import.meta.url
			);
			weatherTitle.value = 'лёгкая морось';
			break;
		case 53:
			weatherImg.value = new URL(
				'@/assets/weather/d_c1_r2.svg',
				import.meta.url
			);
			weatherTitle.value = 'морось';
			break;
		case 55:
			weatherImg.value = new URL(
				'@/assets/weather/d_c1_r3.svg',
				import.meta.url
			);
			weatherTitle.value = 'сильная морось';
			break;
		//56, 57	Freezing Drizzle: Light and dense intensity
		case 56:
			weatherImg.value = new URL(
				'@/assets/weather/d_c2_rs1.svg',
				import.meta.url
			);
			weatherTitle.value = 'лёгкая ледяная морось';
			break;
		case 57:
			weatherImg.value = new URL(
				'@/assets/weather/d_c2_rs2.svg',
				import.meta.url
			);
			weatherTitle.value = 'сильная ледяная морось';
			break;
		//61, 63, 65	Rain: Slight, moderate and heavy intensity
		case 61:
			weatherImg.value = new URL('@/assets/weather/c3_r1.svg', import.meta.url);
			weatherTitle.value = 'небольшой дождь';
			break;
		case 63:
			weatherImg.value = new URL('@/assets/weather/c3_r2.svg', import.meta.url);
			weatherTitle.value = 'дождь';
			break;
		case 65:
			weatherImg.value = new URL('@/assets/weather/c3_r3.svg', import.meta.url);
			weatherTitle.value = 'сильный дождь';
			break;

		//66, 67	Freezing Rain: Light and heavy intensity
		case 66:
			weatherImg.value = new URL(
				'@/assets/weather/c3_rs1.svg',
				import.meta.url
			);
			weatherTitle.value = 'небольшой ледяной дождь';
			break;
		case 67:
			weatherImg.value = new URL(
				'@/assets/weather/c3_rs3.svg',
				import.meta.url
			);
			weatherTitle.value = 'сильный ледяной дождь';
			break;

		//71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
		case 71:
			weatherImg.value = new URL('@/assets/weather/c3_s1.svg', import.meta.url);
			weatherTitle.value = 'слабый снег';
			break;
		case 73:
			weatherImg.value = new URL('@/assets/weather/c3_s2.svg', import.meta.url);
			weatherTitle.value = 'снег';
			break;
		case 75:
			weatherImg.value = new URL('@/assets/weather/c3_s3.svg', import.meta.url);
			weatherTitle.value = 'сильный снег';
			break;
		//77	Snow grains
		case 77:
			weatherImg.value = new URL('@/assets/weather/c3_s3.svg', import.meta.url);
			weatherTitle.value = 'град';
			break;
		//80, 81, 82	Rain showers: Slight, moderate, and violent
		case 80:
			weatherImg.value = new URL(
				'@/assets/weather/c3_r1_st.svg',
				import.meta.url
			);
			weatherTitle.value = 'небольшой ливень';
			break;
		case 81:
			weatherImg.value = new URL(
				'@/assets/weather/c3_r2_st.svg',
				import.meta.url
			);
			weatherTitle.value = 'ливень';
			break;
		case 82:
			weatherImg.value = new URL(
				'@/assets/weather/c3_r3_st.svg',
				import.meta.url
			);
			weatherTitle.value = 'сильный ливень';
			break;
		//85, 86	Snow showers slight and heavy
		case 85:
			weatherImg.value = new URL('@/assets/weather/c3_s1.svg', import.meta.url);
			weatherTitle.value = 'слабый снег';
			break;
		case 86:
			weatherImg.value = new URL('@/assets/weather/c3_s3.svg', import.meta.url);
			weatherTitle.value = 'сильный снег';
			break;
		//95 *	Thunderstorm: Slight or moderate
		//96, 99 *	Thunderstorm with slight and heavy hail
		case 95:
			weatherImg.value = new URL(
				'@/assets/weather/c3_r1_st.svg',
				import.meta.url
			);
			weatherTitle.value = 'небольшая гроза';
			break;
		case 96:
			weatherImg.value = new URL(
				'@/assets/weather/c3_r2_st.svg',
				import.meta.url
			);
			weatherTitle.value = 'небольшая гроза';
			break;
		case 99:
			weatherImg.value = new URL(
				'@/assets/weather/c3_r3_st.svg',
				import.meta.url
			);
			weatherTitle.value = 'сильная гроза';
			break;
		default:
			weatherImg.value = new URL('@/assets/weather/d.svg', import.meta.url);
			weatherTitle.value = 'не определено';
	}
};

/**
 * Запрос данных о погоде
 */
const getWeather = async () => {
	await axios
		.get(
			`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&windspeed_unit=ms`
		)
		.then((response) => {
			console.log(response.data.current_weather);

			if (response.data.current_weather) {
				weather.temperature = Math.round(
					response.data.current_weather.temperature
				);
				weather.weathercode = response.data.current_weather.weathercode;
				weather.winddirection = response.data.current_weather.winddirection;
				weather.windspeed = response.data.current_weather.windspeed;
			}

			return response.data?.current_weather;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
	setWeathercode();
};

onMounted(() => {
	getWeather();
});
</script>

<style lang="scss" scoped></style>
