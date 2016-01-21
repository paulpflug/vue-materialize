// out: ..
<template lang="jade">
ul.side-nav(
  v-el:nav
  @click="click"
  v-bind:style="style"
  v-bind:class="{right-aligned: rightAligned,fixed: fixed}"
  )
  //resizer(
    v-if="resize"
    side="{{otherEdge()}}"
    parent-size-style="{{@style.width}}"
    min-size="{{minWidth}}"
    content-size="{{contentWidth}}"
    offset="5")
  slot No content
</template>

<script lang="coffee">
overlay = null
dragTarget = null
Velocity = require("velocity-animate")
module.exports =
  created: ->
    overlay = require('./overlay')(@$root.constructor)
    dragTarget = require('./drag-target')(@$root.constructor)
  #components:
  #  "resizer": require "./resizer"
  mixins:[
    require("vue-mixins/onWindowResize")
    require("vue-mixins/onClick")
    require("vue-mixins/setCss")
  ]
  props:
    #"resize":
    #  type: Boolean
    #  default: false
    "menuWidth":
      type: Number
      default: 240
    #"minWidth":
    #  type: Number
    #  default: -1
    "edge":
      type: String
      default: "left"
    "closeOnClick":
      type: Boolean
      default: true
    "fixed":
      type: Boolean
      default: false
  data: ->
  #  contentWidth: -1
    style:
      width: @menuWidth+"px"
      left: 0
      right: undefined
    rightAligned: false
    menuOut: false
    panning: false
    veloOpts: {duration: 300, queue: false, easing: 'easeOutQuad'}
    removeOverlayOnClick: null
  methods:
    otherEdge: ->
      if @edge == "left"
        return "right"
      else
        return "left"
    setFixed: ->
      @style.width = @menuWidth + "px"
      @style.right = undefined
      @style.left = undefined
    show: ->
      if @edge == 'left'
        Velocity @$el, {left: 0}, @veloOpts
        @style.right = undefined
      else
        Velocity @$el, {right: 0}, @veloOpts
        @style.left = undefined
    hide: (animate) ->
      if animate
        if @edge == 'left'
          Velocity @$el, {left: -1 * (@menuWidth + 10)}, @veloOpts
        else
          Velocity @$el, {right: -1 * (@menuWidth + 10)}, @veloOpts
      else
        if @edge == 'left'
          @style.left =  -1 * (@menuWidth + 10) + "px"
          @style.right = undefined
        else
          @style.left = undefined
          @style.right = -1 * (@menuWidth + 10) + "px"
    open: ->
      return if @menuOut
      @menuOut = true
      @setCss document.body, "overflow", "hidden"
      dragTarget.$appendTo('body')
      dragTarget.open(@edge)
      @show()
      @removeOverlayOnClick = overlay.addToClickStack =>
        @close()
        overlay.close()
      overlay.style["z-index"] = 994
      overlay.open =>
        @panning = false

    close: (restoreNav) ->
      return unless @menuOut
      @panning = false
      @menuOut = false
      @setCss document.body, "overflow"
      overlay.close()
      @removeOverlayOnClick?()
      dragTarget.close(@edge)
      if restoreNav == true
        @setFixed()
      else
        @hide(true)
    toggle: ->
      if @menuOut
        @close()
      else
        @open()

  compiled: ->
    @style.width = @menuWidth + "px"
    dragTarget.onClick = => @close()
    dragTarget.close(@edge)
    @hide(false)
    if @fixed
      if window.innerWidth > 992
        @style.left = undefined
      @addResizeCb =>
        if window.innerWidth > 992
          if overlay.opacity != 0 && @menuOut
            @close(true)
          else
            @setFixed()
        else unless @menuOut
          @hide(false)
    @onClick = (e) ->
      if (@closeOnClick && (e.target.parentElement == @$el or
          e.target.parentElement.parentElement == @$el or
          e.target.parentElement.parentElement.parentElement == @$el))
        @close()
  #attached: ->
  #  if @minWidth <0
  #    @minWidth = @$$.nav.offsetWidth+4
  #  if @contentWidth <0
  #    @contentWidth = @$$.nav.offsetWidth+8

</script>
<style lang="scss">

.side-nav {
  position: fixed;
  width: 240px;
  left: -105%;
  top: 0;
  margin: 0;
  height: 100%;
  height: calc(100% + 60px);
  height: -moz-calc(100%);
  padding-bottom: 60px;
  z-index: 995;
  overflow-y: auto;
  will-change: left;

  // Right Align
  &.right-aligned {
    will-change: right;
    right: -105%;
    left: auto;
  }

  .collapsible{
    margin: 0;
  }


  li {
    float: none;
    &:not(.no-hover){
      &:hover, &.active { background-color: #ddd; }
    }
  }
  a {
    color: #444;
    display: block;
    font-size: 1rem;
    height: 64px;
    line-height: 64px;
  }
}
// Fixed side-nav shown
.side-nav.fixed {
  left: 0;
  position: fixed;
  overflow-y: hidden;
  &:hover {
    overflow-y: auto;
  }
  // Hidden side-nav for all sizes
  a {
    display: block;
    color: #444;
  }
  // Right Align
  &.right-aligned {
    right: 0;
    left: auto;
  }
}
</style>
