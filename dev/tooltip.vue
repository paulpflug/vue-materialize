<template lang="pug">
.container
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/tooltip.vue") source
  button.btn(style="margin-right: 10px") Hover
    tooltip Content
  button.btn(style="margin-right: 10px") Hover
    tooltip(anchor="n") Content
  button.btn(style="margin-right: 10px") Hover
    tooltip(anchor="w") Content
  button.btn(style="margin-right: 10px") Hover
    tooltip(anchor="e") Content

</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  components:
    "tooltip" : require "../src/tooltip.coffee"

</script>
