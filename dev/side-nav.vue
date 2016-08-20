<template lang="pug">
.container
  side-nav(v-bind:is-opened.sync="opened",v-bind:is-fixed.sync="fixed" v-ref:side-nav fixed)
    li
      a First Link
    li
      a Second Link
  .container2
    h4 fixed side-nav
    button.btn(@click="toggle" style="top: 10px" v-if="!fixed") Toggle
    p(v-if="fixed") Make your window smaller
    p(v-if="!fixed && !opened") drag the menu in!
    p
      a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/side-nav.vue") source
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/vue")
  ]
  beforeCompile: ->
    @Vue.use(require('vue-touch'))
  data: ->
    opened: false
    fixed:false
  methods:
    toggle: ->
      @opened = !@opened
  components:
    "side-nav": require "../src/side-nav.coffee"
</script>
