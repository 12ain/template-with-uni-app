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
  plugins: ['vue', 'prettier'],
  rules: {
    'import/prefer-default-export': 0,
    'vue/max-attributes-per-line': 0,
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false,
      },
    ],
  },
  settings: {
    'import/core-modules': ['vue', 'vuex', 'moment'],
    'import/resolver': {
      alias: {
        map: [['@', './src/']],
      },
    },
  },
};
