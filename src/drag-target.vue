// out: ..
<template lang="jade">
div#drag-target(
  v-bind:style="style"
  @click="click"
  )
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/onClick")
  ]
  el: -> document.createElement "div"
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
      @style.width = "50%"
      @send(edge!="left")

    close: (edge) ->
      @style.width = undefined
      @send(edge=="left")

</script>

<style lang="scss">
// Touch interaction
#drag-target {
  height: 100%;
  width: 10px;
  position: fixed;
  top: 0;
  z-index: 998;
}
</style>
