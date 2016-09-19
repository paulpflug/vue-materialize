window.vueMaterialize ?= {}

camelize = (str) ->
  str.replace /-(\w)/g, (_, c) ->
    if c then c.toUpperCase() else ''
req = require.context("..",false,/.js$/)

for name in [
    "card"
    "collapsible-item"
    "collapsible"
    "dropdown"
    "fixed-action-button"
    "input-field"
    "material-box"
    "modal"
    "parallax"
    "pushpin"
    "scrollfire"
    "scrollspy-item"
    "scrollspy"
    "side-nav"
    "switch"
    "toaster"
    "tooltip"
    "waves"
    ]
  window.vueMaterialize[camelize(name)] = req("./#{name}.js")

require('./materialize.config.scss')
