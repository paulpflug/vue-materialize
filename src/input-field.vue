// out: ..
<template lang="jade">
div(
  v-bind:class="textarea?['row']:computedClass")
  slot(name="icon")
  input(
    v-el:input
    v-if="!textarea"
    v-bind:class="inputClass"
    v-bind:style="inputStyle"
    v-bind:type="type"
    v-bind:disabled="disabled"
    v-bind:readonly="readonly"
    v-bind:autofocus="autofocus"
    v-bind:placeholder="placeholder"
    v-model="value"
    @focus="onInputFocus"
    @blur="onInputBlur"
    @keyup.enter="onConfirmTrigger"
    )
  label(
    v-if="label && !textarea"
    style="pointer-events: none"
    v-bind:class="{active: isActive}"
    v-bind:data-error="dataError"
    v-bind:data-success="dataSuccess"
  ) {{label}}
  span.character-counter(
    v-if="length > 0 && !textarea"
    style="float:right;font-size:12px;height:0px"
    ) {{lengthString}}
  text-area(
    v-ref:input
    v-if="textarea"
    v-bind:class="computedClass"
    v-bind:taclass="inputClass"
    v-bind:style="inputStyle"
    v-bind:type="type"
    v-bind:readonly="readonly"
    v-bind:disabled="disabled"
    v-bind:autofocus="autofocus"
    v-bind:value="value"
    no-extra-line
    @input="onInput"
    @focus="onInputFocus"
    @blur="onInputBlur"
    @keyup.enter="onConfirmTrigger"
    )
    span(
      slot="placeholder"
      v-if="placeholder"
      ) {{placeholder}}
    label(
      slot="label"
      v-if="label"
      style="pointer-events: none"
      v-bind:class="{active: isActive}"
      v-bind:data-error="dataError"
      v-bind:data-success="dataSuccess"
      ) {{label}}
    span.character-counter(
      slot="label"
      v-if="length > 0"
      style="float:right;font-size:12px;height:0px"
      ) {{lengthString}}
</template>

<script lang="coffee">
module.exports =
  components:
    "text-area": require("vue-textarea")
  mixins: [
    require("vue-mixins/class")
  ]
  props:
    class:
      default: -> []
    "placeholder":
      type: String
      default: ""
    "readonly":
      type: Boolean
    "autofocus":
      type: Boolean
    "textarea":
      type: Boolean
    "type":
      type: String
    "disabled":
      type: Boolean
    "validate":
      type: Function
      default: -> return null
    "dataError":
      type: String
      default: ""
    "dataSuccess":
      type: String
      default: ""
    "label":
      type: String
      default: ""
    "value":
      type: String
      default: ""
    "length":
      type: Number
      default: 0
  data: ->
    isFocused: false
    isActive: false
    isValid: null

  computed:
    mergeClass: ->
      return {
        "input-field": true
        col: true
      }
    inputClass: ->
      return {
        validate: @dataError or @dataSuccess
        invalid: @isValid? and not @isValid
        valid: @isValid? and @isValid
        "materialize-textarea": @textarea
      }
    lengthString: ->
      if @isFocused
        return @value.length + " / "+ @length
      return ""
  methods:
    onInput: (val) ->
      @value = val
    setValid:  ->
      @isValid = true
      @$emit "valid", @value
    setInvalid: ->
      @isValid = false
      @$emit "invalid", @value
    setActive: ->
      @isActive = true
    setInactive: ->
      @isActive = false
    setFocused: ->
      @isFocused = true
      for child in @$el.children
        if child.nodeName == "I"
          if child.classList
            child.classList.add("active")
          else
            child.className += " active"
    setUnfocused: ->
      @isFocused = false
      for child in @$el.children
        if child.nodeName == "I"
          child.className = child.className.replace( " active", "" )
    checkValidity: ->
      if @value
        result = @validate(@value)
        if result?
          if result.then?
            result
            .then @setValid
            .catch @setInvalid
          else
            if result
              @setValid()
            else
              @setInvalid()
        else if @length and @value.length > @length
          @isValid = false
        else
          @isValid = null
      else
        unless @isFocused || @placeholder
          @setInactive()
        @isValid = null
    focus: ->
      @$els.input?.focus()
      @$refs.input?.focus()
    blur: ->
      @$els.input?.blur()
      @$refs.input?.blur()
    onInputFocus: ->
      @setActive()
      unless @readonly
        @setFocused()
      @$emit "focus"
    onInputBlur: ->
      @setUnfocused()
      unless @value || @placeholder
        @setInactive()
      @$emit "blur"
    onChangeTrigger: ->
      @$emit "change", arguments
      @checkValidity()
    onConfirmTrigger: ->
      unless @isInvalid
        @$emit "confirm"
  watch:
    "value": "onChangeTrigger"
  ready: ->
    @checkValidity() if @value
    if @autofocus or @value or @placeholder
      @setActive()
      unless @readonly or @placeholder
        @setFocused()

</script>
