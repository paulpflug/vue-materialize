// out: ..
<template lang="jade">
.data-table-row(v-style="style" v-show="hasData")
</template>

<script lang="coffee">
Vue = require('vue')
Cell = require "./data-table-cell"
module.exports =
  el: -> document.createElement "div"
  data: ->
    style:
      height: null
    columns: []
    data: null
    hasData: false
    cells: {}
    rowHeight: -1
  methods:
    cleanCells: ->
      newCells = {}
      for column in @columns
        if @cells[column.field]?
          newCells[column.field] = @cells[column.field]
      for field, cell of @cells
        unless newCells[field]?
          cell.unwatch?()
          cell.child?.$destroy?()
          cell.$destroy?()
      @cells = newCells
    setOptions: (cell, options) ->
      for key,val of options
        cell[key] = val
    createCell: (column) ->
      cell = new Vue(Cell)
      cell.style.width = column.style.width
      cell.unwatch = column.$watch("style.width",cell.setStyleWidth)
      cellChild = new Vue(column.cellRender)
      @setOptions(cellChild,column.cellOptions)
      cell.child = cellChild
      return cell
    redrawCells: (newColumns=@columns) ->
      if newColumns
        @cleanCells()
        if newColumns.length > 0
          lastCell = @createCell(newColumns[0])
          lastCell.$appendTo(@$el)
          @cells[newColumns[0].field] = lastCell
          if newColumns.length > 1
            for column in newColumns[1..]
              cell = @createCell(column)
              cell.$after(lastCell.$el)
              @cells[column.field] = cell
              lastCell = cell
    render: (data) ->
      @hasData = data?
      if @hasData
        for column in @columns
          if data[column.field]?
            @cells[column.field].data = data[column.field]
        @$nextTick =>
          for column in @columns
            if data[column.field]? and not column.contentWidthSet
              width = @cells[column.field].$el.offsetWidth+8
              if width > column.contentWidth
                column.contentWidth = width
    updateRowHeight: ->
      if @rowHeight>0
        for field,cell of @cells
          cell.style.height = @rowHeight+"px"
  watch:
    "columns": "redrawCells"
    "data": "render"
    "rowHeight": "updateRowHeight"
</script>
<style lang="stylus">
div.data-table-row
  overflow visible
  line-height 0
</style>
