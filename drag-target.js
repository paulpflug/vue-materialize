var __vueify_style__ = require("vueify-insert-css").insert("/* line 3, stdin */\n#drag-target {\n  height: 100%;\n  width: 10px;\n  position: fixed;\n  top: 0;\n  z-index: 998; }\n")
module.exports = {
  mixins: [require("vue-mixins/onClick")],
  el: function() {
    return document.createElement("div");
  },
  data: function() {
    return {
      style: {
        right: void 0,
        left: void 0,
        width: void 0
      }
    };
  },
  methods: {
    send: function(left) {
      if (left) {
        this.style.right = void 0;
        return this.style.left = 0;
      } else {
        this.style.right = 0;
        return this.style.left = void 0;
      }
    },
    open: function(edge) {
      this.style.width = "50%";
      return this.send(edge !== "left");
    },
    close: function(edge) {
      this.style.width = void 0;
      return this.send(edge === "left");
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div id=\"drag-target\" v-bind:style=\"style\" @click=\"click\"></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 3, stdin */\n#drag-target {\n  height: 100%;\n  width: 10px;\n  position: fixed;\n  top: 0;\n  z-index: 998; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}