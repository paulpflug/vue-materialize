// out: ..
<template lang="jade">
li(v-bind:class="{active:active}" )
  a.collapsible-header(@click="click") {{header}}
  .collapsible-body(v-el:body v-bind:style="style")
    slot No content
</template>

<script lang="coffee">
Velocity = require("velocity-animate")
module.exports =
  mixins:[
    require("vue-mixins/onClickEvent")
  ]
  props:
    "header":
      type: String
      default: ""
    "active":
      type: Boolean
      default: false

  data: ->
    style:
      display: "none"
  methods:
    show: ->
      @active = true
      Velocity @$els.body, "stop"
      Velocity @$els.body, "slideDown",{
        duration: 350
        easing: "easeOutQuart"
        queue: false
        }
    hide: ->
      @active = false
      Velocity @$els.body, "stop"
      Velocity @$els.body, "slideUp",{
        duration: 350
        easing: "easeOutQuart"
        queue: false
        }
    open: ->
      @show()
    close: ->
      @hide()
    toggle: ->
      @active = !@active

  compiled: ->
    if @active
      @style.display = "block"
    @onClick =>
      @toggle()
  watch:
    "active": (newVal,oldVal) ->
      if newVal != oldVal
        if !newVal
          @close()
        else
          @open()

</script>
<style lang="scss">
.collapsible-header {
  display: block;
  cursor: pointer;
  padding: 0 1rem;
  i {
    width: 2rem;
    font-size: 1.6rem;
    display: block;
    float: left;
    text-align: center;
    margin-right: 1rem;
  }
}
.collapsible-body {
  display: none;
  p {
    margin: 0;
    padding: 2rem;
  }
}

// sideNav collapsible styling
.side-nav {
  .collapsible-header {
    background-color: transparent;
    border: none;
    height: inherit;
    margin: 0 1rem;
    i { line-height: inherit; }
  }
  .collapsible-body {
    border: 0;
    li a { margin: 0 1rem 0 2rem; }
  }
}
// Popout Collapsible

.collapsible.popout {
  > li {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    // transform: scaleX(.92);
    margin: 0 24px;
    transition: margin .35s cubic-bezier(0.250, 0.460, 0.450, 0.940);
  }
  > li.active {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    margin: 16px 0;
    // transform: scaleX(1);
  }
}

</style>
