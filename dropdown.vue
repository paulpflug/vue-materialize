<template lang="jade">
.container
  button.btn Click
    dropdown
      li
        a Content
      li
        a Content
  a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/dropdown.vue") source
</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  components:
    "dropdown" : require "../src/dropdown.coffee"

</script>

<style lang="stylus" scoped>
.container > a
  position absolute
  left 40%
  top 14px
button
  position absolute
  &:nth-child(1)
    top 10px
    left 10px
</style>
