const typescriptEslintParser = require('@typescript-eslint/parser');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'prettier/prettier': ['error', { semi: true }],
      quotes: ['error', 'single'],
      'no-console': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/]',
          message: 'Static hex colors are not allowed.',
        },
        {
          selector:
            'Literal[value=/^rgba?\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}(,\\s*(0|1|0?\\.\\d+))?\\)$/]',
          message: 'Static rgba colors are not allowed.',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
