<template lang="jade">
nav.top-nav
  div.nav-wrapper
    p(style="margin-left:20px") header text
pushpin.pushpin(:top=90,:offset=20)
  p some fixed content
.container
  a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/pushpin.vue") source
footer.page-footer
  .container
    .row
      p footer text
</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  components:
    "pushpin" : require "../src/pushpin.coffee"

</script>

<style lang="stylus">
.container > a
  position absolute
  left 40%
  top 80px
.pushpin
  left 20px
body
  height 2000px
  display: flex
  min-height: 100vh
  flex-direction: column
  justify-content space-between
</style>
