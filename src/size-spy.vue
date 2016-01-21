// out: ..
<template lang="jade">
.width-spy(v-el:width
style="height:0;flex:1 0 auto")
.height-spy(v-el:height
style="width:0;flex:0 1 auto")
</template>

<script lang="coffee">
module.exports =
  mixins: [
    require "vue-mixins/onWindowResize"
  ]
  el: -> document.createElement "div"
  data: ->
    height: null
    width: null
  methods:
    onResize: ->
      newHeight = @$els.height.offsetHeight
      if @height != newHeight
        @height = newHeight
      newWidth = @$els.width.offsetWidth
      if @width != newWidth
        @width = newWidth
  attached: ->
    @$nextTick @onResize
    @addResizeCb @onResize

</script>
<style lang="stylus">
.size-spy-parent
  position relative
  display flex
.size-spy-sibling
  position absolute
  top 0
  left 0
.width-spy,
.height-spy
  margin:0
  padding:0
  line-height 0
  font-size 0
</style>
