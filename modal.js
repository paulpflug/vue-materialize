var __vueify_style__ = require("vueify-insert-css").insert("/* line 2, stdin */\n.modal {\n  position: fixed;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  background-color: #fafafa;\n  padding: 0;\n  max-height: 70%;\n  width: 55%;\n  margin: auto;\n  overflow-y: auto;\n  z-index: 999;\n  border-radius: 2px;\n  will-change: top, opacity; }\n  /* line 17, stdin */\n  .modal h1, .modal h2, .modal h3, .modal h4 {\n    margin-top: 0; }\n  /* line 21, stdin */\n  .modal .modal-content {\n    padding: 24px; }\n  /* line 24, stdin */\n  .modal .modal-close {\n    cursor: pointer; }\n  /* line 28, stdin */\n  .modal .modal-footer {\n    border-radius: 0 0 2px 2px;\n    background-color: #fafafa;\n    padding: 4px 6px;\n    height: 56px;\n    width: 100%; }\n    /* line 35, stdin */\n    .modal .modal-footer .btn, .modal .modal-footer .btn-flat {\n      float: right;\n      margin: 6px 0; }\n\n/* line 43, stdin */\n.modal.modal-fixed-footer {\n  padding: 0;\n  height: 70%; }\n  /* line 47, stdin */\n  .modal.modal-fixed-footer .modal-content {\n    position: absolute;\n    height: calc(100% - 56px);\n    max-height: 100%;\n    width: 100%;\n    overflow-y: auto; }\n  /* line 55, stdin */\n  .modal.modal-fixed-footer .modal-footer {\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    position: absolute;\n    bottom: 0; }\n\n/* line 63, stdin */\n.modal.bottom-sheet {\n  top: auto;\n  bottom: -100%;\n  margin: 0;\n  width: 100%;\n  max-height: 45%;\n  border-radius: 0;\n  will-change: bottom, opacity; }\n")
var Velocity, overlay;

overlay = null;

Velocity = require("velocity-animate");

module.exports = {
  created: function() {
    return overlay = require('./overlay')(this.$root.constructor);
  },
  props: {
    "opacity": {
      type: Number,
      "default": 0.5
    },
    "inDuration": {
      type: Number,
      "default": 350
    },
    "outDuration": {
      type: Number,
      "default": 250
    },
    "dismissible": {
      type: Boolean,
      "default": true
    },
    "bottomSheet": {
      type: Boolean,
      "default": false
    }
  },
  data: function() {
    return {
      isOpened: false,
      removeOverlayOnClick: null,
      style: {
        display: "none",
        bottom: void 0,
        top: void 0
      }
    };
  },
  methods: {
    show: function() {
      this.$appendTo('body');
      if (this.bottomSheet) {
        return Velocity(this.$el, {
          bottom: "0",
          opacity: 1
        }, {
          duration: this.inDuration,
          queue: false,
          ease: "easeOutCubic",
          complete: (function(_this) {
            return function() {
              return _this.$dispatch("show");
            };
          })(this)
        });
      } else {
        return Velocity(this.$el, {
          top: "10%",
          opacity: 1,
          scaleX: 1
        }, {
          duration: this.inDuration,
          ease: "easeOutCubic",
          complete: (function(_this) {
            return function() {
              return _this.$dispatch("show");
            };
          })(this)
        });
      }
    },
    hide: function() {
      var newcb;
      newcb = (function(_this) {
        return function() {
          _this.$dispatch("hide");
          _this.style.display = "none";
          return _this.$remove();
        };
      })(this);
      if (this.bottomSheet) {
        return Velocity(this.$el, {
          bottom: "-100%",
          opacity: 0
        }, {
          duration: this.outDuration,
          queue: false,
          ease: "easeOutCubic",
          complete: newcb
        });
      } else {
        return Velocity(this.$el, {
          top: "4%",
          opacity: 0,
          scaleX: 0.7
        }, {
          duration: this.outDuration,
          ease: "easeOutCubic",
          complete: newcb
        });
      }
    },
    open: function() {
      if (this.isOpened) {
        return;
      }
      this.isOpened = true;
      this.style.display = void 0;
      overlay.open();
      overlay.style["z-index"] = 998;
      this.$dispatch("open");
      this.show();
      if (this.dismissible) {
        return this.removeOverlayOnClick = overlay.addToClickStack(this.close);
      }
    },
    close: function() {
      if (this.removeOverlayOnClick != null) {
        this.removeOverlayOnClick();
      }
      if (!this.isOpened) {
        return;
      }
      this.isOpened = false;
      overlay.close();
      this.$dispatch("close");
      return this.hide();
    }
  },
  compiled: function() {
    if (this.bottomSheet) {
      return this.style.bottom = "-100%";
    } else {
      this.style.top = "4%";
      return Velocity.hook(this.$el, "scaleX", 0.7);
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-bind:style=\"style\" v-bind:class=\"{bottomSheet: bottomSheet}\" class=\"modal\"><slot>No content</slot></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 2, stdin */\n.modal {\n  position: fixed;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  background-color: #fafafa;\n  padding: 0;\n  max-height: 70%;\n  width: 55%;\n  margin: auto;\n  overflow-y: auto;\n  z-index: 999;\n  border-radius: 2px;\n  will-change: top, opacity; }\n  /* line 17, stdin */\n  .modal h1, .modal h2, .modal h3, .modal h4 {\n    margin-top: 0; }\n  /* line 21, stdin */\n  .modal .modal-content {\n    padding: 24px; }\n  /* line 24, stdin */\n  .modal .modal-close {\n    cursor: pointer; }\n  /* line 28, stdin */\n  .modal .modal-footer {\n    border-radius: 0 0 2px 2px;\n    background-color: #fafafa;\n    padding: 4px 6px;\n    height: 56px;\n    width: 100%; }\n    /* line 35, stdin */\n    .modal .modal-footer .btn, .modal .modal-footer .btn-flat {\n      float: right;\n      margin: 6px 0; }\n\n/* line 43, stdin */\n.modal.modal-fixed-footer {\n  padding: 0;\n  height: 70%; }\n  /* line 47, stdin */\n  .modal.modal-fixed-footer .modal-content {\n    position: absolute;\n    height: calc(100% - 56px);\n    max-height: 100%;\n    width: 100%;\n    overflow-y: auto; }\n  /* line 55, stdin */\n  .modal.modal-fixed-footer .modal-footer {\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    position: absolute;\n    bottom: 0; }\n\n/* line 63, stdin */\n.modal.bottom-sheet {\n  top: auto;\n  bottom: -100%;\n  margin: 0;\n  width: 100%;\n  max-height: 45%;\n  border-radius: 0;\n  will-change: bottom, opacity; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}