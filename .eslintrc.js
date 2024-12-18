module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'google',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-tabs': 'off',
    'indent': 'off',
    'object-curly-spacing': 'off',
    'camelcase': 'warn',
    'require-jsdoc': 'off',
    // semi: 'off'
  },
};
