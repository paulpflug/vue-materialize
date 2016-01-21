// out: ..
<template lang="jade">
.resizer(
  v-bind:style="style"
  @mousedown="dragStart"
  @dblclick="resetSize"
  )
</template>

<script lang="coffee">

module.exports =
  mixins:[
    require("vue-mixins/onDocument")
  ]
  props:
    "offset":
      type: Number
      default: 0
    "size":
      type: Number
      default: 10
    "minSize":
      type: Number
      default: 0
    "contentSize":
      type: Number
      default: -1
    "maxSize":
      type: Number
      default: Number.MAX_VALUE
    "side":
      type: String
      required: true
    "parentSize":
      type: String
      required: true
  data: ->
    startPos: 0
    startSize: 0
    removeMoveListener: null
    removeEndListener: null
    horizontal: true
    plus: true
    minSizeNumber: 0
    contentSizeNumber: -1
    style:
      position: "absolute"
      width:null
      height:null
      top:null
      left:null
      right:null
      bottom:null
      cursor: "auto"
  methods:
    updateMinSize: ->
      if parseInt(@parentSize.replace("px",""),10) < @minSize
        @parentSize = @minSize + "px"
    updateMaxSize: ->
      if parseInt(@parentSize.replace("px",""),10) > @maxSize
        @parentSize = @maxSize + "px"
    resetSize: ->
      if @contentSize > -1
        @parentSize = @contentSize + "px"
    dragStart: (e) ->
      document.selection?.empty()
      window.getSelection?().removeAllRanges()
      @startSize = parseInt(@parentSize.replace("px",""),10)
      if @horizontal
        @startPos = e.clientX
      else
        @startPos = e.clientY
      document.body.style.cursor = @style.cursor
      @removeMoveListener = @onDocument("mousemove",@drag)
      @removeEndListener = @onceDocument("mouseup",@dragEnd)
    drag: (e) ->
      if @horizontal
        pos = e.clientX
      else
        pos = e.clientY
      moved = pos - @startPos
      unless @plus
        moved = -moved
      newSize = @startSize + moved
      if newSize < @minSize
        newSize = @minSize
      else if newSize > @maxSize
          newSize = @maxSize
      @parentSize = newSize + "px"
      e.preventDefault()
    dragEnd: ->
      document.body.style.cursor = null
      @removeMoveListener?()
      @removeEndListener?()
      true
    setStyle: ->
      switch @side
        when "top", "bottom"
          @horizontal = false
        when "left", "right"
          @horizontal = true
      switch @side
        when "top", "left"
          @plus = false
        when "right", "bottom"
          @plus = true
      @style.right = null
      @style.bottom = null
      if @horizontal
        @style.width = @size+"px"
        @style.height = "100%"
        @style.top = "0"
        @style.left = null
        @style.cursor = "ew-resize"
      else
        @style.width = "100%"
        @style.height = @size+"px"
        @style.top = null
        @style.left = "0"
        @style.cursor = "ns-resize"
      @style[@side]= -@offset+"px"
  compiled: -> @setStyle()
  watch:
    "minSize": "updateMinSize"
    "maxSize": "updateMaxSize"
    "side": "setStyle"
</script>
