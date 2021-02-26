const webpack = require('webpack')
const { merge: webpackMerge } = require('webpack-merge')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const commonConfig = require('./webpack.common.js')

module.exports = webpackMerge(commonConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:3000',
      port: 3001,
      open: false,
      notify: true,
      reloadDelay: 500
    }),

    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('development')
    })
  ]
})
