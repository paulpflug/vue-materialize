// out: ..
<template lang="jade">
ul.collapsible(
  v-bind:style="style"
  v-bind:class="{popout: popout}"
  )
  slot No content
</template>

<script lang="coffee">

module.exports =
  props:
    "type":
      type: String
      default: "accordion"
    "popout":
      type: Boolean
      default: false
  data: ->
    active: false
  methods:
    closeAllBut: (entry) ->
      return () =>
        for child in @$children
          child.hide?() unless child == entry
    closeAll: ->
      console.log "closing all"
      @closeAllBut()()

  ready: ->
    if @type == "accordion"
      for child in @$children
        child.onClick @closeAllBut(child), 0

</script>
<style lang="scss">

// sideNav collapsible styling
.side-nav {
  .collapsible {
    border: none;
    box-shadow: none;
    li { padding: 0; }
  }
}

// Popout Collapsible

.collapsible.popout {
  border: none;
  box-shadow: none;
}


</style>
