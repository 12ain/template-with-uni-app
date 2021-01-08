import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let lifeData = {};

try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = uni.getStorageSync('lifeData');
  // eslint-disable-next-line no-empty
} catch (e) {}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
const saveStateKeys = ['user_form', 'api_token'];

// 保存变量到本地存储中
const saveLifeData = (key, value) => {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) !== -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync('lifeData');
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp || {};
    tmp[key] = value;
    uni.setStorageSync('lifeData', tmp);
  }
};
const store = new Vuex.Store({
  state: {
    user_form: lifeData.user_form ? lifeData.user_form : { name: 'a' },
    api_token: lifeData.api_token ? lifeData.api_token : '',
  },
  mutations: {
    $uStore(state, payload) {
      const nameArr = payload.name.split('.');
      let saveKey = '';
      const len = nameArr.length;
      if (nameArr.length >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i += 1) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        // eslint-disable-next-line prefer-destructuring
        saveKey = nameArr[0];
      } else {
        // eslint-disable-next-line no-param-reassign
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      saveLifeData(saveKey, state[saveKey]);
    },
  },
});

export default store;
