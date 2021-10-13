import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';
import VueProgressBar from '@aacassandra/vue3-progressbar';
import VueApexCharts from 'vue3-apexcharts';
import TheNavigation from './components/nav/TheNavigation.vue';
import FontAwesomeIcon from './fontawesome.js';
import BaseButton from './components/UI/BaseButton.vue';

import App from './App.vue';

const options = {
  color: '#4361ee',
  failedColor: '#cc1818',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
};

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueProgressBar, options);
app.use(VueApexCharts);
app.component('the-navigation', TheNavigation);
app.component('fa', FontAwesomeIcon);
app.component('baseButton', BaseButton);

app.mount('#app');
