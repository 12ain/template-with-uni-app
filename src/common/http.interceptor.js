/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { whiteList, server } from '@/common/api';

const install = (Vue, vm) => {
  const config = {
    baseUrl: server.baseUrl, // 请求地址
    dataType: 'json',
    showLoading: true, // 是否显示请求中的loading
    loadingText: '请求中...', // 请求loading中的文字提示
    loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    originalData: false, // 是否在拦截器中返回服务端的原始数据
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    header: {
      'content-type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  Vue.prototype.$u.http.setConfig(config);
  // 请求拦截，配置Token等参数
  // eslint-disable-next-line  no-param-reassign
  Vue.prototype.$u.http.interceptor.request = (config) => {
    // 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
    // 见：https://uviewui.com/components/globalVariable.html
    config.header.Authorization = `Bearer ${vm.api_token}`;

    // 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
    // config.header.token = vm.$store.state.token;

    // 方式三，如果token放在了globalData，通过getApp().globalData获取
    // config.header.token = getApp().globalData.username;

    // 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
    // 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
    // const token = uni.getStorageSync('token');
    // if (token) {
    //   config.header.Authorization = 'Bearer ' + token;
    // }
    // 清除无需token的接口
    if (whiteList.includes(config.url)) {
      delete config.header.Authorization;
    }

    // 删除无用参数
    if (config.data) {
      const keys = Object.keys(config.data);
      keys.forEach((key) => {
        if (typeof config.data[key] === 'undefined') {
          delete config.data[key];
        }
      });
    }
    if (config.params) {
      const keys = Object.keys(config.params);
      keys.forEach((key) => {
        if (!config.params[key]) {
          delete config.params[key];
        }
      });
    }
    return config;
  };

  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = (res) => {
    // console.log(res);
    if (res.code === 0) {
      // 如果配置了originalData为true，请留意这里的返回值
      return res.data;
    }
    if (res.code === 201) {
      vm.$u.toast('验证失败，请重新登录');
      setTimeout(() => {
        vm.$u.route('/pages/user/login');
      }, 1500);
      return false;
    }
    // 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
    return false;
  };
};

export default {
  install,
};
