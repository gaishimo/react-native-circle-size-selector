module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react-native/all',
    "plugin:prettier/recommended",
    "prettier/standard",
  ],
  plugins: [
    'flowtype',
    'react',
    'react-native',
    'prettier',
  ],
  env: {
    jest: true,
  },
  rules: {
    'react/display-name': 'off',
    'react/jsx-boolean-value': 'error',
    'react/default-props-match-prop-types': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-typos': 'error',
    'react/no-unused-state': 'error',
    'react/no-unused-prop-types': 'error',
    'react/default-props-match-prop-types': 'off',
    'react-native/no-color-literals': 'off',
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
    'import/no-unresolved': ['error', { ignore: ['^react$', '^react-native$'] }]
  },
}
