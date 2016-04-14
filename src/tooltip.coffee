# out: ../tooltip.js
Velocity = require("velocity-animate")
tooltip = require "vue-comps-tooltip"
tooltip.props.class.default = "material-tooltip"
tooltip.props.backdropStyle =
  type:Object
  default: ->
    display: "block"
    width: null
    height: null
    borderRadius: null
    transformOrigin: null
    marginTop: null
    marginLeft: null
tooltip.template = """
  <div :style=style v-if=opened v-el:tt=v-el:tt v-bind:class=[class]>
    <div class="backdrop" :style="backdropStyle"></div>
    <slot>No content</slot>
  </div>"""
tooltip.props.transitionIn.default = ({el,pos,style,cb}) ->
  backdrop = el.firstElementChild
  width = el.clientWidth
  move = {opacity:1}
  if pos == "s"
    @backdropStyle.width = null
    @backdropStyle.height = null
    @backdropStyle.borderRadius = null
    @backdropStyle.transformOrigin = '50% 20%'
    @backdropStyle.marginTop = null
    @backdropStyle.marginLeft = width/2 - backdrop.offsetWidth + "px"
    move.marginTop = "10px"
  else if pos == "n"
    @backdropStyle.width = null
    @backdropStyle.height = null
    @backdropStyle.borderRadius = '14px 14px 0 0'
    @backdropStyle.transformOrigin = '50% 124%'
    @backdropStyle.marginTop = el.offsetHeight + "px"
    @backdropStyle.marginLeft = width/2 - backdrop.offsetWidth + "px"
    move.marginTop = "-10px"
  else if pos == "w"
    @backdropStyle.width = '14px'
    @backdropStyle.height = '14px'
    @backdropStyle.borderRadius = '14px 0 0 14px'
    @backdropStyle.transformOrigin = '120% 50%'
    @backdropStyle.marginTop = null
    @backdropStyle.marginLeft = width + "px"
    move.marginLeft = "-10px"
  else if pos == "e"
    @backdropStyle.width = '14px'
    @backdropStyle.height = '14px'
    @backdropStyle.borderRadius = '0 14px 14px 0'
    @backdropStyle.transformOrigin = '8% 50%'
    @backdropStyle.marginTop = null
    @backdropStyle.marginLeft = 0
    move.marginLeft = "10px"
  if pos == "s" or pos == "n"
    scale = width / 8
    scale = 8 if scale < 8
  else
    scale = width / 10
    scale = 6 if scale < 6
  @style.top = style.top
  @style.left = style.left
  @$nextTick ->
    Velocity backdrop, "stop"
    Velocity backdrop, {opacity:1}, {duration: 55, delay: 0, queue: false}
    Velocity backdrop, {scale:scale}, {duration: 300, delay: 50, queue: false}
    Velocity el, "stop"
    Velocity el, move, {
      duration: 300
      queue: false
      easing: 'easeOutQuad'
      complete: cb
    }
tooltip.props.transitionOut.default = ({el,cb}) ->
  backdrop = el.firstElementChild
  Velocity backdrop, "stop"
  Velocity backdrop, {scale:1,opacity:0}, {
    duration: 255
    queue: false
  }
  Velocity el, "stop"
  Velocity el, {opacity: 0, marginTop: 0, marginLeft: 0}, {
    duration: 225
    queue: false
    complete: cb
  }
module.exports = tooltip
