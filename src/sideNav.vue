// out: ..
<template lang="jade">
ul.side-nav(
  style="{{width}}{{left}}{{right}}"
  v-class="right-aligned: rightAligned,fixed: fixed"
  )
  content No content
</template>

<script lang="coffee">

Vue = require('vue')
overlay = new Vue(require('./sideNav-overlay'))
dragTarget = new Vue(require('./sideNav-dragTarget')).$appendTo('body')
Velocity = require("velocity-animate")
module.exports =
  mixins:[
    require("vue-mixins/left")
    require("vue-mixins/right")
    require("vue-mixins/width")
    require("vue-mixins/onResize")
    require("vue-mixins/setCss")
  ]
  props:
    "menu-width":
      type: Number
      default: 240
    "edge":
      type: String
      default: "left"
    "close-on-click":
      type: Boolean
      default: false
    "fixed":
      type: Boolean
      default: false
  data: ->
    rightAligned: false
    menuOut: false
    panning: false
  methods:
    show: ->
      @menuOut = true
      @setCss document.body, "overflow", "hidden"
      dragTarget.$appendTo('body')
      if @edge == 'left'
        dragTarget.setWidth "50%"
        dragTarget.setRight 0
        dragTarget.setLeft undefined
        Velocity @$el, {left: 0},
          {duration: 300, queue: false, easing: 'easeOutQuad'}
      else
        dragTarget.setWidth "50%"
        dragTarget.setRight undefined
        dragTarget.setLeft 0
        Velocity @$el, {right: 0},
          {duration: 300, queue: false, easing: 'easeOutQuad'}
        @.setLeft undefined
      overlay.setOpacity 0
      overlay.$once "click", =>
        @hide()
        Velocity overlay.$el, {opacity: 0},
          {
            duration: 300
            queue: false
            easing: 'easeOutQuad'
            complete: ->
              overlay.$remove()
          }
      overlay.$appendTo('body')
      Velocity overlay.$el, {opacity: 1},
        {
          duration: 300
          queue: false
          easing: 'easeOutQuad'
          complete: =>
            @menuOut = true
            @panning = false
        }
    hide: (restoreNav) ->
      @panning = false
      @menuOut = false
      @setCss document.body, "overflow"
      Velocity overlay.$el, {opacity: 0},
        {
          duration: 200
          queue: false
          easing: 'easeOutQuad'
          complete: -> overlay.$remove()
        }
      if @edge == 'left'
        dragTarget.setWidth undefined
        dragTarget.setRight undefined
        dragTarget.setLeft 0
        Velocity @$el, {left: -1 * (@menuWidth + 10)},
          {
            duration: 200,
            queue: false,
            easing: 'easeOutCubic',
            complete: ->
              if restoreNav
                @setRight undefined
                @setLeft undefined
                @setWidth @menuWidth
          }
      else
        dragTarget.setWidth undefined
        dragTarget.setRight 0
        dragTarget.setLeft undefined
        Velocity @$el, {right: -1 * (@menuWidth + 10)},
          {
            duration: 200,
            queue: false,
            easing: 'easeOutCubic',
            complete: ->
              if restoreNav
                @setRight undefined
                @setLeft undefined
                @setWidth @menuWidth
          }
    toggle: ->
      if @menuOut
        @hide()
      else
        @show()

  compiled: ->
    @setWidth @menuWidth
    dragTarget.$on "click", @hide
    if @edge == "left"
      @setLeft -1 * (@menuWidth + 10)
      dragTarget.setLeft 0
    else
      @rightAligned = true
      @setRight -1 * (@menuWidth + 10)
      @setLeft ""
      dragTarget.setRight 0
    if @fixed
      if window.innerWidth > 992
        @setLeft undefined
      @addResizeCb =>
        console.log "test"
        if window.innerWidth > 992
          if overlay.opacity != 0 && @menuOut
            @hide(true)
          else
            @setRight undefined
            @setLeft undefined
            @setWidth @menuWidth
        else unless @menuOut
          if @edge == 'left'
            @setLeft -1 * (@menuWidth + 10)
          else
            @setRight -1 * (@menuWidth + 10)
    #if @closeOnClick
      # menu_id.on("click.itemclick", "a:not(.collapsible-header)", function(){
      #   removeMenu();
      # });
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
  z-index: 999;
  overflow-y: auto;

  @extend .z-depth-1;
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
    &:hover, &.active { background-color: #ddd; }
  }
  a {
    color: #444;
    display: block;
    font-size: 1rem;
    height: 64px;
    line-height: 64px;
  }
}

// Hidden side-nav for all sizes
.side-nav.fixed {
  a {
    display: block;
    color: #444;
  }
}

// Fixed side-nav shown
.side-nav.fixed {
  left: 0;
  position: fixed;

  // Right Align
  &.right-aligned {
    right: 0;
    left: auto;
  }
}
</style>
