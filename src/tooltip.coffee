# out: ../tooltip.js
Velocity = require("velocity-animate")
tooltip = require "vue-comps-tooltip"
clone = require "lodash/clone"
cancel = (el) ->
  backdrop = el.firstElementChild
  Velocity backdrop, "stop"
  Velocity el, "stop"
tt =
  template: """
    <div :style=computedStyle v-if=opened v-el:tt v-bind:class=computedClass style="display:block" v-bind:id="id" v-bind:transition="cTransition">
      <div class="backdrop" style="display: block; transform-origin: 50% 50%" v-bind:style="bStyle"></div>
      <slot></slot>
    </div>"""
  mixins: tooltip.mixins
  methods: tooltip.methods
  computed: tooltip.computed
  beforeDestroy: tooltip.beforeDestroy
  ready: tooltip.ready
  data: ->
    direction: ""
    width: null
    height: null
    top: null
    left: null
    bStyle: null
  props: clone(tooltip.props)
  watch: tooltip.watch
  transitions:
    default:
      enter: (el, done) ->
        backdrop = el.firstElementChild
        height = el.clientHeight
        width = el.clientWidth
        switch @direction
          when "s"
            elstyle = marginTop: "10px", marginLeft: 0
            bStyle =
              borderRadius: "0 0 14px 14px"
              left: width/2 - 7 + "px"
              transformOrigin: '50% 0'
              top: 0
          when "n"
            elstyle = marginTop: "-10px", marginLeft: 0
            bStyle =
              borderRadius: "14px 14px 0 0"
              left: width/2 - 7 + "px"
              bottom: 0
              transformOrigin: '50% 100%'
          when "w"
            elstyle = marginTop: 0, marginLeft: "-10px"
            bStyle =
              borderRadius: "14px 0 0 14px"
              right: 0
              top: height/2 - 3.5 + "px"
              transformOrigin: '100% 50%'
          when "e"
            elstyle = marginTop: 0, marginLeft: "10px"
            bStyle =
              borderRadius: "0 14px 14px 0"
              left: 0
              top: height/2 - 3.5 + "px"
              transformOrigin: '0% 50%'
        scaleX = Math.SQRT2 * width / 14
        scaleY = Math.SQRT2 * height / 7
        @bStyle = bStyle
        @$nextTick ->
          Velocity el, elstyle, {
            duration: 350
            queue: false
            complete: done
          }
          Velocity el, {opacity:1}, {
            duration: 300
            delay: 50
            queue: false
          }
          Velocity backdrop, {opacity:1}, {
            duration: 55
            delay: 0
            queue: false
          }
          Velocity backdrop, {scaleX: scaleX, scaleY: scaleY}, {
            duration: 300
            delay: 50
            queue: false
            easing: 'easeInOutQuad'
          }
      leave: (el, done) ->
        backdrop = el.firstElementChild
        Velocity backdrop, {scaleX:1,scaleY:1,opacity:0}, {
          duration: 255
          queue: false
        }
        Velocity el, {opacity: 0, marginTop: 0, marginLeft: 0}, {
          duration: 225
          queue: false
          complete: done
        }
      leaveCancelled: cancel
      enterCancelled: cancel

tt.props.class.default = -> ["material-tooltip"]

module.exports = tt
