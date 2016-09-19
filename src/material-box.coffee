# out: ../material-box.js
Velocity = require("velocity-animate")
require "./overlay"
cancel = (el) -> Velocity el, "stop"
box = require "vue-zoombox"
b =
  template: box.template
  mixins: box.mixins
  props: box.props
  computed: box.computed
  data: box.data
  watch: box.watch
  methods: box.methods
  beforeCompile: box.beforeCompile
  ready: box.ready
  beforeDestroy: box.beforeDestroy
  transitions:
    zoombox:
      css: false
      leaveCancelled: cancel
      enterCancelled: cancel
      enter: (el,done) ->
        Velocity.hook(el, "scale", @imgScale)
        @$nextTick =>
          Velocity el, {scale:@imgScale*@scale,top:@relPos.top,left:@relPos.left}, {
            duration: 275,
            queue: false,
            ease: "easeOutQuad",
            complete: done
          }
      leave: (el,done) ->
        Velocity.hook(el, "scale", @imgScale*@scale)
        Velocity el, {scale:@imgScale,top:0,left:0}, {
          duration: 200,
          queue: false,
          ease: "easeOutQuad",
          complete: done
        }
    zoomboxCaption:
      css: false
      leaveCancelled: cancel
      enterCancelled: cancel
      enter: (el,done) ->
        Velocity el, {opacity:1}, {
          duration: 275,
          queue: false,
          ease: "easeOutQuad",
          complete: done
        }
      leave: (el,done) ->
        Velocity el, {opacity:0}, {
          duration: 200,
          queue: false,
          ease: "easeOutQuad",
          complete: done
        }
module.exports = b
