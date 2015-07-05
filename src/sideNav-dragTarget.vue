// out: ..
<template lang="jade">
div#drag-target(
  style="{{left}}{{right}}"
  v-on="click:click"
  )
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/left")
    require("vue-mixins/right")
    require("vue-mixins/width")
  ]
  el: -> document.createElement "div"
  methods:
    click: ->
      @$emit "click"
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
