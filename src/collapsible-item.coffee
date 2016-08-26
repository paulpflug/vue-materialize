# out: ../collapsible-item.js
ci = require "vue-collapsible/collapsible-item"
ci.template = ci.template
  .replace(/div :class=header/,"a :class=header")
  .replace(/header<\/slot><\/div/,"header<\/slot><\/a")
module.exports = ci
