<template>
	<aside class="sidebar">
		<div class="sidebar__category category">
			<ul v-if="menu.length > 0" class="category__list">
				<li v-for="item in menu" :key="item.id" class="category__item">
					<router-link :to="'/' + item.attributes.slug" class="category__link">
						<i v-if="item.attributes.icon" :class="item.attributes.icon"></i>
						<i v-else class="lar la-star"></i>
						<span>{{ item.attributes.title }}</span>
					</router-link>
				</li>
				<!-- 		<li class="category__item">
					<a href="#" class="category__link active"
						><i class="las la-code"></i><span>Code</span></a
					>
				</li>
				<li class="category__item">
					<a href="#" class="category__link"
						><i class="las la-pencil-ruler"></i><span>Дизайн</span></a
					>
				</li>
				<li class="category__item">
					<a href="#" class="category__link"
						><i class="las la-guitar"></i><span>Личное</span></a
					>
				</li>
				<li class="category__item">
					<a href="#" class="category__link"
						><i class="las la-graduation-cap"></i><span>Обучение</span></a
					>
				</li>
				<li class="category__item">
					<a href="#" class="category__link"
						><i class="lar la-check-circle"></i><span>Проекты</span></a
					>
				</li>
				<li class="category__item">
					<a href="#" class="category__link"
						><i class="las la-cube"></i><span>Разное</span></a
					>
				</li>
				<li class="category__item">
					<a href="#" class="category__link"
						><i class="lab la-evernote"></i><span>Сервисы</span></a
					>
				</li>
				<li class="category__item">
					<a href="#" class="category__link"
						><i class="las la-biohazard"></i><span>Хлам</span></a
					>
				</li> -->
				<li class="category__add" @click="addCategory">
					<i class="las la-plus"></i> <span>Добавить</span>
				</li>
			</ul>
			<div v-else>Загрузка ...</div>
		</div>
		<information-sidebar></information-sidebar>
	</aside>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import InformationSidebar from '../../components/Information/InformationSidebar.vue';

export default {
	name: 'SidebarLayout',

	data: () => ({
		isLoading: false,
	}),
	computed: {
		...mapState(useMenuStore, ['menu']),
	},
	methods: {
		addCategory() {
			console.log('Добавляем категорию');
		},
		...mapActions(useMenuStore, ['getCategoryMenu']),
	},
	created() {
		this.isLoading = true;
	},
	mounted() {
		this.getCategoryMenu();
		this.isLoading = false;
	},
	components: {
		InformationSidebar,
	},
};
</script>

<style lang="scss" scoped></style>
