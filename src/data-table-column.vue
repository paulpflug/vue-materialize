// out: ..
<template lang="jade">
.data-table-column(
  v-el="column"
  v-style="style"
  )
  resizer(
    v-if="resize"
    side="{{resizeSide}}"
    parent-size="{{@style.width}}"
    min-size="{{minWidth}}"
    max-size="{{maxWidth}}"
    content-size="{{contentWidth}}"
    offset="5")
  span(v-el="label")
    content
</template>

<script lang="coffee">

module.exports =
  components:
    "resizer": require "./resizer"
  props:
    "field":
      type: String
      required: true
    "resize":
      type: Boolean
      default: true
    "pinned":
      type: Boolean
      default: false
    "width":
      type: Number
      default: 80
    "minWidth":
      type: Number
      default: -1
    "contentWidth":
      type: Number
      default: -1
    "maxWidth":
      type: Number
      default: Number.MAX_VALUE
    "cellRender":
      type: Object
      default: -> require "./data-table-cell-text"
    "cellOptions":
      type: Object
      default: -> {}
  data: ->
    resizeSide: "right"
    style:
      width: @width+"px"
    isDataTableColumn: true
    contentWidthSet: @contentWidth > -1
  methods:
    updateStyle: (width) ->
      @style.width = width+"px"
    processMinWidth: ->
      if @width < @minWidth
        @updateStyle(@minWidth)
        return true
    processMaxWidth: ->
      if @width > @maxWidth
        @updateStyle(@maxWidth)
        return true
    processWidth: ->
      unless processMinWidth() || processMaxWidth()
        @updateStyle(@width)
  attached: ->
    if @minWidth <0
      @minWidth = @$$.label.offsetWidth+4
    unless @contentWidthSet
      @contentWidth = @$$.label.offsetWidth+8
  watch:
    "width": "processWidth"
    "maxWidth": "processMaxWidth"
    "minWidth": "processMinWidth"
</script>
<style lang="stylus">
.data-table-column
  position: relative
  border-right: 1px solid black
  margin-right: 2px
  overflow:hidden
  white-space: nowrap
  display: inline-block
</style>
