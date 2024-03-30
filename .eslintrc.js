
export default {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  root: true,
  rules: {
    // Your existing rules can be kept as is or modified based on your preferences
    'no-constant-condition': 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'warn',
    'react/prop-types': 'off', 
    "@typescript-eslint/no-unused-vars": "off",

  },
};
