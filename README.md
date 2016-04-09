# vue-materialize

[materializeCss](http://materializecss.com/) styles for [vue-comps](https://github.com/vue-comps).

**No jQuery dependency**

### [See it in action](https://vue-comps.github.io/vue-side-nav)

# Install

```sh
npm install --save-dev vue-materialize
// webpack
npm install --save-dev webpack
// style loaders
npm install --save-dev style-loader css-loader sass-loader url-loader file-loader
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
@charset "UTF-8";

@import "~materialize-css/sass/components/mixins";

// all colors:
// @import "~materialize-css/sass/components/color";

// only specific colors:
@import "~vue-materialize/sass/color";
// include colors you need
@include do("include-color","black", "base");
@include do("include-color","white", "base");
@import "~vue-materialize/sass/colorProcessor";

@import "~materialize-css/sass/components/variables";
@import "~materialize-css/sass/components/normalize";
@import "~materialize-css/sass/components/global";

// basic css

// icons are no long included in materializeCSS
@import "~materialize-css/sass/components/icons-material-design";

// roboto doesn't seem to work
//$roboto-font-path: "../../fonts/roboto/";
//@import "~materialize-css/sass/components/roboto";

@import "~materialize-css/sass/components/typography";
@import "~materialize-css/sass/components/buttons";
@import "~materialize-css/sass/components/grid";
@import "~materialize-css/sass/components/navbar";
@import "~materialize-css/sass/components/table_of_contents";
@import "~materialize-css/sass/components/preloader";


// css for js modules
// activate only what you need
@import "~materialize-css/sass/components/sideNav";
@import "~materialize-css/sass/components/dropdown";
@import "~materialize-css/sass/components/modal";
@import "~materialize-css/sass/components/collapsible";
@import "~materialize-css/sass/components/forms/forms";
// @import "~materialize-css/sass/components/waves";
// @import "~materialize-css/sass/components/cards";
// @import "~materialize-css/sass/components/toast";
// @import "~materialize-css/sass/components/tabs";
// @import "~materialize-css/sass/components/tooltip";
// @import "~materialize-css/sass/components/materialbox";
// @import "~materialize-css/sass/components/slider";
// @import "~materialize-css/sass/components/date_picker/default";
// @import "~materialize-css/sass/components/date_picker/default.date";
// @import "~materialize-css/sass/components/date_picker/default.time";
```

Require it like this:
```js
require("./materialize.config.scss")
```

#### side-nav
```coffee
components:
  "side-nav": require "vue-materialize/side-nav"
```
[example](https://vue-comps.github.io/vue-side-nav/#!/side-nav)
[source for example](https://github.com/paulpflug/vue-materialize/blob/master/dev/side-nav.vue")
[doc: vue-comps-side-nav](https://github.com/vue-comps/vue-side-nav)

#### collapsible
```coffee
## whithin your module
components:
  "collapsible": require "vue-materialize/collapsible"
  "collapsible-item": require "vue-materialize/collapsible-item"
```
[example](https://vue-comps.github.io/vue-side-nav/#!/collapsible)
[source for example](https://github.com/paulpflug/vue-materialize/blob/master/dev/collapsible.vue")
[doc: vue-comps-collapsible](https://github.com/vue-comps/vue-collapsible)

#### modal
```coffee
## whithin your module
components:
  "modal": require "vue-materialize/modal"
```
[example](https://vue-comps.github.io/vue-side-nav/#!/modal)
[source for example](https://github.com/paulpflug/vue-materialize/blob/master/dev/modal.vue")
[doc: vue-comps-modal](https://github.com/vue-comps/vue-comps-modal)

#### dropdown
```coffee
## whithin your module
components:
  "dropdown": require "vue-materialize/dropdown"
```
[example](https://vue-comps.github.io/vue-side-nav/#!/dropdown)
[source for example](https://github.com/paulpflug/vue-materialize/blob/master/dev/dropdown.vue")
[doc: vue-comps-dropdown](https://github.com/vue-comps/vue-comps-dropdown)

#### input-field
```coffee
## whithin your module
components:
  "input-field": require "vue-materialize/input-field"
```
more info to come..

## License
Copyright (c) 2015 Paul Pflugradt
Licensed under the MIT license.
