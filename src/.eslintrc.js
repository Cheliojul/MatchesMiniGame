module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: ['reportWebVitals.js', 'index.js'],
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
  },
};
