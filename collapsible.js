var __vueify_style__ = require("vueify-insert-css").insert("/* line 5, stdin */\n.side-nav .collapsible {\n  border: none;\n  box-shadow: none; }\n  /* line 8, stdin */\n  .side-nav .collapsible li {\n    padding: 0; }\n\n/* line 14, stdin */\n.collapsible.popout {\n  border: none;\n  box-shadow: none; }\n")
module.exports = {
  props: {
    "type": {
      type: String,
      "default": "accordion"
    },
    "popout": {
      type: Boolean,
      "default": false
    }
  },
  data: function() {
    return {
      active: false
    };
  },
  methods: {
    closeAllBut: function(entry) {
      return (function(_this) {
        return function() {
          var child, i, len, ref, results;
          ref = _this.$children;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child !== entry) {
              results.push(typeof child.hide === "function" ? child.hide() : void 0);
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this);
    },
    closeAll: function() {
      return this.closeAllBut()();
    }
  },
  ready: function() {
    var child, i, len, ref, results;
    if (this.type === "accordion") {
      ref = this.$children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        results.push(child.onClick(this.closeAllBut(child), 0));
      }
      return results;
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<ul v-bind:style=\"style\" v-bind:class=\"{popout: popout}\" class=\"collapsible\"><slot>No content</slot></ul>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 5, stdin */\n.side-nav .collapsible {\n  border: none;\n  box-shadow: none; }\n  /* line 8, stdin */\n  .side-nav .collapsible li {\n    padding: 0; }\n\n/* line 14, stdin */\n.collapsible.popout {\n  border: none;\n  box-shadow: none; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}