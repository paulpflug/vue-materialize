# out: ../side-nav.js
Velocity = require("velocity-animate")
require "./overlay"
sideNav = require "vue-side-nav"

sideNav.props.transition.default = ({el,style,cb}) ->
  @setCss el, "transform", "translateX(0)"
  Velocity el, "stop"
  Velocity el, style, {
    duration: 300
    queue: false
    easing: 'easeOutQuad'
    complete: cb
  }

module.exports = sideNav
