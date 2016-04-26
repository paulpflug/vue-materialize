<template lang="jade">
.container
  fab(style="bottom:20px;right:20px")
    a.btn-floating.btn-large(slot="fab") hover
    li
      a.btn-floating 1
    li
      a.btn-floating 2
  fab(style="bottom:240px;right:20px",click-to-toggle)
    a.btn-floating.btn-large(slot="fab") click
    li
      a.btn-floating 1
    li
      a.btn-floating 2
  fab(style="bottom:20px;right:120px",horizontal)
    a.btn-floating.btn-large(slot="fab") left
    li
      a.btn-floating 1
    li
      a.btn-floating 2
  a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/fixed-action-button.vue") source
</template>

<script lang="coffee">
module.exports =
  components:
    "fab" : require "../src/fixed-action-button.coffee"

</script>
