<template lang="pug">
.container
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/forms/radio.vue") source
  p
    input(type="radio",id="one",value="one",v-model="picked")
    label(for="one") one
  p
    input(type="radio",id="two",value="two",v-model="picked",class="with-gap")
    label(for="two") two
  p
    input(type="radio",id="three",value="three",v-model="picked",disabled)
    label(for="three") disabled
</template>

<script lang="coffee">
require("../materialize.config.scss")
module.exports =
  data: ->
    picked: null
</script>
