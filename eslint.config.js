import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  { 
    ignores: [
      'dist/**',
      'coverage/**',
      '.next/**',
      'build/**',
      'node_modules/**'      
    ] 
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintConfigPrettier,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node 
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@next/next': nextPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      quotes: ['error', 'single', { avoidEscape: true }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'es5',
          semi: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: true,
      }

    },
  }
);
