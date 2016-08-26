<template lang="pug">
.container
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/waves.vue") source
  button.btn black ripple
    waves

  button.btn(style="margin-left:20px;position:relative") blue ripple
    waves(color="blue")

  button.btn(style="margin-left:20px") white ripple
    waves(color="white")
</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  components:
    "waves" : require "../src/waves.coffee"

</script>
