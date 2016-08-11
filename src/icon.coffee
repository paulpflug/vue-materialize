# out: ../icon.js
i = require "vue-icons"
i.template = i.template.replace("<span","<i class='material-icons'").replace("</span>","</i>")
module.exports = i
