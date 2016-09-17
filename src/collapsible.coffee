# out: ../collapsible.js
c = require "vue-collapsible/collapsible"
#module.exports = c
Velocity = require("velocity-animate")
clone = require "lodash/clone"
comp =
  template: c.template
  mixins: c.mixins
  props: clone(c.props)
  methods: c.methods
comp.props.scrollTransition.default = (top) ->
  body = document.body
  docEl = document.documentElement
  scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  scrollTop += top
  Velocity docEl, "scroll", duration:100, offset:scrollTop
module.exports = comp
