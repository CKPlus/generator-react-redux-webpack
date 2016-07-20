/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    eslintrcPath = path.resolve(__dirname, '.eslintrc');

module.exports = {
  devtool: 'eval',
  entry: {
    'index':  [
      'eventsource-polyfill', // necessary for hot reloading with IE
      './src/index',
      "webpack/hot/dev-server"
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel-loader'],
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192'
    },
    { 
      test: /\.json$/,
      loader: 'json-loader' 
    },
    { 
      test: /\.(ttf|eot|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file-loader" 
    },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff" 
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'appbar_title': JSON.stringify('React-Redux Starter'),
      },
      '__DEVTOOLS__': true
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.template_dev.html',
      // favicon: './src/images/favicon.ico',
      chunks: ['index'],
    }),
    /* You can use jquery if you need it
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
    */
  ],

  eslint: {
    configFile: eslintrcPath
  }
};
