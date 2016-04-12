<template lang="jade">
parallax(src="http://materializecss.com/images/parallax1.jpg")
  .loading(slot="loading") loading...
.parallax-between
  a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/parallax.vue") source
parallax(src="http://materializecss.com/images/parallax2.jpg")
  .loading(slot="loading") loading...
.parallax-between
.parallax-between
</template>

<script lang="coffee">
module.exports =
  components:
    "parallax": require "../parallax"
</script>

<style lang="stylus">
.parallax-between
  height: 500px
  > a
    position relative
    left 250px
    top 40px
</style>
