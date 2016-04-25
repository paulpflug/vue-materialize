<template lang="jade">
.container
  .row
    .col.s12.m6
      card
        card-toggle.card-image
          img(src="http://materializecss.com/images/office.jpg")

        .card-content
          card-toggle Title (click me)
          p Some Content
        card-reveal
          card-toggle Title (click me)
          p Significantly more Content
  .row
    .col.s12.m6
      card
        card-toggle.card-image
          img(src="http://materializecss.com/images/office.jpg")

        .card-content
          card-toggle Title (click me)
          p Some Content
        card-reveal
          card-toggle Title (click me)
          p Significantly more Content
        .card-action
          a(href="#cards") Some action
  p
    a(href="https://github.com/vue-comps/vue-collapsible/blob/master/dev/basic.vue") source
</template>

<script lang="coffee">
module.exports =
  components:
    "card" : require "../src/card"
    "card-reveal" : require "../src/card-reveal"
    "card-toggle" : require "../src/card-toggle"

</script>
