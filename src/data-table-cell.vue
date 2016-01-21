// out: ..
<template lang="jade">
.data-table-cell(v-style="style" v-class="class")
</template>

<script lang="coffee">
module.exports =
  el: -> document.createElement "div"
  data: ->
    style:
      width: null
      height: null
    class: ""
    child: null
    data: null
    unwatch: null
  methods:
    insertChild: ->
      if @child?
        if @child.class?
          @class = @child.class
        @child.$appendTo? @$el
    setStyleWidth: (width) ->
      @style.width = width
  watch:
    "child": "insertChild"
    "data": (data) -> @child?.data = data
</script>
<style lang="stylus">
.data-table-cell
  position: relative
  border-right: 1px solid black
  margin-right: 2px
  overflow:hidden
  white-space: nowrap
  display: inline-block
  line-height: 1

</style>
