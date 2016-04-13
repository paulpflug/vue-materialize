# out: ../toaster.js
Toaster = require "vue-toaster/toaster"
Toaster.obj.props.isTop.default = true
Toaster.obj.components.toast = require "./toast"
module.exports =
  methods:
    getVue: require("vue-mixins/getVue").methods.getVue
  compiled: ->
    @toast = Toaster(@getVue()).toast
