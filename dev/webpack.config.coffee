webpack = require "webpack"
path = require "path"
module.exports =
  module:
    loaders: [
      { test: /\.vue$/, loader: "vue-loader"}
      { test: /\.html$/, loader: "html"}
      { test: /\.coffee$/, loader: "coffee-loader"}
      { test: /\.css$/, loader: "style-loader!css-loader" }
      { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" }
      { test: /\.ttf\??(\d*)$/,    loader: "file-loader" }
      { test: /\.eot\??(\d*)$/,    loader: "file-loader" }
      { test: /\.svg\??(\d*)$/,    loader: "file-loader" }
      { test: /\.scss$/, loader: "style!css!sass?sourceMap"}
    ]
    postLoaders: [
      { test: /vue-icons/, loader: "callback-loader"}
    ]
  resolve:
    extensions: ["",".webpack.js",".web.js",".js",".coffee",".vue"]
    alias:
      "vue-mixins": path.resolve(path.join(__dirname, "..","node_modules", "vue-mixins"))
      "vue-filters": path.resolve(path.join(__dirname, "..","node_modules", "vue-filters"))
      "velocity-animate": path.resolve(path.join(__dirname, "..","node_modules", "velocity-animate"))
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
  callbackLoader:
    require("vue-icons/icon-loader")(["material-cancel"])
