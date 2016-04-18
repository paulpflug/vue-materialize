webpack = require "webpack"
path = require "path"
module.exports =
  entry: "./build/common.coffee"
  output:
    filename: "bundle.js"
    path: __dirname
  module:
    loaders: [
      { test: /\.coffee$/, loader: "coffee"}
      { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" }
      { test: /\.ttf\??(\d*)$/,    loader: "file-loader" }
      { test: /\.eot\??(\d*)$/,    loader: "file-loader" }
      { test: /\.svg\??(\d*)$/,    loader: "file-loader" }
      { test: /\.scss$/, loader: "style!css!sass?sourceMap"}
    ]
  plugins: [
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin compress: warnings: false
    new webpack.optimize.OccurenceOrderPlugin()

  ]
  resolve:
    alias:
      "vue-mixins": path.resolve(path.join(__dirname, "..","node_modules", "vue-mixins"))
      "vue-filters": path.resolve(path.join(__dirname, "..","node_modules", "vue-filters"))
      "velocity-animate": path.resolve(path.join(__dirname, "..","node_modules", "velocity-animate"))
