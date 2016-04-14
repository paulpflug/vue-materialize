<template lang="jade">
header
  nav.top-nav
    div.nav-wrapper
      p(style="margin-left:20px") header text

.container(style="height:2000px")
  pushpin.pushpin(:top=90,:offset=20,style="left:20px")
    p some fixed content
  p
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
