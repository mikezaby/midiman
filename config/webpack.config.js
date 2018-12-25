var path = require('path');

var production = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: production ? 'production' : 'development',
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
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              'transform-class-properties',
              'syntax-async-functions',
              'transform-async-to-generator',
              'transform-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
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
