import Vue from 'vue';
import uView from 'uview-ui';
import store from '@/store';

import httpInterceptor from '@/common/http.interceptor';
import App from './App.vue';

const vuexStore = require('@/store/$u.mixin');

Vue.config.productionTip = false;

Vue.use(uView);
Vue.mixin(vuexStore);

App.mpType = 'app';

const app = new Vue({
  store,
  ...App,
});

Vue.use(httpInterceptor, app);

app.$mount();
