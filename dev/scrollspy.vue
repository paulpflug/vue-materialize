<template lang="jade">
.container
  scrollspy(style="position:fixed;right:20px;top:20px")
    scrollspy-item(target="first") first
    scrollspy-item(target="second") second
    scrollspy-item(target="third") third
    scrollspy-item(target="fourth") fourth
  #first.section(style="height:600px")
    h3 First
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/scrollspy.vue") source
  #second.section(style="height:100px")
    h3 Second
  #third.section(style="height:500px")
    h3 Third
  #fourth.section(style="height:150px")
    h4 Fourth
</template>

<script lang="coffee">
module.exports =
  components:
    "scrollspy": require "../scrollspy"
    "scrollspy-item": require "../scrollspy-item"
</script>
