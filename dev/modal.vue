<template lang="jade">
.container
  p
    button.btn click
      modal
        .modal-content
          h4 Header
          p Content
        .modal-footer
          closer.btn.btn-flat close
  p
    button.btn bottom-sheet
      modal(bottom-sheet)
        .modal-content
          p Content
        .modal-footer
          closer.btn.btn-flat close
  p
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
