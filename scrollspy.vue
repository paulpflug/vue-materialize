<template lang="jade">
.container
  scrollspy
    scrollspy-item(target="first") first
    scrollspy-item(target="second") second
    scrollspy-item(target="third") third
    scrollspy-item(target="fourth") fourth
  #first.section
    h3 First
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/scrollspy.vue") source
  #second.section
    h3 Second
  #third.section
    h3 Third
  #fourth.section
    h4 Fourth
</template>

<script lang="coffee">
module.exports =
  components:
    "scrollspy": require "../scrollspy"
    "scrollspy-item": require "../scrollspy-item"
</script>

<style lang="stylus">
#first
  height 600px
#second
  height 100px
#third
  height 500px
#fourth
  height 150px
.table-of-contents
  position fixed
  right 20px
  top 20px
</style>
