<template lang="pug">
.container
  .row
    .col.s12.m6
      card
        img(slot="img" src="http://materializecss.com/images/office.jpg")
        span(slot="title") Title (click me)
        p Some Content
        span(slot="revealTitle") Title (click me)
        p(slot="reveal") Significantly more Content
        a(slot="action" href="#card") Some action
  .row
    .col.s12.m6
      card.sticky-action
        img(slot="img" src="http://materializecss.com/images/office.jpg")
        span(slot="title") Title (click me)
        p Some Content
        span(slot="revealTitle") Title (click me)
        p(slot="reveal") Significantly more Content
        a(slot="action" href="#card") Some sticky action
  p
    a(href="https://github.com/vue-comps/vue-collapsible/blob/master/dev/basic.vue") source
</template>

<script lang="coffee">
module.exports =
  components:
    "card" : require "../src/card"
</script>
