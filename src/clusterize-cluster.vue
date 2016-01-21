// out: ..
<template lang="jade">
.clusterize-cluster(
  v-el="cluster" v-attr="top"
  )
</template>

<script lang="coffee">

module.exports =
  props:
    "top":
      type: Number
    "rowHeight":
      type: Number
    "rows":
      type: Array
      default: -> []
    "data":
      type: Array
      default: -> []
  data: ->
    isCluster: true
  methods:
    redrawRows: (newRows, oldRows) ->
      for row in oldRows
        if newRows.indexOf(row) < 0
          row.$remove()
      if newRows.length > 0
        lastRow = newRows[0]
        lastRow.$appendTo(@$$.cluster)
        if newRows.length > 1
          for row in newRows[1..]
            row.$after(lastRow.$el)
            lastRow = row
      @updateRowHeight()
    updateRowHeight: ->
      if @rowHeight>0
        for row in @rows
          row.rowHeight = @rowHeight
    updateData: ->
      for row,i in @rows
        if @data[i]?
          row.render(@data[i])
        else
          row.render()
  watch:
    "data":"updateData"
    "rows":"redrawRows"
    "rowHeight":"updateRowHeight"
</script>
<style lang="stylus">
div.clusterize-cluster
  overflow visible
  margin 0
  padding 0
  position relative
</style>
