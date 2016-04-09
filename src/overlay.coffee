# out: ../overlay.js
Velocity = require("velocity-animate")
Overlay = require "vue-overlay"
Overlay.obj.props.fade.default = ({el,opacity,cb}) ->
  Velocity el, {opacity: opacity},{
    duration: 300
    queue: false
    easing: 'easeOutQuad'
    complete: cb
  }
