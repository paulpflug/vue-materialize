// out: ..
<template lang="jade">
div#overlay(
  v-bind:style="style"
  @click="click"
  )
</template>

<script lang="coffee">
Velocity = require("velocity-animate")
module.exports =
  mixins:[
    require("vue-mixins/onClickStack")
  ]
  data: ->
    isOpened: false
    style:
      opacity: 0
      "z-index": 995
  el: -> document.createElement "div"
  methods:
    open: (cb, opacity=0.5) ->
      return if @isOpened
      @isOpened = true
      @$appendTo('body')
      @$dispatch "open"
      Velocity @$el, {opacity: opacity},
        {
          duration: 300
          queue: false
          easing: 'easeOutQuad'
          complete: => @$dispatch "show"
        }
    close: ->
      return unless @isOpened
      @isOpened = false
      @$dispatch "close"
      Velocity @$el, {opacity: 0},
        {
          duration: 300
          queue: false
          easing: 'easeOutQuad'
          complete: =>
            @$dispatch "hide"
            @$remove()
        }

</script>

<style lang="scss">
#overlay {
  position: fixed;
  top: -10px;
  left: 0;
  right: 0;
  height: 120vh;
  background-color: black;
  will-change: opacity;
}
</style>
