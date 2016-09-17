# out: ../fixed-action-button.js
Velocity = require("velocity-animate")
cancel = (el) ->
  for i in [0..el.children.length-1]
    Velocity el, "stop"
fab = require "vue-fixed-action-button"
clone = require "lodash/clone"
f =
  template: fab.template
  mixins: fab.mixins.concat [require("vue-mixins/setCss")]
  methods: fab.methods
  computed:
    mergeStyle: ->
      style = position: "fixed"
      if @otherSide and @horizontal
        style.paddingLeft = 0
        style.paddingRight = "15px"
        style.right = "auto"
      else if @otherSide
        style.paddingTop = 0
        style.paddingBottom = "15px"
        style.bottom = "auto"
      return style
    mergeClass: ->
      return ["horizontal"] if @horizontal
      return []
    fac: -> @otherSide*-2+1
    fabStyle: ->
      if @otherSide and @horizontal
        return right:"auto", left: "64px", textAlign:"left"
      else if @otherSide
        return bottom:"auto", top: "64px"
      return null
  props: clone(fab.props)
  transitions:
    default:
      css: false
      leaveCancelled: cancel
      enterCancelled: cancel
      enter: (el,done) ->
        complete = =>
          @$emit "opened"
          done()
        @setCss el, "visibility", "visible"
        return complete() if el.children.length == 0
        time = 0
        style = opacity: 1, scaleX: 1, scaleY: 1
        if @horizontal
          type = "X"
        else
          type = "Y"
        style["translate"+type]=0
        transIn = (el, last) ->
          options = {
            duration: 80
            delay: time
            easing: "easeInOutCubic"
          }
          options.complete = complete if last
          Velocity.hook el, "scaleX", 0.3
          Velocity.hook el, "scaleY", 0.3
          Velocity.hook el, "translate"+type, @fac*40+'px'
          Velocity el, style, options
          time += 40
        if @otherSide
          order = [0..el.children.length-1]
        else
          order = [el.children.length-1..0]
        for i in order
          transIn(el.children[i].firstElementChild,i==0)
      leave: (el,done) ->
        complete = =>
          @$emit "closed"
          done()
        return complete() if el.children.length == 0
        style = opacity: 0, scaleX: 0.3, scaleY: 0.3
        if @horizontal
          type = "X"
        else
          type = "Y"
        style["translate"+type]=@fac*40+'px'
        transOut = (el, last) ->
          options = {
            duration: 80
            easing: "easeInOutCubic"
          }
          #options.complete = cb if last
          if last
            setTimeout complete,250
          Velocity el, style, options
        for i in [el.children.length-1..0]
          transOut(el.children[i].firstElementChild,i==0)

f.props.horizontal =
  default: false
  type: Boolean
f.props.otherSide =
  default: false
  type: Boolean

module.exports = f
