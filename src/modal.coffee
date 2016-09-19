# out: ../modal.js
Velocity = require("velocity-animate")
cancel = (el) -> Velocity el, "stop"
require "./overlay"
modal = require "vue-comps-modal"
clone = require "lodash/clone"
m =
  template: modal.template
  mixins: modal.mixins
  created: modal.created
  computed: mergeClass: ->
    modal: true
    "bottom-sheet": @bottomSheet
  props: clone(modal.props)
  data: modal.data
  methods: modal.methods
  beforeDestroy: modal.beforeDestroy
  transitions:
    modal:
      enter: (el, done) ->
        if @bottomSheet
          Velocity el, {bottom: "0", opacity: 1}, {
            duration: 350,
            queue: false,
            easing: "easeOutCubic",
            complete: done
          }
        else
          Velocity.hook(el, "scaleX", 0.7)
          Velocity el, { top: "10%", opacity: 1, scaleX: 1}, {
            duration: 350,
            easing: "easeOutCubic",
            complete: done
          }
      leave: (el, done) ->
        if @bottomSheet
          Velocity el, {bottom: "-100%", opacity: 0}, {
            duration: 350,
            queue: false,
            easing: "easeOutCubic",
            complete: done
          }
        else
          Velocity el, { top: "4%", opacity: 0, scaleX: 0.7}, {
            duration: 350,
            easing: "easeOutCubic",
            complete: done
          }
      leaveCancelled: cancel
      enterCancelled: cancel
m.props.bottomSheet =
  type: Boolean
  default: false
module.exports = m
