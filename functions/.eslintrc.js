module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
  ],
  plugins: ['@typescript-eslint', 'import', 'react'],
  rules: {
    'react/prop-types': 'off',
    quotes: ['error', 'single'],
    'import/no-unresolved': 0,
    // 'indent': ['error', 2],
    'valid-jsdoc': 'off',
    'max-len': ['error', { code: 150 }],
    'new-cap': 'off',
    'comma-dangle': ['error', 'never'],
    'no-tabs': 'off',
    semi: ['error', 'always'],
  },
  settings: {
    react: {
      version: 'detect', // Détecte automatiquement la version de React
    },
  },
};
