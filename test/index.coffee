require "./globals.scss"

require "../node_modules/mocha/mocha.css"

Vue = require "vue"
app = new Vue
  el:"#app"
  components:
    "input-field": require "../src/input-field.vue"
InputFieldTest = require "mocha!./input-field.coffee"
