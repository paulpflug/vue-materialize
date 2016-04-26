# out: ../fixed-action-button.js
Velocity = require("velocity-animate")
fab = require "vue-fixed-action-button"
fab.mixins.push require("vue-mixins/setCss")

fab.props.horizontal =
  default: false
  type: Boolean

fab.compiled = ->
  if @horizontal
    @class.push "horizontal"

fab.props.transitionIn.default = ({el,cb}) ->
  @setCss el, "visibility", "visible"
  time = 0
  style = opacity: 1, scaleX: 1, scaleY: 1
  if @horizontal
    type = "X"
  else
    type = "Y"
  style["translate"+type]=0
  transIn = (el, last) ->
    Velocity el, "stop"
    options = {
      duration: 80
      delay: time
      easing: "easeInOutCubic"
    }
    options.complete = cb if last
    Velocity.hook el, "scaleX", 0.3
    Velocity.hook el, "scaleY", 0.3
    Velocity.hook el, "translate"+type, 40+'px'
    Velocity el, style, options
    time += 40
  for i in [el.children.length-1..0]
    transIn(el.children[i].firstElementChild,i==0)


fab.props.transitionOut.default = ({el,cb}) ->

  Velocity el, "stop"
  style = opacity: 0, scaleX: 0.3, scaleY: 0.3
  if @horizontal
    type = "X"
  else
    type = "Y"
  style["translate"+type]="40px"
  transOut = (el, last) ->
    Velocity el, "stop"
    options = {
      duration: 80
      easing: "easeInOutCubic"
    }
    #options.complete = cb if last
    if last
      setTimeout cb,250
    Velocity el, style, options
  for i in [el.children.length-1..0]
    transOut(el.children[i].firstElementChild,i==0)

module.exports = fab
