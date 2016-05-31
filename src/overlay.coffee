# out: ../overlay.js
Velocity = require("velocity-animate")
Overlay = require "vue-overlay"
Overlay.obj.methods.fade = ({el,opacity,cb}) ->
  Velocity el, {opacity: opacity},{
    duration: 300
    queue: false
    easing: 'easeOutQuad'
    complete: cb
  }
