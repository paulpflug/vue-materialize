<template lang="jade">
.container(style="height:1500px;padding-left:200px;padding-top:50px")
  a(href="https://github.com/vue-comps/vue-comps-scrollspy/blob/master/dev/basic.vue") source
  p scroll down, will only fire once. Reload to reset
  div(style="margin-top:800px;width:200px;height:200px;background-color:blue") div
    scrollfire(@entered="entered")
    scrollfire(@entered="enteredOffset",:offset=200)
    scrollfire(@entered="enteredNegativOffset",:offset=-200)
    scrollfire(@entered="enteredAfter",:after=2000)
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/getVue")
    require("../src/toaster.coffee")
  ]
  beforeCompile: ->
    Vue = @getVue()
    Vue.use(require('vue-touch'))
  components:
    "scrollfire": require "../src/scrollfire.coffee"
  methods:
    entered: -> @toast text: "div entered view"
    enteredOffset: -> @toast text: "div entered view 200px before"
    enteredNegativOffset: -> @toast text: "div will enter view in 200px"
    enteredAfter: -> @toast text: "div entered view 2sec before"
</script>
