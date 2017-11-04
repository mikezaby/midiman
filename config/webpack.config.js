var path = require('path');

var production = process.env.NODE_ENV === 'production';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    application: ['./app/javascripts/application'],
  },
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: production ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: production ? '[name]-[chunkhash].js' : '[name].js',
  },
  resolve: {
    modules: [
      path.join(__dirname, '..', 'app'),
      path.join(__dirname, '..', 'app/javascripts'),
      'node_modules',
    ],
    extensions: ['.js', '.scss', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['syntax-async-functions']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: production ? '[name]-[chunkhash].css' : '[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html'
    })
  ],

  stats: {
    colors: true
  },

  devtool: 'source-map'
};
