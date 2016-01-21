// out: ..
<template lang="jade">
div.input-field(
  v-bind:class="{active: isActive,focus: isFocused,disabled: disabled,readonly: readonly,valid: isValid,invalid: isInvalid}")
  i(
    v-if="icon"
    v-bind:class="icon")
  input(
    v-el:input
    v-if="type!='textarea'"
    v-bind:style="inputStyle"
    v-bind:type="type"
    v-bind:id="inputId"
    v-bind:disabled="disabled"
    v-bind:autofocus="autofocus"
    v-bind:placeholder="placeholder"
    v-bind:debounce="debounce"
    v-model="value"
    @focus="onInputFocus"
    @blur="onInputBlur"
    @keyup.enter="onConfirmTrigger"
    )
  textarea(
    v-el:input
    v-if="type=='textarea'"
    v-bind:style="inputStyle"
    v-bind:type="type"
    v-bind:id="inputId"
    v-bind:disabled="disabled"
    v-bind:autofocus="autofocus"
    v-bind:placeholder="placeholder"
    v-bind:debounce="debounce"
    v-model="value"
    @focus="onInputFocus"
    @blur="onInputBlur"
    @keyup.enter="onConfirmTrigger"
    )
  label(
    v-if="label"
    v-bind:for="inputId"
    v-bind:data-error="dataError"
    v-bind:data-success="dataSuccess"
  ) {{label}}
</template>

<script lang="coffee">
module.exports =
  props:
    "debounce":
      type: Number
      default: 50
    "placeholder":
      type: String
      default: ""
    "readonly":
      coerce: (val) ->
        if val == "true" or val == true
          return true
        return false
      default: false
    "autofocus":
      coerce: (val) ->
        if val == "true" or val == true
          return true
        return false
      default: false
    "inputId":
      type: String
    "type":
      type: String
      default: "text"
    "disabled":
      coerce: (val) ->
        if val == "true" or val == true
          return true
        return false
      default: false
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
    "icon":
      type: String
      default: ""
  data: ->
    isFocused: false
    isActive: false
    isValid: false
    isInvalid: false
  methods:
    setValid:  ->
      @isValid = true
      @isInvalid = false
      @$dispatch "valid", @value
    setInvalid: ->
      @isValid = false
      @isInvalid = true
      @$dispatch "invalid", @value
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
        else
          @isValid = false
          @isInvalid = false
      else
        unless @isFocused || @placeholder
          @isActive = false
        @isValid = false
        @isInvalid = false
    focus: ->
      @$els.input.focus()
    blur: ->
      @$els.input.blur()
    onInputFocus: ->
      @isActive = true
      unless @readonly
        @isFocused = true
      @$dispatch "focus"
    onInputBlur: ->
      @isFocused = false
      unless @value || @placeholder
        @isActive = false
      @$dispatch "blur"
    onChangeTrigger: ->
      @$dispatch "change", arguments
      @checkValidity()
    onConfirmTrigger: ->
      unless @isInvalid
        @$dispatch "confirm"
  watch:
    "value": "onChangeTrigger"
  compiled: ->
    if @autofocus or @value or @placeholder
      @isActive = true
      unless @readonly or @placeholder
        @isFocused = true

</script>
<style lang="sass">
.input-field {
  position: relative;
  margin-top: 1rem;
  &>input,
  &>textarea{
    background-color: transparent;

    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 1rem;
    margin: 0 0 15px 0;
    padding: 0;
    box-shadow: none;
    transition: all .3s;
  }
  &>textarea {
    overflow-y: hidden; /* prevents scroll bar flash */
    padding: 1.6rem 0; /* prevents text jump on Enter keypress */
    resize: none;
    min-height: 3rem;
  }
  &.valid > label:after,
  &.valid > input:focus + label:after,
  &.valid>textarea:focus + label:after {
    content: attr(data-success);
    opacity: 1;
  }
  &.invalid > label:after,
  &.invalid > input:focus + label:after,
  &.invalid>textarea:focus + label:after {
    content: attr(data-error);
    opacity: 1;
  }
  &>label {
    position: absolute;

    top: 0.8rem;
    font-size: 1rem;
    cursor: text;
  }
  &>label:after {
    display: block;
    content: "";
    position: absolute;
    top: 65px;
    opacity: 0;
    transition: .2s opacity ease-out, .2s color ease-out;
  }
  &>i {
    position: absolute;
    height: 3rem;
    font-size: 2.5rem;
    padding-top: 0.5rem;
  }
  &>i ~ input,
  &>i ~ textarea {
    margin-left: 3rem;
    width: 92%;
    width: calc(100% - 3rem);
  }
  &>i ~ textarea { padding-top: .8rem; }
  &>i ~ label { margin-left: 3rem; }
}

// For textarea autoresize
.hiddendiv {
  display: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word; /* future version of deprecated 'word-wrap' */
  padding-top: 1.2rem; /* prevents text jump on Enter keypress */
}

</style>
