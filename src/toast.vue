// out: ..
<template lang="jade">
div(:class="options.classes",:style="style",transition="fade") {{options.text}}
</template>

<script lang="coffee">
Velocity = require("velocity-animate")

module.exports =
  props:
    options:
      type: Object

  data: ->
    style:
      top: "35px"
      opacity: 0

  transitions:
    fade:
      css: false
      enter: (el, done) ->
        Velocity el, { "top": "0px", opacity: 1 },{
          duration: 300
          queue: false
          easing: 'easeOutCubic'
          complete: done
        }
      leave: (el, done) ->
        Velocity el, {"opacity": 0, marginTop: '-40px'},{
          duration: 375
          queue: false
          easing: 'easeOutExpo'
          complete: =>
            @options.cb?()
            done()
        }


</script>
