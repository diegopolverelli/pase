instalar:
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev


crear index.ts :
function greet(name: string) {
  console.log(`Hello, ${name}!`);
}

greet("John");



crear .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {},
};


ejecutar eslint
npx eslint index.ts



