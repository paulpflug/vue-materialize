// out: ..
<template lang="pug">
div(v-bind:class="options.classes",v-bind:style="style",transition="fade") {{options.text}}
  drag-handle(@move="move",@max="close",@aborted="abort",v-bind:max-right=125,v-bind:max-left=125,style="width:100%;left:0")
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
    close: ->
      @$emit "close"
    abort: ->
      Velocity @$el, "stop"
      Velocity @$el,{"left":0, opacity: 1},{
        duration:300
        easing: 'easeOutCubic'
      }

  transitions:
    fade:
      css: false
      enter: (el, done) ->
        Velocity el, { "top": 0, opacity: 1 },{
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
