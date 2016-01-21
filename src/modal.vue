// out: ..
<template lang="jade">
div.modal(
  v-bind:style="style"
  v-bind:class="{bottomSheet: bottomSheet}"
  )
  slot No content
</template>

<script lang="coffee">
overlay = null
Velocity = require("velocity-animate")
module.exports =
  created: ->
    overlay = require('./overlay')(@$root.constructor)
  props:
    "opacity":
      type: Number
      default: 0.5
    "inDuration":
      type: Number
      default: 350
    "outDuration":
      type: Number
      default: 250
    "dismissible":
      type: Boolean
      default: true
    "bottomSheet":
      type: Boolean
      default: false
  data: ->
    isOpened: false
    removeOverlayOnClick: null
    style:
      display: "none"
      bottom: undefined
      top: undefined
  methods:
    show: ->
      @$appendTo('body')
      if @bottomSheet
        Velocity @$el, {bottom: "0", opacity: 1}, {
          duration: @inDuration,
          queue: false,
          ease: "easeOutCubic",
          complete: => @$dispatch "show"}
      else
        Velocity @$el, { top: "10%", opacity: 1, scaleX: 1}, {
          duration: @inDuration,
          ease: "easeOutCubic",
          complete: => @$dispatch "show"}
    hide: ->
      newcb = =>
        @$dispatch "hide"
        @style.display = "none"
        @$remove()
      if @bottomSheet
        Velocity @$el, {bottom: "-100%", opacity: 0}, {
          duration: @outDuration,
          queue: false,
          ease: "easeOutCubic",
          complete: newcb}
      else
        Velocity @$el, { top: "4%", opacity: 0, scaleX: 0.7}, {
          duration: @outDuration,
          ease: "easeOutCubic",
          complete: newcb}
    open: ->
      return if @isOpened
      @isOpened = true
      @style.display = undefined
      overlay.open()
      overlay.style["z-index"] = 998
      @$dispatch "open"
      @show()
      if @dismissible
        @removeOverlayOnClick = overlay.addToClickStack @close
    close: ->
      @removeOverlayOnClick() if @removeOverlayOnClick?
      return unless @isOpened
      @isOpened = false
      overlay.close()
      @$dispatch "close"
      @hide()
  compiled: ->
    if @bottomSheet
      @style.bottom = "-100%"
    else
      @style.top = "4%"
      Velocity.hook(@$el, "scaleX", 0.7);
</script>
<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  right: 0;
  opacity: 0;
  background-color: #fafafa;
  padding: 0;
  max-height: 70%;
  width: 55%;
  margin: auto;
  overflow-y: auto;
  z-index: 999;
  border-radius: 2px;
  will-change: top, opacity;

  h1,h2,h3,h4 {
    margin-top: 0;
  }

  .modal-content {
    padding: 24px;
  }
  .modal-close {
    cursor: pointer;
  }

  .modal-footer {
    border-radius: 0 0 2px 2px;
    background-color: #fafafa;
    padding: 4px 6px;
    height: 56px;
    width: 100%;

    .btn, .btn-flat {
      float: right;
      margin: 6px 0;
    }
  }
}

// Modal with fixed action footer
.modal.modal-fixed-footer {
  padding: 0;
  height: 70%;

  .modal-content {
    position: absolute;
    height: calc(100% - 56px);
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .modal-footer {
    border-top: 1px solid rgba(0,0,0,.1);
    position: absolute;
    bottom: 0;
  }
}

// Modal Bottom Sheet Style
.modal.bottom-sheet {
  top: auto;
  bottom: -100%;
  margin: 0;
  width: 100%;
  max-height: 45%;
  border-radius: 0;
  will-change: bottom, opacity;
}


</style>
