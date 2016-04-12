// out: ..
<template lang="jade">
.switch
  label
    slot(name="off") Off
    input(type="checkbox",v-model="on",:disabled="disabled")
    span.lever
    slot(name="on")
</template>

<script lang="coffee">
module.exports =
  props:
    disabled:
      type: Boolean
      default: false
    isOn:
      type: Boolean
      default: false
  data: -> on: @isOn
  watch:
    on: -> @toggle() if @on != @isOn
    isOn: (val) -> @on = val
  methods:
    toggle: ->
      if @isOn
        @$emit("off")
      else
        @$emit("on")
      @$emit("toggle")
      @isOn = !@isOn
</script>
