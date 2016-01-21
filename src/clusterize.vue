// out: ..
<template lang="jade">
.clusterize(
  v-style="style"
  v-class="scroll-bar-x:scrollBars.x, scroll-bar-y:scrollBars.y"
  v-on="mouseenter:onHover,mouseleave:onHover,scroll:onScroll"
  )
  .clusterize-first-row(v-el="firstRow" v-style="firstRowStyle")
  clusterize-cluster(row-height="{{rowHeight}}")
  clusterize-cluster(row-height="{{rowHeight}}")
  clusterize-cluster(row-height="{{rowHeight}}")
  clusterize-cluster(row-height="{{rowHeight}}")
  .clusterize-last-row(v-el="lastRow" v-style="lastRowStyle")
</template>

<script lang="coffee">
Vue = require('vue')
module.exports =
  components:
    "clusterize-cluster": require "./clusterize-cluster"
  props:
    "width":
      type: Number
      default: -1
    "maxWidth":
      type: Number
      default: -1
    "height":
      type: Number
      default: -1
    "position":
      type: Number
      default: 0
    "scrollBars":
      type: Object
      default: -> x:true, y: true
    "rowsBuilder":
      type: Function
      required: true
    "autoStart":
      type: Boolean
      default: true
    "data":
      type: Array
      default: -> []
    "dataGetter":
      type: Function
      default: -> []
    "rowCounter":
      type: Function
      default: -> 0
    "scrollPosition":
      type: Object
      default: -> left: -1, top: -1
  data: ->
    style:
      width: null
      height: null
      "max-width": null
    firstRowStyle:
      height: null
    lastRowStyle:
      height: null
    rowCount: @data.length
    rowHeight: -1
    rows: []
    rowsCount: -1
    clustersCount: -1
    clusterHeight: null
    clusterSize: 25
    clusters: []
    clustersBelow: 3
    clusterVisible: 0
    clusterVisibleLast: -1
    minHeight: null
    scrollBarSize:
      height: 0
      width: 0
  methods:
    getRows: (count) ->
      if @rows.length >= count
        return @rows[0...count]
      else
        for row in @rowsBuilder(count-@rows.length)
          @rows.push row
        return @rows
    calcRowHeight: (dataSet,cb) ->
      @clusters[0].rows = @getRows(1)
      @$nextTick =>
        @clusters[0].rows[0].render dataSet
        @$nextTick =>
          @rowHeight = @clusters[0].rows[0].$el.offsetHeight
          @calcClusterSize()
          cb()
    calcClusterSize: ->
      @clusterSize = Math.ceil(@$el.offsetHeight/@rowHeight)
      if @rowsCount
        @clustersCount = Math.ceil(@rowsCount/@clusterSize)
        @updateLastRow()
      @fillClustersWithRows()
      @clusterHeight = @rowHeight*@clusterSize
    fillClustersWithRows: ->
      rows = @getRows(4*@clusterSize)
      for cluster,i in @clusters
        cluster.rows = rows[i*@clusterSize...(i+1)*@clusterSize]

    onScroll: (e) ->
      top = @$el.scrollTop
      left = @$el.scrollLeft
      if @scrollPosition.left != left
        @scrollPosition.left = left
      if @scrollPosition.top != top
        @scrollPosition.top = top
        @processScroll(top)
    setPosition: (pos=@position) ->
      if pos > -1 && @rowHeight > -1
        @setScrollPosition.top = @rowHeight*@position
        return true
    setScrollPosition: ->
      @setScrollTop(@scrollPosition.top)
      @setScrollLeft(@scrollPosition.left)
    setScrollTop: (top) ->
      if top > -1 && @$el.scrollTop != top
        @$el.scrollTop = top
        @processScroll(top)
    setScrollLeft: (left) ->
      if left > -1 && @$el.scrollLeft != left
        @$el.scrollLeft = left
    processScroll: (top) ->
      if top < 0 # first render
        @setPosition()
        @$nextTick =>
          top = @$el.scrollTop
          if top == 0
            @visibleCluster = 0
          else
            @visibleCluster = Math.floor(top/@clusterHeight)
          @processClusterChange(top)
      else
        if top == 0
          @visibleCluster = 0
        else
          @visibleCluster = Math.floor(top/@clusterHeight)
        if @clusterVisibleLast != @visibleCluster
          @processClusterChange(top)
          @clusterVisibleLast = @visibleCluster
    getData: (first,last,cb) ->
      if @dataGetter
        @dataGetter(first,last).then cb
      else
        cb(@data[first...last])
    fillClusterWithData: (cluster,first,last) ->
      if @rowsCount > -1 and @rowsCount <= first
        cluster.data = []
      else
        @getData first, last, (data) =>
          cluster.data = data
    processClusterChange: (top) ->
      if @visibleCluster == 0
        @clustersBelow = 3
      else if @visibleCluster == 1
        @clustersBelow = 2
      else if @visibleCluster == @clustersCount-2
        @clustersBelow = 1
      else if @visibleCluster == @clustersCount-1
        @clustersBelow = 0
      else if @clusterVisibleLast < @visibleCluster # scrolling down
        @clustersBelow = 2
      else #scrolling up
        @clustersBelow = 1
      for absI in [@visibleCluster-3+@clustersBelow..@visibleCluster+@clustersBelow]

        newTop = absI*@clusterHeight
        relI = absI%4
        if @clusters[relI].top != newTop
          if @clusters[relI].top > newTop
            @clusters[relI].$after @$$.firstRow
          else
            @clusters[relI].$before @$$.lastRow
          @clusters[relI].top = newTop
          @fillClusterWithData @clusters[relI], absI*@clusterSize, (absI+1)*@clusterSize
      @updateFirstRow()
      @updateLastRow() if @rowsCount
    updateFirstRow: ->
      newHeight = (@visibleCluster-(3-@clustersBelow))*@clusterHeight
      if newHeight > 0
        @firstRowStyle.height = newHeight+"px"
      else
        @firstRowStyle.height = null
    updateLastRow: ->
      newHeight = (@rowsCount-(@visibleCluster+@clustersBelow+1)*@clusterSize)*@rowHeight
      if newHeight > 0
        @lastRowStyle.height = newHeight+"px"
      else
        @lastRowStyle.height = null
    processCount: ->
      get = (cb) =>
        if @rowCounter
          @rowCounter().then cb
        else
          cb(@data.length)
      process = (count) =>
        if count > 0
          @rowsCount = count
          @clustersCount = Math.ceil(@rowsCount/@clusterSize)
          @updateLastRow()
      get process


    start: ->
      if @data.length > 0
        @$watch("data", @processData)
      @getData 0,1, (data) =>
        @processCount()
        @calcRowHeight data[0], =>
          @processScroll(-1)
          @onHover()
    processData: (newData, oldData) ->
      if newData != oldData
        @setPosition = 0
        @processCount()
    onHover: ->
      if @scrollBars.y
        @checkScrollBarWidth()
      if @scrollBars.x
        @$nextTick @checkScrollBarHeight
    checkScrollBarHeight: ->
      @scrollBarSize.height = @$el.offsetHeight - @$el.clientHeight
    checkScrollBarWidth: ->
      @scrollBarSize.width = @$el.offsetWidth - @$el.clientWidth
    updateHeight: (height=@height, oldHeight) ->
      if height >0
        @style.height = height+"px"
      else
        @style.height = null
      if @rowHeight > -1 and Math.abs(oldHeight-height)> 0.8*height
        @$nextTick @calcClusterSize
    updateWidth: (width=@width) ->
      if width >0
        @style.width = width+"px"
      else
        @style.width = null
    updateMaxWidth: (width=@maxWidth) ->
      @style["max-width"] = width+"px"
  compiled: ->
    @updateHeight() if @height
    @updateWidth() if @width
    @updateMaxWidth() if @maxWidth
    for cluster in @$children
      if cluster.isCluster
        @clusters.push cluster
  ready: ->
    if @autoStart
      @start()
  watch:
    "width": "updateWidth"
    "height": "updateHeight"
    "maxWidth": "updateMaxWidth"
    "scrollPosition.top": "setScrollTop"
    "scrollPosition.left": "setScrollLeft"
    "position": "setPosition"
</script>
<style lang="stylus">

.clusterize
  float:left
  height: 100%
  &.scroll-bar-x:hover
    overflow-x: auto
  &.scroll-bar-y:hover
    overflow-y: auto
</style>
