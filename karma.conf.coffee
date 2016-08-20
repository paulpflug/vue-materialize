module.exports = (config) ->
  config.set
    preprocessors:
      "**/*.coffee": ["webpack",'sourcemap']
    webpack:
      devtool: 'inline-source-map'
      resolve:
        extensions: ["",".js",".coffee",".vue"]
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
      callbackLoader:
        require("vue-icons/icon-loader")(["material-cancel","fa-user","fa-key"])

    webpackMiddleware:
      noInfo: true
    files: ["test/*.coffee"]
    frameworks: ["mocha","chai-dom","chai-spies","chai","vue-component"]
    plugins: [
      require("karma-chai")
      require("karma-chai-dom")
      require("karma-chrome-launcher")
      require("karma-firefox-launcher")
      require("karma-mocha")
      require("karma-webpack")
      require("karma-sourcemap-loader")
      require("karma-spec-reporter")
      require("karma-chai-spies")
      require("karma-vue-component")
    ]
    browsers: ["Chromium","Firefox"]
