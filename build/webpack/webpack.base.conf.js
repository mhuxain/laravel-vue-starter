const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

const base_dir = path.join(__dirname, '..', '..', 'client')

const config = {
  entry: path.join(base_dir, 'src', 'index.js'),
  mode: env,
  output: {
      path: path.join(base_dir, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js?[hash]'
  },
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(base_dir, 'src')],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(base_dir, 'dist', 'index.html'),
      template: path.join(base_dir, 'static', 'index.html'),
      inject: true,
    }),
  ],
};

module.exports = config;