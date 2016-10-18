# out: ./index.js
materialize = {}

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
    "select-option"
    "select"
    "side-nav"
    "switch"
    "toaster"
    "tooltip"
    "waves"
    ]
  materialize[camelize(name)] = req("./#{name}.js")

require('./materialize.config.scss')
if module.exports != null
  #materialize.icon = req("./icon")
  module.exports = materialize
else
  window.vueMaterialize = materialize
