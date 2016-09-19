# out: ../collapsible-item.js
Velocity = require("velocity-animate")
cancel = (el) -> Velocity el, "stop"
ci = require "vue-collapsible/collapsible-item"
comp =
  template: ci.template
  mixins: ci.mixins
  props: ci.props
  computed: ci.computed
  data: ci.data
  methods: ci.methods
  transitions:
    collapsible:
      css: false
      leaveCancelled: cancel
      enterCancelled: cancel
      enter: (el,done) ->
        Velocity el, "slideDown",{
          duration: 350
          easing: "easeOutQuart"
          queue: false
          complete: done
          }
      leave: (el,done) ->
        Velocity el, "slideUp",{
          duration: 350
          easing: "easeOutQuart"
          queue: false
          complete: done
          }
  ready: ->
    if @isOpened
      @$el.children[1].style.display = "block"
module.exports = comp
