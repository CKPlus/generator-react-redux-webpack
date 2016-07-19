var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    eslintrcPath = path.resolve(__dirname, '.eslintrc');

module.exports = {
  entry: {
    'index':  [
      './src/index',
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'static'),
    publicPath: ''
  },

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.template.html',
      // favicon: './src/images/favicon.ico',
      chunks: ['index']
    }),
    /* You can use jquery if you need it
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
    */
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
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

  eslint: {
    configFile: eslintrcPath
  }
};
