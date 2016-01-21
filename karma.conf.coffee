module.exports = (config) ->
  config.set
    preprocessors: "**/*.coffee": ["webpack"]
    webpack:
      resolve:
        extensions: ["",".js",".coffee"]
      module:
        loaders: [
          { test: /\.coffee$/, loader: "coffee-loader" }
          { test: /\.scss$/, loader: "style!css!sass?sourceMap" }
        ]
    files: ["test/*.coffee"]
    frameworks: ["mocha","chai"]
    plugins: [
      require("karma-chai")
      require("karma-chrome-launcher")
      require("karma-mocha")
      require("karma-webpack")
    ]
    browsers: ["chrome"]
