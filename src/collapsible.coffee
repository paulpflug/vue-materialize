# out: ../collapsible.js
Velocity = require("velocity-animate")
comp = require "vue-collapsible/collapsible"
comp.mixins = [require("vue-mixins/setCss")]
comp.props.transitionIn.default = ({el,cb}) ->
  Velocity el, "stop"
  Velocity el, "slideDown",{
    duration: 350
    easing: "easeOutQuart"
    queue: false
    complete: cb
    }
comp.props.transitionOut.default = ({el,cb}) ->
  Velocity el, "stop"
  Velocity el, "slideUp",{
    duration: 350
    easing: "easeOutQuart"
    queue: false
    complete: cb
    }
comp.ready = ->
  for child in @$children
    if child.isCollapsibleItem
      @setCss child.$els.body, "display", "block"
module.exports = comp
