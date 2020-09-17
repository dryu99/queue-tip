module.exports = {
  'env': {
    'commonjs': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module'
  },
  'plugins': [],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
  }
};
