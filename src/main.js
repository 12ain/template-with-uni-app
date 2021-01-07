import Vue from 'vue';
import uView from 'uview-ui';
import App from './App';

Vue.config.productionTip = false;

Vue.use(uView);

App.mpType = 'app';

const app = new Vue({
  ...App,
});

import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

app.$mount();
