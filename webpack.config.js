const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

if (PRODUCTION) {
  console.log(chalk.red('Now entering production.'));
} else {
  console.log(chalk.red('Now entering development.'));
}

const plugins = PRODUCTION
  ? [ // Plugins used only in production.
    new ExtractTextPlugin('index.css')
  ]
  : [ // Plugins used only in development.
    new webpack.NamedModulesPlugin()
  ];

// Plugins used in both production and development.
plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  }),
  new HTMLWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    hash: true
  })
);

const cssProduction = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        minimize: false,
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
});

const cssDevelopment = [
  {
    loader: 'style-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: false,
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: 'inline'
    }
  }
];

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  devServer: {
    compress: true,
    clientLogLevel: 'error',
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { modules: false }], // 'modules: false' enables Webpack tree shaking.
              ['react']
            ],
            plugins: [
              'babel-plugin-transform-class-properties'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: PRODUCTION ? cssProduction : cssDevelopment
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  }
};
