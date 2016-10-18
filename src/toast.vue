// out: ..
<template lang="pug">
div(
  :style="style"
  ) {{options.text}}
  drag-handle(@move="move",@max="close",@aborted="abort",:max-right=125,:max-left=125,style="width:100%;left:0")
</template>

<script lang="coffee">
Velocity = require("velocity-animate")

module.exports =
  components:
    "drag-handle": require("vue-drag-handle")

  props:
    options:
      type: Object

  data: ->
    style:
      top: "35px"
      opacity: 0
      position: "relative"
      left: 0

  methods:
    move: (dX) ->
      @style.left = dX+'px'
      @style.opacity = 1-Math.abs(dX/125)
    close: -> @options.close()
    abort: ->
      Velocity @$el, "stop"
      Velocity @$el,{"left":0, opacity: 1},{
        duration:300
        easing: 'easeOutCubic'
      }
</script>
