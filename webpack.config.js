const path = require('path');
const webpack = require('webpack');
const HtmlTemplatePlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pcssAutoprefixer = require('autoprefixer');

const SRC_PATH = path.join(__dirname, 'frontend');
const BUILD_PATH = path.join(__dirname, 'public');
const HTML_TEMPLATE_PATH = path.join(SRC_PATH, 'index.template.html');

const babelConfig = {
  'presets': [
    'es2015',
    'react'
  ],
  'plugins': [
    'syntax-object-rest-spread'
  ]
};

module.exports = defineWebpackConfig(process.env.NODE_ENV || 'development');

function defineWebpackConfig(ENV) {
  return {
    resolve: {
      extensions: ['', '.js', '.react.js'],
    },

    entry: SRC_PATH,

    output: {
      path: BUILD_PATH,
      filename: 'bundle.js'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: babelConfig,
          include: SRC_PATH
        },
        {
          test: /\.json$/,
          loaders: ['json'],
          include: SRC_PATH
        },
        {
          test: /\.scss$/,
          loaders: [
            'style',
            'css',
            'postcss',
            'sass'
          ],
          include: SRC_PATH
        },

        // XXX: Temporary
        {
          test: /\.png$/,
          loader: 'file',
          query: {
            name: 'images/[name].[ext]'
          },
          include: SRC_PATH
        }
      ]
    },

    postcss: () => [
      pcssAutoprefixer({
        browsers: 'last 2 versions'
      })
    ],

    devServer: {
      contentBase: BUILD_PATH,
      inline: true
    },

    plugins: [
      new CleanWebpackPlugin([BUILD_PATH]),

      new HtmlTemplatePlugin({
        template: HTML_TEMPLATE_PATH,
        inject: 'body'
      })
    ].concat(getPluginsFor(ENV))
  };
}

function getPluginsFor(ENV) {
  if (ENV === 'production') {
    return [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ];
  }

  if (ENV === 'development') {
    return [];
  }
}

