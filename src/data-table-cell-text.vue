// out: ..
<template lang="jade">
span {{data}}
</template>

<script lang="coffee">
module.exports =
  el: -> document.createElement "div"
  data: ->
    data: ""
    class: "data-table-cell-text"
</script>
<style lang="scss">



</style>
