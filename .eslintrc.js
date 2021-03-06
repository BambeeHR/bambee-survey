module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'vue/no-v-html': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['*.config.js', '**/*.test.js'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.js'],
      env: { jest: true },
    },
    {
      files: ['*.stories.js'],
      rules: {
        'import/no-extraneous-dependencies': [0],
      },
    },
  ],
};
