<template lang="jade">
.container
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/waves.vue") source
  waves
    button.btn black ripple
  waves(color="blue",style="margin-left:20px")
    button.btn blue ripple
  waves(color="white",style="margin-left:20px")
    button.btn white ripple

</template>

<script lang="coffee">
require("./materialize.config.scss")
module.exports =
  mixins:[
    require("vue-mixins/getVue")
  ]
  beforeCompile: ->
    Vue = @getVue()
    Vue.use(require('vue-touch'))
  components:
    "waves" : require "../src/waves.coffee"

</script>
