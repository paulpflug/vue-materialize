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
  resolve:
    extensions: ["",".webpack.js",".web.js",".js",".coffee",".vue"]
