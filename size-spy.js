var __vueify_style__ = require("vueify-insert-css").insert(".size-spy-parent {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.size-spy-sibling {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.width-spy,\n.height-spy {\n  margin: 0;\n  padding: 0;\n  line-height: 0;\n  font-size: 0;\n}\n")
module.exports = {
  mixins: [require("vue-mixins/onWindowResize")],
  el: function() {
    return document.createElement("div");
  },
  data: function() {
    return {
      height: null,
      width: null
    };
  },
  methods: {
    onResize: function() {
      var newHeight, newWidth;
      newHeight = this.$els.height.offsetHeight;
      if (this.height !== newHeight) {
        this.height = newHeight;
      }
      newWidth = this.$els.width.offsetWidth;
      if (this.width !== newWidth) {
        return this.width = newWidth;
      }
    }
  },
  attached: function() {
    this.$nextTick(this.onResize);
    return this.addResizeCb(this.onResize);
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-el:width=\"v-el:width\" style=\"height:0;flex:1 0 auto\" class=\"width-spy\"></div><div v-el:height=\"v-el:height\" style=\"width:0;flex:0 1 auto\" class=\"height-spy\"></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache[".size-spy-parent {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.size-spy-sibling {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.width-spy,\n.height-spy {\n  margin: 0;\n  padding: 0;\n  line-height: 0;\n  font-size: 0;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}