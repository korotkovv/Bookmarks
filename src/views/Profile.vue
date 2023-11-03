<template>
	<main class="main">
		<div class="main__header">
			<div class="main__title">Профиль пользователя</div>
		</div>
		<div class="main__body">
			<form class="form form_profile" @submit.prevent="editUserSubmit">
				<div class="form__row form__row_bg">
					<div class="form__col">
						<div class="form__group_max">
							<label for="lastName">Фамилия <span>*</span></label>
						</div>
						<div class="form__group_max mb-6">
							<input
								v-model="v$.lastName.$model"
								id="lastName"
								type="text"
								placeholder="Фамилия"
							/>
							<template v-if="v$.lastName.$dirty">
								<div
									v-for="error of v$.lastName.$silentErrors"
									:key="error.$message"
									class="form__error"
								>
									{{ error.$message }}
								</div>
							</template>
						</div>
						<div class="form__group_max">
							<label for="firstName">Имя <span>*</span></label>
						</div>
						<div class="form__group_max mb-6">
							<input
								v-model="v$.firstName.$model"
								id="firstName"
								type="text"
								placeholder="Имя"
							/>
							<template v-if="v$.firstName.$dirty">
								<div
									v-for="error of v$.firstName.$silentErrors"
									:key="error.$message"
									class="form__error"
								>
									{{ error.$message }}
								</div>
							</template>
						</div>
					</div>
					<div class="form__col">
						<div class="form__group_max">
							<label for="username">Псевдоним <span>*</span></label>
						</div>
						<div class="form__group_max mb-6">
							<input
								v-model="v$.username.$model"
								id="username"
								type="text"
								placeholder="Псевдоним"
							/>
							<template v-if="v$.username.$dirty">
								<div
									v-for="error of v$.username.$silentErrors"
									:key="error.$message"
									class="form__error"
								>
									{{ error.$message }}
								</div>
							</template>
						</div>
						<div class="form__group_max">
							<label for="searchEngine">Поисковая система <span>*</span></label>
						</div>
						<div class="form__group_max mb-6">
							<select
								v-model="userInfo.searchEngine"
								id="searchEngine"
								placeholder="Поисковая система"
							>
								<option value="yandex">Яндекс</option>
								<option value="google">Google</option>
							</select>
						</div>
					</div>
				</div>
				<div class="form__row form__row_bg">
					<div class="form__col">
						<div class="form__group_max mb-10">
							<input
								v-model="userInfo.wDLActive"
								type="checkbox"
								id="widgetDLCheckbox"
								name="checkbox-group"
								checked
							/>
							<label for="widgetDLCheckbox">Активировать виджет Deadline</label>
						</div>
						<div class="form__group_max">
							<label for="dateStart">Дата старта (Deadline)</label>
						</div>
						<div class="form__group_max mb-6">
							<input
								v-model="userInfo.wDLStart"
								id="dateStart"
								type="date"
								placeholder="Дата старта"
							/>
						</div>
						<div class="form__group_max">
							<label for="dateEnd">Дата завершения (Deadline)</label>
						</div>
						<div class="form__group_max mb-6">
							<input
								v-model="userInfo.wDLEnd"
								id="dateEnd"
								type="date"
								placeholder="Дата завершения"
							/>
						</div>
					</div>
					<div class="form__col">
						<div class="form__group_max mb-10">
							<input
								v-model="userInfo.wWeatherActive"
								type="checkbox"
								id="widgetWeatherCheckbox"
								name="checkbox-group"
								checked
							/>
							<label for="widgetWeatherCheckbox"
								>Активировать виджет Погода</label
							>
						</div>
						<div class="form__group_max">
							<label for="dateStart">Настройка (Погода)</label>
						</div>
						<div class="form__group_max mb-6">
							<input
								v-model="userInfo.wWeatherOption"
								id="dateStart"
								type="text"
								placeholder="57.69|39.80"
							/>
							<span class="small-text"
								>укажите долготу и ширину в формате "57.69|39.80"</span
							>
						</div>
					</div>
				</div>
				<div v-if="isUpdate" class="form__row form__row_info">
					Изменения сохранены!
				</div>
				<div class="form__row form__row_btn">
					<button
						class="btn"
						type="submit"
						:disabled="
							userInfo.username && userInfo.lastName && userInfo.firstName
								? false
								: true
						"
					>
						<i class="las la-save"></i> Сохранить
					</button>
				</div>
			</form>
			<the-widgets v-if="settingStore.isWatchWidgets"></the-widgets>
		</div>
	</main>
</template>

<script setup>
import { onMounted, computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingStore } from '@/stores/settings';
import { useUserStore } from '@/stores/user';
import TheWidgets from '@/components/Widgets/TheWidgets.vue';
import user from '@/service/endpoints/user';
import useVuelidate from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';

const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore();
const isUpdate = ref(false);
const userInfo = reactive({
	id: null,
	username: null,
	email: null,
	lastName: null,
	firstName: null,
	wDLActive: false,
	wDLStart: null,
	wDLEnd: null,
	wWeatherActive: false,
	wWeatherOption: null,
	searchEngine: null,
});

// Валидация
const requiredNameLength = ref(4);
const rules = computed(() => ({
	lastName: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 4 символа`,
			minLength(requiredNameLength.value)
		),
	},

	firstName: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 4 символа`,
			minLength(requiredNameLength.value)
		),
	},

	username: {
		required: helpers.withMessage(`Поле не заполнено`, required),
		minLength: helpers.withMessage(
			`Минимальная длина: 4 символа`,
			minLength(requiredNameLength.value)
		),
	},
}));

const v$ = useVuelidate(rules, userInfo);

/**
 * Получаем список ссылок без категории
 */
const getUser = async () => {
	await user
		.getAuth()
		.then((response) => {
			if (response.data) {
				userInfo.id = response.data.id;
				userInfo.username = response.data.username;
				userInfo.email = response.data.email;
				userInfo.lastName = response.data.lastName;
				userInfo.firstName = response.data.firstName;
				userInfo.wDLActive = response.data.wDLActive;
				userInfo.wDLStart = response.data.wDLStart;
				userInfo.wDLEnd = response.data.wDLEnd;
				userInfo.wWeatherActive = response.data.wWeatherActive;
				userInfo.wWeatherOption = response.data.wWeatherOption;
				userInfo.searchEngine = response.data.searchEngine;
			}
			return response.data;
		})
		.catch((error) => {
			router.push('/auth');
			console.log(error);
			return {};
		});
};
getUser();

const editUserSubmit = async () => {
	v$.value.$touch();
	if (v$.value.$error) return;
	isUpdate.value = false;
	if (!v$.value.$error) {
		await user
			.putUser(
				userInfo.id,
				userInfo.username,
				userInfo.email,
				userInfo.lastName,
				userInfo.firstName,
				userInfo.wDLActive,
				userInfo.wDLStart,
				userInfo.wDLEnd,
				userInfo.wWeatherActive,
				userInfo.wWeatherOption,
				userInfo.searchEngine
			)
			.then((response) => {
				if (response.status === 200) {
					isUpdate.value = true;
					settingStore.addToast('success', `Изменения сохранены!'`);
					userStore.tokenChecked();
				}
				return response.data;
			})
			.catch((error) => {
				settingStore.addToast('error', error.response.data.error?.message);
				console.log(error);
			});
	}
};

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
