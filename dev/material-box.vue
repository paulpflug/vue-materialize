<template lang="pug">
.container(style="height:2000px")
  a(href="https://github.com/vue-comps/vue-zoombox/blob/master/dev/basic.vue") source
  material-box(style="width:200px",src="http://th01.deviantart.net/fs70/PRE/i/2013/126/1/e/nature_portrait_by_pw_fotografie-d63tx0n.jpg")
    span(slot="caption" style="color:white") a caption
    p(style="color:white") other Content
</template>

<script lang="coffee">
module.exports =
  components:
    "material-box" : require "../src/material-box.coffee"

</script>
