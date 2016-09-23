<template lang="pug">
.container
  .row
    .input-field.col.s12.m10.l8
      simple-select(:value="value",placeholder="placeholder")
        s-option(value="1") option 1
        s-option(value="2") option 2
      label Pre-selected
    .input-field.col.s12.m10.l8
      simple-select(always-modal,placeholder="placeholder")
        s-option(value="1") option 1
        s-option(value="2") option 2
      label Opens always as a modal
    .input-field.col.s12.m10.l8
      simple-select(multiple,placeholder="placeholder")
        s-option(value="1") option 1
        s-option(value="2") option 2
      label Multiple
    .input-field.col.s12.m10.l8
      simple-select(disabled,placeholder="placeholder")
        s-option(value="1") option 1
        s-option(value="2") option 2
      label Disabled
    .input-field.col.s12.m10.l8
      simple-select(placeholder="placeholder")
        li.optgroup
          span group 1
        s-option.optgroup-option(value="1") option 1
        li.optgroup
          span group 2
        s-option.optgroup-option(value="2") option 2
      label Groups
    .input-field.col.s12.m10.l8
      simple-select(placeholder="placeholder")
        s-option(value="1") option 1
          img.circle(src="http://materializecss.com/images/sample-1.jpg" slot="img")
        s-option(value="2") option 2
          img.circle.left(src="http://materializecss.com/images/sample-1.jpg" slot="img")
      label Images
    .input-field.col.s12.m10.l8
      simple-select(placeholder="placeholder" @before-enter="reset")
        li
          input-field(type="search" v-bind:value.sync="search" v-ref:search @keyup="onKeyup" @input="onInput")
            icon(slot="iconafter" name="material-close" @click="reset")
            icon(slot="label" name="material-search")
        s-option(:value="opt" v-for="opt in foundData" track-by="$index")
      label with search
  .row
    a(href="https://github.com/paulpflug/vue-materialize/blob/master/dev/forms/select.vue") source
</template>

<script lang="coffee">
module.exports =
  components:
    "simple-select" : require "../../src/select"
    "s-option" : require "../../src/select-option"
    "input-field": require "../../src/input-field"
    "icon": require "../../src/icon"
  computed:
    foundData: ->
      return @searchData unless @search
      for d in @searchData
        if @search == d
          return [d]
      return []
  data: ->
    search: ""
    searchData: ["a","b","c","d","e"]
    value: "1"
    Number: Number
  methods:
    reset: ->
      @search = ""
      @$refs.search.focus()
    onKeyup: (e) ->
      keys = [9,13,27,38,40]
      e.preventDefault() if keys.indexOf(e.which) == -1
    onInput: ->
      @$refs.search.$parent.selectFirst()
</script>
