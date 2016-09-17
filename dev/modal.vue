<template lang="pug">
.container
  p
    .btn click
      modal(v-bind:is-opened.sync="opened1")
        .modal-content
          h4 Header
          p Content
        .modal-footer
          .btn.btn-flat(@click="close1") close
  p
    .btn bottom-sheet
      modal(bottom-sheet v-bind:is-opened.sync="opened2")
        .modal-content
          p Content
        .modal-footer
          .btn.btn-flat(@click="close2") close
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/modal.vue") source
</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  components:
    "modal": require "../src/modal.coffee"
  data: ->
    opened1: false
    opened2: false
  methods:
    close1: ->
      @opened1 = false
    close2: ->
      @opened2 = false
</script>
