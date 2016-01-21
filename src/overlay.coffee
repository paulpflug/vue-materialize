# out: ../overlay.js
overlay = null
module.exports = (Vue) ->
  overlay ?= new Vue(require('./overlay-component'))
  return overlay
