<template lang="pug">

.container
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/toaster.vue") source
  button.btn(@click="normaltoast") Toast
  br
  br
  button.btn(@click="roundedtoast") Rounded toast

  p drag toasts to dismiss
  p hover toast to keep it open

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
  methods:
    normaltoast: ->
      @toast text:"I am toast"
    roundedtoast: ->
      @toast text:"I am round toast", classes: ["toast","rounded"]
</script>
