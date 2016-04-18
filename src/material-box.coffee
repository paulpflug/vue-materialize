# out: ../material-box.js
Velocity = require("velocity-animate")
require "./overlay"
box = require "vue-zoombox"
box.props.bottomSheet =
  type: Boolean
  default: false
box.compiled = ->
  @classes.push "bottom-sheet" if @bottomSheet
getScale = (style) ->
  if style.transform
    scale = style.transform.slice(6).replace(")","")
    delete style.transform
    return scale
  return false
box.props.transitionIn.default = ({el,oldScale,style,cb}) ->
  Velocity el, "stop"
  obj = {
    duration: 275,
    queue: false,
    ease: "easeOutQuad",
    complete: cb
  }
  Velocity.hook(el, "scale", oldScale) if oldScale?
  Velocity el, {scale:getScale(style)}, obj
  Velocity el, style, obj

box.props.transitionOut.default = ({el,style,cb}) ->
  Velocity el, "stop"
  obj = {
    duration: 200,
    queue: false,
    ease: "easeOutQuad",
    complete: cb
  }
  Velocity el, {scale:getScale(style)}, obj
  Velocity el, style, obj

box.props.captionTransition.default = ({el,style,cb}) ->
  Velocity el, "stop"
  duration = if style.opacity == 1 then 275 else 200
  Velocity el, style, {
    duration: duration,
    queue: false,
    ease: "easeOutQuad",
    complete: cb
  }
module.exports = box
