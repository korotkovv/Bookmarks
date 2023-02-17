<template>
	<header class="header">
		<div class="header__left">
			<router-link to="/" class="header__logo">
				<img
					v-if="settingStore.appTheme === 'light'"
					src="@/assets/logo-black.svg"
					alt="plus"
				/>
				<img v-else src="@/assets/logo.svg" alt="plus" />
			</router-link>
			<div class="header__search">
				<form
					acceptCharset="utf-8"
					className="search form-yandex"
					action="//yandex.ru/yandsearch"
					method="GET"
					data-type="yandex"
					target="_parent"
				>
					<div class="search__wrap">
						<input
							type="text"
							name="text"
							placeholder="Поиск Яндекс"
							autoFocus="autofocus"
							autoComplete="off"
							id="search-input-yandex"
						/>
						<button
							className="form-yandex-input form-yandex-submit"
							type="submit"
						>
							<i class="las la-search"></i>
						</button>
					</div>
				</form>
			</div>
		</div>
		<div class="header__account">
			<button
				class="header__menu btn__icon"
				:class="!settingStore.isOpenMenu ? 'header__menu_open' : ''"
				@click.prevent="settingStore.toggleMenu"
			>
				<i
					:class="settingStore.isOpenMenu ? 'las la-times' : 'las la-bars'"
				></i>
				{{ settingStore.isOpenMenu ? 'закрыть' : '' }}
			</button>
			<button
				class="header__themes btn__icon"
				title="Сменить тему оформления"
				@click.prevent="settingStore.appThemeHandle"
			>
				<i
					:class="
						settingStore.appTheme === 'dark'
							? 'las la-moon'
							: settingStore.appTheme === 'black'
							? 'las la-sun'
							: 'las la-cloud-sun'
					"
				></i>
			</button>
			<button
				v-if="
					userStore.userData.widgetWeather.active ||
					userStore.userData.widgetDL.active
				"
				class="header__widgets btn__icon"
				:class="settingStore.isWatchWidgets ? '' : 'btn__icon_disable'"
				:title="
					settingStore.isWatchWidgets ? 'Скрыть виджеты' : 'Показать виджеты'
				"
				@click.prevent="settingStore.handleWidgets"
			>
				<i
					:class="
						settingStore.isWatchWidgets
							? 'las la-calendar-times'
							: 'las la-calendar-plus'
					"
				></i>
			</button>
			<button
				class="header__setting btn__icon"
				:class="settingStore.isEdit ? 'btn__icon_edit' : ''"
				:title="
					settingStore.isEdit
						? 'Выключить режим редактирования'
						: 'Включить режим редактирования'
				"
				@click.prevent="settingStore.handleEdit"
			>
				<i
					:class="settingStore.isEdit ? 'las la-tools' : 'las la-sliders-h'"
				></i>
			</button>
			<div
				class="header__user user"
				:class="settingStore.isOpenUserMenu ? 'user_open' : ''"
				@click="settingStore.toggleUserMenu"
			>
				<div class="user__avatar">
					{{
						userStore.userData?.lastName
							? userStore.userData?.lastName[0]
							: userStore.userData?.username[0]
					}}{{
						userStore.userData?.firstName
							? userStore.userData?.firstName[0]
							: ''
					}}
				</div>
				<div class="user__name">
					{{
						userStore.userData.lastName
							? userStore.userData.lastName
							: userStore.userData.username
					}}
					{{ userStore.userData.firstName ? userStore.userData.firstName : '' }}
				</div>
				<div v-if="settingStore.isOpenUserMenu" class="user__menu">
					<ul class="user__list">
						<li class="user__item" @click.prevent="router.push('/profile')">
							Профиль
						</li>
						<li class="user__item" @click.prevent="userStore.logout">Выйти</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { useSettingStore } from '@/stores/settings';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const settingStore = useSettingStore();
const userStore = useUserStore();
const router = useRouter();
</script>

<style lang="scss" scoped></style>
