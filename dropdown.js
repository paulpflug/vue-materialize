var __vueify_style__ = require("vueify-insert-css").insert("/* line 2, stdin */\n.dropdown-content {\n  margin: 0;\n  min-width: 100px;\n  max-height: 650px;\n  overflow-y: auto;\n  opacity: 0;\n  position: absolute;\n  z-index: 999;\n  will-change: width, height; }\n  /* line 11, stdin */\n  .dropdown-content > li {\n    clear: both;\n    cursor: pointer;\n    line-height: 1.5rem;\n    width: 100%;\n    text-align: left;\n    text-transform: none; }\n    /* line 18, stdin */\n    .dropdown-content > li > a, .dropdown-content > li > span {\n      font-size: 1.2rem;\n      display: block;\n      padding: 1rem 1rem; }\n    /* line 23, stdin */\n    .dropdown-content > li > a > i {\n      height: inherit;\n      line-height: inherit; }\n")
var Velocity;

Velocity = require("velocity-animate");

module.exports = {
  mixins: [require("vue-mixins/getWindowSize"), require("vue-mixins/onDocumentClick")],
  props: {
    "closeOnClick": {
      type: Boolean,
      "default": true
    },
    "inDuration": {
      type: Number,
      "default": 300
    },
    "outDuration": {
      type: Number,
      "default": 225
    },
    "constrainWidth": {
      type: Boolean,
      "default": true
    },
    "gutter": {
      type: Number,
      "default": 0
    },
    "belowOrigin": {
      type: Boolean,
      "default": false
    }
  },
  data: function() {
    return {
      closeOnClick: true,
      dropdownOut: false,
      removeDocumentClick: null,
      style: {
        display: "none",
        left: 0,
        right: void 0,
        top: 0,
        width: void 0
      }
    };
  },
  methods: {
    show: function(origin) {
      if (origin == null) {
        return;
      }
      if (this.dropdownOut) {
        return;
      }
      this.style.display = void 0;
      return this.$nextTick((function(_this) {
        return function() {
          var orgPos, width, windowSize;
          orgPos = origin.getBoundingClientRect();
          _this.dropdownOut = true;
          if (_this.constrainWidth) {
            width = origin.offsetWidth;
            _this.style.width = width;
          } else {
            width = _this.$el.clientWidth;
            _this.style.width = void 0;
          }
          if (_this.belowOrigin) {
            _this.style.top = orgPos.top + origin.clientHeight;
          } else {
            _this.style.top = orgPos.top;
          }
          windowSize = _this.getWindowSize();
          if (orgPos.left + width > windowSize.width) {
            _this.style.right = windowSize.width - orgPos.right + _this.gutter;
            _this.style.left = void 0;
          } else {
            _this.style.right = void 0;
            _this.style.left = orgPos.left + _this.gutter;
          }
          Velocity(_this.$el, "stop").then(function(el) {
            Velocity(el, "slideDown", {
              duration: this.inDuration,
              queue: false,
              easing: 'easeOutCubic'
            });
            return Velocity(el, {
              opacity: 1
            }, {
              duration: this.inDuration,
              queue: false,
              easing: 'easeOutSine'
            });
          });
          return _this.removeDocumentClick = _this.onceDocumentClick(function(e) {
            if ((e.target !== origin && e.target !== _this.$el) && (_this.closeOnClick || (e.target.parentElement !== _this.$el && e.target.parentElement.parentElement !== _this.$el && e.target.parentElement.parentElement.parentElement !== _this.$el))) {
              _this.hide();
              return true;
            } else {
              return false;
            }
          });
        };
      })(this));
    },
    hide: function() {
      if (!this.dropdownOut) {
        return;
      }
      this.dropdownOut = false;
      if (this.removeDocumentClick) {
        this.removeDocumentClick();
      }
      return Velocity(this.$el, {
        opacity: 0
      }, {
        duration: this.outDuration,
        queue: false,
        easing: 'easeOutSine',
        complete: (function(_this) {
          return function() {
            return _this.style.display = "none";
          };
        })(this)
      });
    },
    open: function(origin) {
      return this.show(origin);
    },
    close: function() {
      return this.hide();
    },
    toggle: function(origin) {
      if (this.dropdownOut) {
        return this.close();
      } else {
        return this.open(origin);
      }
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<ul v-bind:style=\"style\" class=\"dropdown-content\"><slot>No content</slot></ul>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 2, stdin */\n.dropdown-content {\n  margin: 0;\n  min-width: 100px;\n  max-height: 650px;\n  overflow-y: auto;\n  opacity: 0;\n  position: absolute;\n  z-index: 999;\n  will-change: width, height; }\n  /* line 11, stdin */\n  .dropdown-content > li {\n    clear: both;\n    cursor: pointer;\n    line-height: 1.5rem;\n    width: 100%;\n    text-align: left;\n    text-transform: none; }\n    /* line 18, stdin */\n    .dropdown-content > li > a, .dropdown-content > li > span {\n      font-size: 1.2rem;\n      display: block;\n      padding: 1rem 1rem; }\n    /* line 23, stdin */\n    .dropdown-content > li > a > i {\n      height: inherit;\n      line-height: inherit; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}