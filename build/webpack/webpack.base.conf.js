
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require( 'write-file-webpack-plugin');

const base_dir = path.join(__dirname, '..', '..', 'client')
const public_dir = path.join(__dirname, '..', '..', 'public')
const laravel_resource_dir = path.join(__dirname, '..', '..', 'resources')
const laravel_views_dir = path.join(laravel_resource_dir, 'views')

const config = {
    stats: 'verbose',
  entry: {
      'app': [path.join(base_dir, 'src', 'index.js')],
      'customer': [path.join(base_dir, 'src', 'pages', 'customer',  'customer.js')]
    },
  mode: true ? 'development' : 'production',
  output: {
      path: process.env.WEBPACK_SERVE ? path.join(base_dir, 'dist') : path.join(public_dir, 'dist'),
      publicPath: 'http://localhost:8080/',
        filename: 'js/[name].js?[hash]'
  },
  serve: {
    hot: {
        allEntries: true,
    },
    dev: {
        hot: true
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    contentBase: path.join(base_dir, 'dist'),
    compress: true
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: { 
        cacheGroups: {
            commons: {
                chunks: "initial",
                minChunks: 2,
                name: "commons",
                maxInitialRequests: 5, // The default limit is too small to showcase the effect
            },
            vendors: {
                test: /node_modules/,
                chunks: "initial",
                name: "vendors",
                enforce: true
            }
        }
    }
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
      filename: path.join(laravel_views_dir, 'index.blade.php'),
    //   filename: path.join(base_dir, 'dist' ,  'index.html'),
      template: path.join(base_dir, 'static', 'index.html'),
      inject: true,
      chunks: ['vendors', 'app'],
    }),
    new HtmlWebpackPlugin({
        filename: path.join(laravel_views_dir, 'pages',  'customer.blade.php'),
        // filename: path.join(base_dir, 'dist', 'pages',   'customer.html'),
        template: path.join(base_dir, 'src', 'pages', 'customer',  'customer.html'),
        inject: true,
        chunks: ['vendors', 'customer'],
    }),
    new WriteFilePlugin({
        test: /\.php$/
    })
  ],
};

module.exports = config;