var path = require('path');

module.exports = {
  entry: './application.js',
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: 'application.js'
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  }

  devtool: 'source-map'
};
