<template lang="pug">
.container
  .row
    input-field.s6(label="name")
      icon.prefix(name="fa-user",slot="icon")
    input-field.s6(label="password",type="password")
      icon.prefix(name="fa-key",slot="icon")
  .row
    input-field.s6(label="placeholder",placeholder="placeholder")
    input-field.s6(label="disabled",disabled)
  .row
    input-field.s6(label="readonly",readonly,value="readonly")
    input-field.s6(label="autofocus",autofocus)
  .row
    input-field.s6(label="valid",value="valid",v-bind:validate="isValid",data-success="valid")
    input-field.s6(label="invalid",value="invalid",v-bind:validate="isValid",data-error="invalid")
  .row
    input-field.s12(label="character-counter",length=10)

  input-field.s12(label="textarea with autosize",textarea)
  input-field.s12(label="placeholder",textarea,placeholder="placeholder")
  input-field.s12(label="prefilled",textarea,value="prefilled")
  input-field.s12(label="character-counter textarea",length=120,textarea)
  p
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/forms/input-field.vue") source
</template>

<script lang="coffee">
module.exports =
  components:
    "icon" : require "../../src/icon.coffee"
    "input-field": require "../../src/input-field.vue"
  methods:
    isValid: (value) ->
      return true if value == "valid"
      return false if value == "invalid"
      return null

</script>
