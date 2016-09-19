# out: ../scrollspy.js
s = require "vue-comps-scrollspy/scrollspy"
Velocity = require("velocity-animate")
clone = require "lodash/clone"
comp =
  template: s.template
  mixins: s.mixins
  props: clone(s.props)
  methods: s.methods
  ready: s.ready

comp.props.transition.default = (scrollBy, done) ->
  body = document.body
  docEl = document.documentElement
  scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  scrollTop += scrollBy
  duration = Math.abs(scrollBy)/3
  if duration < 100
    duration = 100
  else if duration > 500
    duration = 500
  Velocity docEl, "scroll", duration:duration, offset:scrollTop, complete: ->
    setTimeout done, 66
module.exports = comp
