module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['standard', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  rules: {
    'no-console': 0, //不禁用console
    indent: [1, 2, { SwitchCase: 1 }],
    eqeqeq: 1,
    camelcase: 1,
    'handle-callback-err': 0,
    'no-return-assign': 0,
    'no-mixed-spaces-and-tabs': 0,
    'spaced-comment': 0,
    'node/no-deprecated-api': 0,
    'react/no-deprecated': 0,
    'react/prop-types': 0,
    'react/no-string-refs': 0,
    'react/display-name': 0,
    'no-delete-var': 2, //不能对var声明的变量使用delete操作符
    'no-const-assign': 2, //禁止修改const声明的变量
    'react/no-did-mount-set-state': 0, //防止在componentDidMount中使用setState
    'react/no-did-update-set-state': 1, //防止在componentDidUpdate中使用setState
    'react/no-direct-mutation-state': 2, //防止this.state的直接变异
    'react/no-set-state': 0, //防止使用setState
    'react/forbid-prop-types': [2, { forbid: ['any'] }] //禁止某些propTypes
  }
}
