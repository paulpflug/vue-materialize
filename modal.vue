<template lang="jade">
.container
  button.btn click
    modal
      .modal-content
        h4 Header
        p Content
      .modal-footer
        closer.btn.btn-flat close
  button.btn bottom-sheet
    modal(bottom-sheet)
      .modal-content
        p Content
      .modal-footer
        closer.btn.btn-flat close
  a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/modal.vue") source
</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  components:
    "modal" : require "../src/modal.coffee"
    "closer":
      template: "<a @click.prevent='close'>close</a>"
      methods:
        close: ->
          @$dispatch "close"
</script>

<style lang="stylus" scoped>
.container > a
  position absolute
  left 250px
  top 40px
button
  position absolute
  &:nth-child(1)
    top 10px
    left 10px
  &:nth-child(2)
    top 80px
    left 10px
</style>
