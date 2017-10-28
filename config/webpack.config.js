var path = require('path');

module.exports = {
  entry: './application.js',
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: 'application.js'
  }
};
