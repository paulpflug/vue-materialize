# out: ../toaster.js
Velocity = require("velocity-animate")
Toaster = require "vue-toaster/toaster"
Toaster.obj.props.isTop.default = true
Toaster.obj.components.toast = require "./toast"
Toaster.obj.transitions =
  toast:
    css: false
    enter: (el, done) ->
      Velocity el, { top: 0, opacity: 1 },{
        duration: 300
        queue: false
        easing: 'easeOutCubic'
        complete: done
      }
    leave: (el, done) ->
      Velocity el, {opacity: 0, marginTop: '-40px'},{
        duration: 375
        queue: false
        easing: 'easeOutExpo'
        complete: done
      }
module.exports =
  computed: require("vue-mixins/vue").computed
  compiled: ->
    toaster = Toaster(@Vue)
    if toaster.used == 0
      document.body.appendChild toaster.$el
    toaster.used++
    @toast = toaster.toast
  beforeDestroy: ->
    toaster = Toaster(@Vue)
    toaster.used--
    if toaster.used == 0
      toaster.clear()
      document.body.removeChild toaster.$el
