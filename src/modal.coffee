# out: ../modal.js
Velocity = require("velocity-animate")
require "./overlay"
modal = require "vue-comps-modal"
modal.props.bottomSheet =
  type: Boolean
  default: false
modal.compiled = ->
  @classes.push "bottom-sheet" if @bottomSheet

modal.props.transitionIn.default = ({el,cb}) ->
  Velocity el, "stop"
  if @bottomSheet
    Velocity el, {bottom: "0", opacity: 1}, {
      duration: 350,
      queue: false,
      ease: "easeOutCubic",
      complete: cb
    }
  else
    Velocity.hook(@$els.modal, "scaleX", 0.7)
    Velocity el, { top: "10%", opacity: 1, scaleX: 1}, {
      duration: 350,
      ease: "easeOutCubic",
      complete: cb
    }
modal.props.transitionOut.default = ({el,cb}) ->
  #Velocity el, "stop"
  if @bottomSheet
    Velocity el, {bottom: "-100%", opacity: 0}, {
      duration: 350,
      queue: false,
      ease: "easeOutCubic",
      complete: cb
    }
  else
    Velocity el, { top: "4%", opacity: 0, scaleX: 0.7}, {
      duration: 350,
      ease: "easeOutCubic",
      complete: cb
    }
module.exports = modal
