<template lang="pug">
.container(style="height:1500px;padding-left:200px;padding-top:50px")
  a(href="https://github.com/vue-comps/vue-comps-scrollspy/blob/master/dev/basic.vue") source
  p scroll down, will only fire once. Reload to reset
  div(style="margin-top:800px;width:200px;height:200px;background-color:blue") div
    scrollfire(@entered="entered")
    scrollfire(@entered="enteredOffset",v-bind:offset=200)
    scrollfire(@entered="enteredNegativOffset",v-bind:offset=-200)
    scrollfire(@entered="enteredAfter",v-bind:after=2000)
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/vue")
    require("../src/toaster.coffee")
  ]
  beforeCompile: ->
    @Vue.use(require('vue-touch'))
  components:
    "scrollfire": require "../src/scrollfire.coffee"
  methods:
    entered: -> @toast text: "div entered view"
    enteredOffset: -> @toast text: "div entered view 200px before"
    enteredNegativOffset: -> @toast text: "div will enter view in 200px"
    enteredAfter: -> @toast text: "div entered view 2sec before"
</script>
