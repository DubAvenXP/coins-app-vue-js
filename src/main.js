import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import Chartkick from 'vue-chartkick';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

// Tailwind CSS
import '@/assets/css/tailwind.css';


const app = createApp(App);

app.use(router);
app.use(VueChartkick);
app.component('bounce-loader', BounceLoader);
app.component('beat-loader', BeatLoader);
app.mount('#app');

