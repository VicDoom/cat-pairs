module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'no-console': 'off',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'prefer-const': 'error',
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
      'allowSeparatedGroups': false
    }],
    'object-curly-spacing': ['error', 'always'],
  },
};
