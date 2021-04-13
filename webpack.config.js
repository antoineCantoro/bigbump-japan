const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: './src/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'docs/js'),
  },
};