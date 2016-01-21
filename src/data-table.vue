// out: ..
<template lang="jade">
.dt-main(
  v-style="style"
  v-class="size-spy-sibling: sizeSpy"
  )
  .dt-header(v-el="header")
    .dt-pinned(v-el="pinned")
    .dt-unpinned(v-el="unpinned" v-style="flexHeaderStyle")
      content No columns
  clusterize(
    rows-builder="{{rowsBuilderPinned}}"
    data="{{data}}"
    data-getter="{{dataGetter}}"
    row-counter= "{{rowCounter}}"
    auto-start="false"
    scroll-bars="{{noScrollBars}}"
    v-ref="clusterizePinned"
    height="{{pinnedContentHeight}}"
    )
  clusterize(
    rows-builder="{{rowsBuilderUnpinned}}"
    data="{{data}}"
    data-getter="{{dataGetter}}"
    row-counter= "{{rowCounter}}"
    auto-start="false"
    v-ref="clusterizeUnpinned"
    height="{{flexContent.height}}"
    width="{{flexContent.width}}"
    max-width="{{flexContent['max-width']}}"
    )
</template>

<script lang="coffee">
Vue = require('vue')
module.exports =
  components:
    "clusterize": require "./clusterize"
  props:
    "height":
      type: Number
      default: -1
    "width":
      type: Number
      default: -1
    "maxWidth":
      type: Number
      default: -1
    "sizeSpy":
      type: Object
    "find":
      type: Function
    "count":
      type: Function
    "data":
      type: Array
      default: -> []
    "columns":
      type: Array
      default: -> []
  data: ->
    noScrollBars:
      x: false
      y: false
    style:
      height: null
      width: null
      "max-width": null
    pinnedContentHeight: -1
    flexContent:
      height: -1
      width: -1
      "max-width": -1
    flexHeaderStyle:
      width: null
      "max-width": null
    pinnedColumns: []
    columnsWidthWatcher: []
    unpinnedColumns: []
    fields: ""
    filter: {}
    getter: null
  methods:
    dataGetter: (start, end) ->
      #console.log "skip: #{start}, limit #{end-start}"
      @getter = @find @filter, @fields, skip: start,limit: end-start
        .then (data) ->
          data[start...end]

    rowCounter: ->
      @count @filter
    getColumns: ->
      columns = []
      for child in @$children
        if child.isDataTableColumn
          columns.push child
      @columns = columns
    processColumns: ->
      for unwatch in @columnsWidthWatcher
        unwatch()
      pinned = []
      unpinned = []
      @fields = ""
      for column in @columns
        @fields += column.field+ " "
        if column.pinned
          pinned.push column
          if @maxWidth || @sizeSpy || @width
            @columnsWidthWatcher.push column.$watch "style.width", =>
              @processWidth()
              @processMaxWidth()
          column.$appendTo(@$$.pinned)
        else
          unpinned.push column
          if @maxWidth || @sizeSpy
            @columnsWidthWatcher.push column.$watch "style.width", =>
              @updateFlexMaxWidth()
          column.$appendTo(@$$.unpinned)
      @pinnedColumns = pinned
      @unpinnedColumns = unpinned
    rowsBuilderPinned: (count) ->
      @rowsBuilder(count,@pinnedColumns)
    rowsBuilderUnpinned: (count) ->
      @rowsBuilder(count,@unpinnedColumns)
    rowsBuilder: (count,columns) ->
      rows = []
      for j in [1..count]
        row = new Vue(require "./data-table-row")
        row.columns = columns
        rows.push row
      return rows
    processHeight: (height) ->
      @style.height = height+"px"
      @flexContent.height = height-@$$.header.offsetHeight
      @updatePinnedContentHeight()
    updatePinnedContentHeight: (scrollBarSize) ->
      unless scrollBarSize?
        scrollBarSize = @$.clusterizeUnpinned.scrollBarSize.height
      @pinnedContentHeight = @flexContent.height - scrollBarSize

    processWidth: (width=@width) ->
      if width
        for column in @columns
          column.maxWidth = width / 2
        @style.width = width + "px"
        @flexContent.width = width - @$$.pinned.offsetWidth
        @updateFlexHeaderWidth()
    updateFlexHeaderWidth: (scrollBarSize) ->
      width = @flexContent.width
      width ?= @$.clusterizeUnpinned.$el.offsetWidth
      unless scrollBarSize?
        scrollBarSize = @$.clusterizeUnpinned.scrollBarSize.width
      @flexHeaderStyle.width =  width - scrollBarSize + "px"
    processMaxWidth: (width=@maxWidth) ->
      if width
        @maxWidth = @sizeSpy.width
        for column in @columns
          column.maxWidth = width / 2
        @style["max-width"] = width+"px"
        flexWidth = width - @$$.pinned.offsetWidth
        @flexContent["max-width"] = flexWidth
        @flexHeaderStyle["max-width"] = flexWidth + "px"
        @updateFlexMaxWidth()
    updateFlexMaxWidth: (scrollBarSize) ->
      if @maxWidth
        unless scrollBarSize?
          scrollBarSize = @$.clusterizeUnpinned.scrollBarSize.width
        if scrollBarSize
          if @maxWidth == @$el.offsetWidth
            @flexHeaderStyle.width = @flexContent["max-width"] - scrollBarSize + "px"
          else
            @flexContent.width = @$$.unpinned.offsetWidth + scrollBarSize
        else
          @flexHeaderStyle.width = null
          @flexContent.width = -1
  ready: ->
    @getColumns()
    if @sizeSpy?
      @height = @sizeSpy.height
      @sizeSpy.$watch "height", @processHeight
      @maxWidth = @sizeSpy.width
      @sizeSpy.$watch "width", @processMaxWidth
      @$.clusterizeUnpinned.$watch "scrollBarSize.width", @updateFlexMaxWidth, immediate: true
    else
      @processHeight @height if @height
      @processWidth @width if @width
      @processMaxWidth @maxWidth if @maxWidth
      @$.clusterizeUnpinned.$watch "scrollBarSize.width", @updateFlexHeaderWidth, immediate: true
    @$nextTick =>
      @$.clusterizePinned.start()
      @$.clusterizeUnpinned.start()
    @$.clusterizeUnpinned.$watch "scrollBarSize.height", @updatePinnedContentHeight
    @$.clusterizeUnpinned.$watch "scrollPosition.left", (left) =>
      @$$.unpinned.scrollLeft = left
    @$.clusterizeUnpinned.$watch "scrollPosition.top", (top) =>
      @$.clusterizePinned.scrollPosition.top = top
  watch:
    "columns":"processColumns"
    "width": "processWidth"
    "height": "processHeight"
    "maxWidth": "processMaxWidth"
</script>
<style lang="stylus">
.dt-main,
.dt-main div
  overflow: hidden
  margin: 0
  padding: 0
  white-space: nowrap
.dt-main,
.dt-main>.dt-content
  height: 100%
.dt-main
  .dt-pinned,
  .dt-unpinned
    display: inline-block
    line-height 1
.dt-header
  line-height 0
  border-bottom 1px solid black


</style>
