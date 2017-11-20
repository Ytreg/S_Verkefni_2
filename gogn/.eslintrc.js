module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
	jquery: true,
  },
  rules: {
	"linebreak-style": 0,
    'class-methods-use-this': 0
  }
};
