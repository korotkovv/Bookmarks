import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
	{
		name: 'Home',
		path: '/',
		component: Home,
		//	redirect: '/category/first',
		meta: {
			title: 'Главная',
			layout: 'main',
			auth: true,
			isAdmin: true,
		},
	},
	{
		name: 'Category',
		path: '/category',
		component: () => import('../components/Category/ViewCategory.vue'),
		meta: {
			title: 'Главная',
			layout: 'main',
			auth: true,
			isAdmin: true,
		},
		children: [
			{
				path: '/category/:slug',
				component: () => import('../components/Category/ViewCategory.vue'),
				props: true,
				meta: {
					title: 'Категория',
					layout: 'main',
					auth: true,
					isAdmin: true,
				},
			},
		],
	},
	{
		name: 'undefined',
		path: '/category/undefined',
		redirect: '/',
	},
	{
		name: 'Trash',
		path: '/trash',
		component: () => import('../views/Trash.vue'),
		meta: {
			title: 'Корзина',
			layout: 'main',
			auth: true,
			isAdmin: true,
		},
	},
	{
		name: 'Info',
		path: '/info',
		component: () => import('../views/Info.vue'),
		meta: {
			title: 'Информация',
			layout: 'main',
			auth: true,
			isAdmin: true,
		},
	},
	{
		name: 'Profile',
		path: '/profile',
		component: () => import('../views/Profile.vue'),
		meta: {
			title: 'Профиль пользователя',
			layout: 'main',
			auth: true,
			isAdmin: true,
		},
	},
	{
		name: 'Auth',
		path: '/auth',
		component: Auth,
		meta: {
			title: 'Авторизация',
			layout: 'auth',
			auth: false,
			isAdmin: false,
		},
	},
	{
		path: '/:notFound(.*)',
		component: NotFound,
		meta: {
			title: 'Ошибка 404',
			layout: 'auth',
			auth: false,
			isAdmin: false,
			breadcrumbs: [
				{
					title: 'Ошибка 404',
					disabled: true,
					href: '',
				},
			],
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = `${to.meta.title} - Bookmarks`;
	} else {
		document.title = `Bookmarks`;
	}
	next();
});

export default router;
