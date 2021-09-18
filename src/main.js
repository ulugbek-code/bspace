import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';

import FontAwesomeIcon from './fontawesome.js';
import BaseButton from './components/UI/BaseButton.vue';

import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('fa', FontAwesomeIcon);
app.component('baseButton', BaseButton);

app.mount('#app');
