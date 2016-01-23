// out: ..
<template lang="jade">
div#drag-target(
  v-bind:style="style"
  @click="click"
  v-touch:pan="onPan"
  )
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/onClick")
  ]
  el: -> document.createElement "div"
  props:
    "factor":
      type:Number
      default: 1
      coerce: Number
    "onMove":
      type: Function
      required: true
    "onOpen":
      type: Function
      required: true
    "onOpenAbort":
      type: Function
      required: true
    "onClose":
      type: Function
      required: true
    "onCloseAbort":
      type: Function
      required: true
    "maxOpen":
      type:Number
      required: true
    "width":
      type:String
      default:"70%"
  data: ->
    style:
      right: undefined
      left: undefined
      width: undefined
  methods:
    send: (left) ->
      if left
        @style.right = undefined
        @style.left = 0
      else
        @style.right = 0
        @style.left = undefined
    open: (edge) ->
      @edge = edge
      @opened = true
      @style.width = @width
      @send(edge!="left")
    close: (edge) ->
      @edge = edge
      @opened = false
      @style.width = undefined
      @send(edge=="left")
    onPan: (event) ->
      if event.type == "pan"
        dX = event.deltaX*@factor
        if @edge == "left"
          unless @opened
            if not event.isFinal and dX > 0 and dX < @maxOpen
              @onMove(dX)
            else
              if dX > @maxOpen
                @onOpen()
              else
                @onOpenAbort()
          else
            if not event.isFinal and dX< 0 and dX > -@maxOpen
              @onMove(@maxOpen+dX)
            else
              if dX < -@maxOpen
                @onClose()
              else
                @onCloseAbort()

</script>

<style lang="scss">
// Touch interaction
#drag-target {
  height: 100%;
  width: 20px;
  position: fixed;
  top: 0;
  z-index: 998;
}
</style>
