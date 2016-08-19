# out: ../switch.js

toggle = require "vue-toggle"
t =
  template: """
    <div :class='computedClass'>
      <label>
        <slot name='off'>Off</slot>
        <input type='checkbox' v-model='isOn' v-bind:disabled='disabled'>
        <span class='lever'></span>
        <slot name='on'>On</slot>
      </label>
    </div>
  """
  mixins: toggle.mixins
  props:
    onClass: toggle.props.onClass
    offClass: toggle.props.offClass
    isOn: toggle.props.isOn
    disabled:toggle.props.disabled
    class:
      default: "switch"
  computed: toggle.computed
  watch:
    isOn: (val) ->
      if val
        @$emit("on")
      else
        @$emit("off")
      @$emit("toggle")

module.exports = t
