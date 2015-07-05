# vue-materialize

An implementation of [materialize](http://materializecss.com/) in [vue](http://vuejs.org/).

# Disclaimer

**Far from finished** and only for [**webpack**](https://webpack.github.io/) workflows.

Currently only has the sideNav without touch and scss processing.

**No jQuery dependency**

# Install

```sh
npm install --save-dev vue-materialize
```
Without css, only `webpack` is needed.
```sh
npm install --save-dev webpack
```
If you want to use the styles:
```sh
npm install --save-dev style-loader css-loader sass-loader url-loader file-loader
```
## Js Modules
#### sideNav
```coffee
## whithin your module
components:
  "side-nav": require "vue-materialize/sideNav"
```
```jade
//- in the template
header
  side-nav.z-depth-1(v-ref="nav" fixed="true")
    li.logo
      a.brand-logo(v-link="/") Your Brand
    li
      a(v-link="/") Home
  nav.top-nav
    .nav-wrapper
      a.hide-on-large-only(v-on="click:openNav")
        i.mdi-navigation-menu
```

## SCSS
#### Webpack config
```coffee
loaders: [
  { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" }
  { test: /\.ttf\??(\d*)$/,    loader: "file-loader" }
  { test: /\.eot\??(\d*)$/,    loader: "file-loader" }
  { test: /\.svg\??(\d*)$/,    loader: "file-loader" }
  { test: /\.scss$/, loader: "style!css!sass?sourceMap"}
]
```
#### SCSS inclusion
create a file, for example `materialize.config.scss`
```scss
@import "~vue-materialize/sass/prefixer";
@import "~vue-materialize/sass/mixins";
@import "~vue-materialize/sass/color";
// include colors you need
$included_colors: include-color("blue", "base");

// change variables
$navbar-font-color: #000;

@import "~vue-materialize/sass/variables";
@import "~vue-materialize/sass/colorProcessor";

@import "~vue-materialize/sass/normalize";

@import "~vue-materialize/sass/global";
// basic css
@import "~vue-materialize/sass/icons-material-design";
@import "~vue-materialize/sass/roboto";
@import "~vue-materialize/sass/typography";
@import "~vue-materialize/sass/buttons";
@import "~vue-materialize/sass/grid";
@import "~vue-materialize/sass/navbar";
@import "~vue-materialize/sass/table_of_contents";
@import "~vue-materialize/sass/preloader";


// css for js modules
// only the variable depended part of css will
// be here, all others will be directly
// with the module.
@import "~vue-materialize/sass/sideNav";
// @import "~vue-materialize/sass/waves";
// @import "~vue-materialize/sass/cards";
// @import "~vue-materialize/sass/toast";
// @import "~vue-materialize/sass/tabs";
// @import "~vue-materialize/sass/tooltip";
// @import "~vue-materialize/sass/dropdown";
// @import "~vue-materialize/sass/modal";
// @import "~vue-materialize/sass/collapsible";
// @import "~vue-materialize/sass/materialbox";
// @import "~vue-materialize/sass/form";
// @import "~vue-materialize/sass/slider";
// @import "~vue-materialize/sass/date_picker/default.scss";
// @import "~vue-materialize/sass/date_picker/default.date.scss";
// @import "~vue-materialize/sass/date_picker/default.time.scss";
```

Require it like this:
```js
require("./materialize.config.scss")
```

## Release History

 - *v0.0.1*: First release

## License
Copyright (c) 2015 Paul Pflugradt
Licensed under the MIT license.
