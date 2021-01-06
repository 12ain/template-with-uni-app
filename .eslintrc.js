module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    uni: true,
    wx: true,
    plus: true,
    requirePlugin: true,
    getApp: true,
    getCurrentPages: true,
  },
  extends: ['airbnb', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  rules: {},
};
