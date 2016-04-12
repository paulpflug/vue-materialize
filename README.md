# vue-materialize

[materializeCss](http://materializecss.com/) styles for [vue-comps](https://github.com/vue-comps).

**No jQuery dependency**

### [Demo](https://paulpflug.github.io/vue-materialize)

# Install

```sh
npm install --save-dev vue-materialize
// webpack
npm install --save-dev webpack
// style loaders
npm install --save-dev style-loader css-loader sass-loader url-loader file-loader
```
or include `build/bundle.js` (comes with npm install - 152kb)

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

#### collapsible
```coffee
## whithin your module
components:
  "collapsible": require "vue-materialize/collapsible"
  "collapsible-item": require "vue-materialize/collapsible-item"
# or with bundle.js
  "collapsible": window.vueMaterialize.collapsible
  "collapsible-item": window.vueMaterialize.collapsibleItem
```
```html
<collapsible>
  <collapsible-item>
    <h4 slot="header">header1</h4>
    <p>body 1</p>
  </collapsible-item>
  <collapsible-item>
    <h4 slot="header">header21</h4>
    <p>body 2</p>
  </collapsible-item>
</collapsible>
```
[demo](https://paulpflug.github.io/vue-materialize/#!/collapsible) - [source for demo](dev/collapsible.vue) - [doc: vue-collapsible](https://github.com/vue-comps/vue-collapsible)

#### dropdown
```coffee
## whithin your module
components:
  "dropdown": require "vue-materialize/dropdown"
# or with bundle.js
  "dropdown": window.vueMaterialize.dropdown
```
```html
<button> Open Dropdown
  <dropdown>
    <li>Content</li>
  </dropdown>
</button>
```
[demo](https://paulpflug.github.io/vue-materialize/#!/dropdown) - [source for demo](dev/dropdown.vue) - [doc: vue-comps-dropdown](https://github.com/vue-comps/vue-comps-dropdown)

#### modal
```coffee
## whithin your module
components:
  "modal": require "vue-materialize/modal"
# or with bundle.js
  "modal": window.vueMaterialize.modal
```
```html
<button> Open Modal
  <modal>
    <modal-content>
      <h4>Header</h4>
      <p>Content</p>
    </modal-content>
    <modal-footer>
      <button class="btn btn-flat">close</button>
    </modal-footer>
  </modal>
</button>
```
[demo](https://paulpflug.github.io/vue-materialize/#!/modal) - [source for demo](dev/modal.vue) - [doc: vue-comps-modal](https://github.com/vue-comps/vue-comps-modal)

#### parallax
```coffee
components:
  "parallax": require "vue-materialize/parallax"
# or with bundle.js
  "parallax": window.vueMaterialize.parallax
```
```html
<parallax src="path/to/img">
  <div slot="loading">loading...</div>
  <div>content</div>
</parallax>
```
[demo](https://paulpflug.github.io/vue-materialize/#!/parallax) - [source for demo](dev/parallax.vue) - [doc: vue-parallax](https://github.com/vue-comps/vue-parallax)

#### pushpin
```coffee
components:
  "pushpin": require "vue-materialize/pushpin"
# or with bundle.js
  "pushpin": window.vueMaterialize.pushpin
```
```html
<pushpin>
  <p>some fixed text</p>
</pushpin>
```
[demo](https://paulpflug.github.io/vue-materialize/#!/pushpin) - [source for demo](dev/pushpin.vue) - [doc: vue-pushpin](https://github.com/vue-comps/vue-pushpin)

#### scrollspy
```coffee
## whithin your module
components:
  "scrollspy": require "vue-materialize/scrollspy"
  "scrollspy-item": require "vue-materialize/scrollspy-item"
# or with bundle.js
  "scrollspy": window.vueMaterialize.scrollspy
  "scrollspy-item": window.vueMaterialize.scrollspyItem
```
```html
<scrollspy>
  <scrollspy-item>
    <h4 slot="header">header1</h4>
    <p>body 1</p>
  </scrollspy-item>
  <scrollspy-item>
    <h4 slot="header">header21</h4>
    <p>body 2</p>
  </scrollspy-item>
</scrollspy>
```
[demo](https://paulpflug.github.io/vue-materialize/#!/scrollspy) - [source for demo](dev/scrollspy.vue) - [doc: vue-comps-scrollspy](https://github.com/vue-comps/vue-comps-scrollspy)

#### side-nav
```coffee
components:
  "side-nav": require "vue-materialize/side-nav"
# or with bundle.js
  "side-nav": window.vueMaterialize.sideNav
```
```html
<side-nav>
  <li><a>First Text</a><li>
</side-nav>
```
[demo](https://paulpflug.github.io/vue-materialize/#!/side-nav) - [source for demo](dev/side-nav.vue) - [doc: vue-side-nav](https://github.com/vue-comps/vue-side-nav)







#### input-field
```coffee
## whithin your module
components:
  "input-field": require "vue-materialize/input-field"
# or with bundle.js
  "input-field": window.vueMaterialize.inputField
```
more info to come..

## License
Copyright (c) 2015 Paul Pflugradt
Licensed under the MIT license.
