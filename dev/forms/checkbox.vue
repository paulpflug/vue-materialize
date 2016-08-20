<template lang="pug">
.container
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/forms/radio.vue") source
  p
    input(type="checkbox",id="one")
    label(for="one") one
  p
    input(type="checkbox",id="two",class="filled-in")
    label(for="two") two
  p
    input(type="checkbox",id="three",disabled)
    label(for="three") disabled
</template>

<script lang="coffee">
require("../materialize.config.scss")
module.exports = {}
</script>
