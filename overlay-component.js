var __vueify_style__ = require("vueify-insert-css").insert("/* line 2, stdin */\n#overlay {\n  position: fixed;\n  top: -10px;\n  left: 0;\n  right: 0;\n  height: 120vh;\n  background-color: black;\n  will-change: opacity; }\n")
var Velocity;

Velocity = require("velocity-animate");

module.exports = {
  mixins: [require("vue-mixins/onClickStack")],
  data: function() {
    return {
      isOpened: false,
      style: {
        opacity: 0,
        "z-index": 995
      }
    };
  },
  el: function() {
    return document.createElement("div");
  },
  methods: {
    open: function(cb, opacity) {
      if (opacity == null) {
        opacity = 0.5;
      }
      if (this.isOpened) {
        return;
      }
      this.isOpened = true;
      this.$appendTo('body');
      this.$dispatch("open");
      return Velocity(this.$el, {
        opacity: opacity
      }, {
        duration: 300,
        queue: false,
        easing: 'easeOutQuad',
        complete: (function(_this) {
          return function() {
            return _this.$dispatch("show");
          };
        })(this)
      });
    },
    close: function() {
      if (!this.isOpened) {
        return;
      }
      this.isOpened = false;
      this.$dispatch("close");
      return Velocity(this.$el, {
        opacity: 0
      }, {
        duration: 300,
        queue: false,
        easing: 'easeOutQuad',
        complete: (function(_this) {
          return function() {
            _this.$dispatch("hide");
            return _this.$remove();
          };
        })(this)
      });
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div id=\"overlay\" v-bind:style=\"style\" @click=\"click\"></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 2, stdin */\n#overlay {\n  position: fixed;\n  top: -10px;\n  left: 0;\n  right: 0;\n  height: 120vh;\n  background-color: black;\n  will-change: opacity; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}