import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useUserStore } from '@/stores/user';
import './scss/style.scss';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).mount('#app');
