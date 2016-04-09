# out: ../collapsible-item.js
Velocity = require("velocity-animate")
ci = require "vue-collapsible/collapsible-item"
ci.props.transitionIn.default = ({el,cb}) ->
  Velocity el, "stop"
  Velocity el, "slideDown",{
    duration: 350
    easing: "easeOutQuart"
    queue: false
    complete: cb
    }
ci.props.transitionOut.default = ({el,cb}) ->
  Velocity el, "stop"
  Velocity el, "slideUp",{
    duration: 350
    easing: "easeOutQuart"
    queue: false
    complete: cb
    }
module.exports = ci
