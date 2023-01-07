import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './scss/style.scss';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).mount('#app');
