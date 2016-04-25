# out: ../card-reveal.js
Velocity = require("velocity-animate")
cr = require "vue-card/card-reveal"
cr.props.transition.default = ({el,style,cb}) ->
  Velocity el, "stop"
  Velocity el, {top:style.top,height:style.height},{
    duration: 300
    easing: "easeInOutQuad"
    queue: false
    complete: cb
    }

  fade = ->
    Velocity el, {opacity:style.opacity}, {
      duration: 50
      easing: "easeInOutQuad"
      queue: false
    }
  if style.opacity == 1
    setTimeout fade,50
  else
    setTimeout fade,200
module.exports = cr
