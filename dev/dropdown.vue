<template lang="pug">
.container.dropdown
  p
    button.btn Click
      dropdown
        li
          a Content
        li
          a Content
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/dropdown.vue") source
</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  components:
    "dropdown" : require "../src/dropdown.coffee"
</script>
