# out: ../card.js
card = require "vue-card"
Velocity = require("velocity-animate")
cancel = (el) -> Velocity el, "stop"
c =
  template: card.template
  mixins: card.mixins
  props: card.props
  computed: card.computed
  data: card.data
  methods: card.methods
  transitions:
    card:
      css: false
      leaveCancelled: cancel
      enterCancelled: cancel
      beforeEnter: ->
        #height = @$el.clientHeight
        #@rStyle.top = height + "px"
        #@rStyle.opacity = 0
      enter: (el,done) ->
        Velocity.hook el, "translateY", "100%"
        Velocity el, {translateY: 0},{
          duration: 300
          easing: "easeInOutQuad"
          queue: false
          complete: done
          }
      leave: (el,done) ->
        Velocity el, {translateY: "100%"},{
          duration: 300
          easing: "easeInOutQuad"
          queue: false
          complete: done
          }
module.exports = c
