# out: ../overlay.js
Velocity = require("velocity-animate")
Overlay = require "vue-overlay"
# for overlay 1.0
# Overlay.obj.methods.fade = ({el,opacity,cb}) ->
Overlay.obj.props.fade.default = ({el,opacity,cb}) ->
  Velocity el, {opacity: opacity},{
    duration: 300
    queue: false
    easing: 'easeOutQuad'
    complete: cb
  }
