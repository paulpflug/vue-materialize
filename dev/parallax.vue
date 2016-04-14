<template lang="jade">
parallax(src="http://materializecss.com/images/parallax1.jpg")
  .loading(slot="loading") loading...
.container(style="height:500px")
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/parallax.vue") source
parallax(src="http://materializecss.com/images/parallax2.jpg")
  .loading(slot="loading") loading...
.container(style="height:500px")
.container(style="height:500px")
</template>

<script lang="coffee">
module.exports =
  components:
    "parallax": require "../parallax"
</script>
