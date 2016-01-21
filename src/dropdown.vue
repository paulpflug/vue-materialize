// out: ..
<template lang="jade">
ul.dropdown-content(v-bind:style="style")
  slot No content
</template>

<script lang="coffee">
Velocity = require("velocity-animate")
module.exports =
  mixins:[
    require("vue-mixins/getWindowSize")
    require("vue-mixins/onDocumentClick")
  ]
  props:
    "closeOnClick":
      type: Boolean
      default: true
    "inDuration":
      type: Number
      default: 300
    "outDuration":
      type: Number
      default: 225
    "constrainWidth":
      type: Boolean
      default: true
    "gutter":
      type: Number
      default: 0
    "belowOrigin":
      type: Boolean
      default: false
  data: ->
    closeOnClick: true
    dropdownOut: false
    removeDocumentClick: null
    style:
      display: "none"
      left: 0
      right: undefined
      top: 0
      width: undefined

  methods:
    show: (origin) ->
      return unless origin?
      return if @dropdownOut
      @style.display = undefined
      @$nextTick =>
        orgPos = origin.getBoundingClientRect()
        @dropdownOut = true
        if @constrainWidth
          width = origin.offsetWidth
          @style.width = width
        else
          width = @$el.clientWidth
          @style.width = undefined
        if @belowOrigin
          @style.top = orgPos.top+origin.clientHeight
        else
          @style.top =  orgPos.top
        windowSize = @getWindowSize()
        if orgPos.left + width > windowSize.width
          @style.right = windowSize.width-orgPos.right + @gutter
          @style.left = undefined
        else
          @style.right = undefined
          @style.left = orgPos.left + @gutter
        Velocity @$el, "stop"
        .then (el) ->
          Velocity el, "slideDown",
            {
              duration: @inDuration
              queue: false
              easing: 'easeOutCubic'
            }
          Velocity el, {opacity: 1},
            {
              duration: @inDuration
              queue: false
              easing: 'easeOutSine'
            }
        @removeDocumentClick = @onceDocumentClick (e) =>
          if (e.target != origin and e.target != @$el) and
              (@closeOnClick || (e.target.parentElement != @$el and
              e.target.parentElement.parentElement != @$el and
              e.target.parentElement.parentElement.parentElement != @$el))
            @hide()
            return true
          else
            return false

    hide: ->
      return unless @dropdownOut
      @dropdownOut = false
      @removeDocumentClick() if @removeDocumentClick
      Velocity @$el, {opacity: 0},
        {
          duration: @outDuration
          queue: false
          easing: 'easeOutSine'
          complete: => @style.display = "none"
        }
    open: (origin) ->
      @show(origin)
    close: ->
      @hide()
    toggle: (origin) ->
      if @dropdownOut
        @close()
      else
        @open(origin)
</script>
<style lang="scss">
.dropdown-content {
  margin: 0;
  min-width: 100px;
  max-height: 650px;
  overflow-y: auto;
  opacity: 0;
  position: absolute;
  z-index: 999;
  will-change: width, height;
  & > li {
    clear: both;
    cursor: pointer;
    line-height: 1.5rem;
    width: 100%;
    text-align: left;
    text-transform: none;
    & > a, & > span {
      font-size: 1.2rem;
      display: block;
      padding: 1rem 1rem;
    }
    & > a > i {
      height: inherit;
      line-height: inherit;
    }
  }
}
</style>
