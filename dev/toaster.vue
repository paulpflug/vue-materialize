<template lang="jade">

.container
  button.btn(@click="normaltoast") Toast
  button.btn(@click="roundedtoast") Rounded toast
  a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/toaster.vue") source

</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("../src/toaster.coffee")
  ]
  methods:
    normaltoast: ->
      @toast text:"I am toast"
    roundedtoast: ->
      @toast text:"I am round toast", classes: ["toast","rounded"]
</script>

<style lang="stylus">
.container > a
  position absolute
  left 250px
  top 40px

</style>
