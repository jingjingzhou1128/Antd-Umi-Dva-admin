module.exports = {
  parser: "babel-eslint",
  extends: ["eslint-config-umi", "prettier", "plugin:compat/recommended"],
  plugins: [
    "react",
    "jsx-a11y",
    "import",
    "flowtype",
    "react-hooks"
  ],
  env: {
    browser: true,
    node: true,
    es6: true
    // mocha: true,
    // jest: true,
    // jasmine: true,
  },
  globals: {
    // page: true,
  },
  rules: {
    // 'no-console': 'off',
    // 'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    // 'react/jsx-wrap-multilines': 0,
    // 'react/prop-types': 0,
    // 'react/jsx-tag-spacing': 0,
    // 'react/forbid-prop-types': 0,
    // 'react/jsx-one-expression-per-line': 0,
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    // 'import/no-unresolved': [2, { ignore: ['^@/', '^umi/', '^antd', '^./'] }],
    // 'import/prefer-default-export': 0,
    // 'import/no-extraneous-dependencies': [
    //   2,
    //   {
    //     optionalDependencies: true,
    //     devDependencies: ['**/tests/**.js', '/mock/**.js', '**/**.test.js'],
    //   },
    // ],
    // 'import/no-cycle': 0,
    // 'jsx-a11y/no-noninteractive-element-interactions': 0,
    // 'jsx-a11y/click-events-have-key-events': 0,
    // 'jsx-a11y/no-static-element-interactions': 0,
    // 'jsx-a11y/anchor-is-valid': 0,
    // 'linebreak-style': 0,
    // quotes: ['error', 'single'], // 使用单引号
    // semi: ['error', 'always'], // 结束添加分号
    "no-unused-vars": "off",
    "semi": [2, "never"],
    "quotes": ['error', 'single'],
    "arrow-spacing": [2, { "before": true, "after": true }],
    "func-call-spacing": [2, "never"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0
  },
  // settings: {
    // support import modules from TypeScript files in JavaScript files
    // 'import/resolver': { node: { extensions: ['.js', '.ts', '.jsx', '.tsx'] } },
    // polyfills: ['fetch', 'promises', 'url', 'object-assign'],
  // },
};