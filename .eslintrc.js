module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    d3: 'readonly',
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'warn',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'warn',
    'no-use-before-define': 'off',
  },
};
