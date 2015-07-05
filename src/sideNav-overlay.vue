// out: ..
<template lang="jade">
div#sidenav-overlay(
  style="{{left}}{{right}}{{opacity}}"
  v-on="click:click"
  )
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/left")
    require("vue-mixins/right")
    require("vue-mixins/opacity")
  ]
  el: -> document.createElement "div"
  data: ->
  methods:
    click: ->
      @$emit "click"
</script>

<style lang="scss">
#sidenav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 120vh;
  background-color: rgba(0,0,0,.5);
  z-index: 997;

  will-change: opacity;
}
</style>
