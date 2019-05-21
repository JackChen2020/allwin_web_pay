import 'amfe-flexible';
import Vue from 'vue';
import App from './App';
import { router } from './router';


import { Icon } from 'vant';

Vue.use(Icon);

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
