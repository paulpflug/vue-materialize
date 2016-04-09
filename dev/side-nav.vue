<template lang="jade">

.container
  side-nav(:is-opened.sync="opened" v-ref:side-nav fixed)
    li
      a First Link
    li
      a Second Link
  .container2
    h4 fixed side-nav
    button.btn(@click="toggle" style="top: 10px") Toggle
    p Resize your window
    p drag the menu in!
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/side-nav.vue") source

</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/getVue")
  ]
  beforeCompile: ->
    Vue = @getVue()
    Vue.use(require('vue-touch'))
  data: ->
    opened: false
  methods:
    toggle: ->
      @opened = !@opened
  components:
    "side-nav": require "../src/side-nav.coffee"
</script>

<style lang="stylus">
.container2
  position relative
  & > a
    position absolute
    left 250px
    top 40px

</style>
