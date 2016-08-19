<template lang="jade">
.container
  br
  switch(@on="onOn" @off="onOff" @toggle="onToggle")
  p disabled:
  switch(disabled)
  p Open console for events
  br
  a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/forms/switch.vue") source


</template>

<script lang="coffee">
require("../materialize.config.scss")
module.exports =
  components:
    "switch" : require "../../src/switch.coffee"
  methods:
    onOn: ->
      console.log "isOn"
    onOff: ->
      console.log "isOff"
    onToggle: ->
      console.log "isToggled"
</script>
