# out: ../dropdown.js
Velocity = require("velocity-animate")
ci = require "vue-comps-dropdown"
ci.computed ?= {}
ci.computed.mergeClass = ->
  return ["dropdown-content"]
ci.props.transitionIn.default = ({el,cb}) ->
  Velocity el, "stop"
  Velocity el, "slideDown",{
    duration: 300
    queue: false
    easing: 'easeOutCubic'
    complete: cb
  }
  Velocity el, {opacity: 1},{
    duration: 300
    queue: false
    easing: 'easeOutSine'
  }
ci.props.transitionOut.default = ({el,cb}) ->
  Velocity el, "stop"
  Velocity el, {opacity: 0},{
    duration: 225
    queue: false
    easing: 'easeOutSine'
    complete: cb
  }
module.exports = ci
