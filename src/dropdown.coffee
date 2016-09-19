# out: ../dropdown.js
Velocity = require("velocity-animate")
dropdown = require "vue-comps-dropdown"
cancel = (el) -> Velocity el, "stop"
module.exports =
  template: dropdown.template
  mixins: dropdown.mixins
  props: dropdown.props
  data: dropdown.data
  computed:
    cAnchor: dropdown.computed.cAnchor
    mergeStyle: dropdown.computed.mergeStyle
    mergeClass: -> return ["dropdown-content"]
  methods: dropdown.methods
  ready: dropdown.ready
  beforeDestroy: dropdown.beforeDestroy
  transitions:
    dropdown:
      css: false
      enter: (el, done) ->
        Velocity el, "slideDown",{
          duration: 300
          queue: false
          easing: 'easeOutCubic'
          complete: done
        }
        Velocity el, {opacity: 1},{
          duration: 300
          queue: false
          easing: 'easeOutSine'
        }
      leave: (el, done) ->
        Velocity el, {opacity: 0},{
          duration: 225
          queue: false
          easing: 'easeOutSine'
          complete: done
        }
      leaveCancelled: cancel
      enterCancelled: cancel
