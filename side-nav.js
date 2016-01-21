var __vueify_style__ = require("vueify-insert-css").insert("/* line 3, stdin */\n.side-nav {\n  position: fixed;\n  width: 240px;\n  left: -105%;\n  top: 0;\n  margin: 0;\n  height: 100%;\n  height: calc(100% + 60px);\n  height: -moz-calc(100%);\n  padding-bottom: 60px;\n  z-index: 995;\n  overflow-y: auto;\n  will-change: left; }\n  /* line 18, stdin */\n  .side-nav.right-aligned {\n    will-change: right;\n    right: -105%;\n    left: auto; }\n  /* line 24, stdin */\n  .side-nav .collapsible {\n    margin: 0; }\n  /* line 29, stdin */\n  .side-nav li {\n    float: none; }\n    /* line 32, stdin */\n    .side-nav li:not(.no-hover):hover, .side-nav li:not(.no-hover).active {\n      background-color: #ddd; }\n  /* line 35, stdin */\n  .side-nav a {\n    color: #444;\n    display: block;\n    font-size: 1rem;\n    height: 64px;\n    line-height: 64px; }\n\n/* line 44, stdin */\n.side-nav.fixed {\n  left: 0;\n  position: fixed;\n  overflow-y: hidden; }\n  /* line 48, stdin */\n  .side-nav.fixed:hover {\n    overflow-y: auto; }\n  /* line 52, stdin */\n  .side-nav.fixed a {\n    display: block;\n    color: #444; }\n  /* line 57, stdin */\n  .side-nav.fixed.right-aligned {\n    right: 0;\n    left: auto; }\n")
var Velocity, dragTarget, overlay;

overlay = null;

dragTarget = null;

Velocity = require("velocity-animate");

module.exports = {
  created: function() {
    overlay = require('./overlay')(this.$root.constructor);
    return dragTarget = require('./drag-target')(this.$root.constructor);
  },
  mixins: [require("vue-mixins/onWindowResize"), require("vue-mixins/onClick"), require("vue-mixins/setCss")],
  props: {
    "menuWidth": {
      type: Number,
      "default": 240
    },
    "edge": {
      type: String,
      "default": "left"
    },
    "closeOnClick": {
      type: Boolean,
      "default": true
    },
    "fixed": {
      type: Boolean,
      "default": false
    }
  },
  data: function() {
    return {
      style: {
        width: this.menuWidth + "px",
        left: 0,
        right: void 0
      },
      rightAligned: false,
      menuOut: false,
      panning: false,
      veloOpts: {
        duration: 300,
        queue: false,
        easing: 'easeOutQuad'
      },
      removeOverlayOnClick: null
    };
  },
  methods: {
    otherEdge: function() {
      if (this.edge === "left") {
        return "right";
      } else {
        return "left";
      }
    },
    setFixed: function() {
      this.style.width = this.menuWidth + "px";
      this.style.right = void 0;
      return this.style.left = void 0;
    },
    show: function() {
      if (this.edge === 'left') {
        Velocity(this.$el, {
          left: 0
        }, this.veloOpts);
        return this.style.right = void 0;
      } else {
        Velocity(this.$el, {
          right: 0
        }, this.veloOpts);
        return this.style.left = void 0;
      }
    },
    hide: function(animate) {
      if (animate) {
        if (this.edge === 'left') {
          return Velocity(this.$el, {
            left: -1 * (this.menuWidth + 10)
          }, this.veloOpts);
        } else {
          return Velocity(this.$el, {
            right: -1 * (this.menuWidth + 10)
          }, this.veloOpts);
        }
      } else {
        if (this.edge === 'left') {
          this.style.left = -1 * (this.menuWidth + 10) + "px";
          return this.style.right = void 0;
        } else {
          this.style.left = void 0;
          return this.style.right = -1 * (this.menuWidth + 10) + "px";
        }
      }
    },
    open: function() {
      if (this.menuOut) {
        return;
      }
      this.menuOut = true;
      this.setCss(document.body, "overflow", "hidden");
      dragTarget.$appendTo('body');
      dragTarget.open(this.edge);
      this.show();
      this.removeOverlayOnClick = overlay.addToClickStack((function(_this) {
        return function() {
          _this.close();
          return overlay.close();
        };
      })(this));
      overlay.style["z-index"] = 994;
      return overlay.open((function(_this) {
        return function() {
          return _this.panning = false;
        };
      })(this));
    },
    close: function(restoreNav) {
      if (!this.menuOut) {
        return;
      }
      this.panning = false;
      this.menuOut = false;
      this.setCss(document.body, "overflow");
      overlay.close();
      if (typeof this.removeOverlayOnClick === "function") {
        this.removeOverlayOnClick();
      }
      dragTarget.close(this.edge);
      if (restoreNav === true) {
        return this.setFixed();
      } else {
        return this.hide(true);
      }
    },
    toggle: function() {
      if (this.menuOut) {
        return this.close();
      } else {
        return this.open();
      }
    }
  },
  compiled: function() {
    this.style.width = this.menuWidth + "px";
    dragTarget.onClick = (function(_this) {
      return function() {
        return _this.close();
      };
    })(this);
    dragTarget.close(this.edge);
    this.hide(false);
    if (this.fixed) {
      if (window.innerWidth > 992) {
        this.style.left = void 0;
      }
      this.addResizeCb((function(_this) {
        return function() {
          if (window.innerWidth > 992) {
            if (overlay.opacity !== 0 && _this.menuOut) {
              return _this.close(true);
            } else {
              return _this.setFixed();
            }
          } else if (!_this.menuOut) {
            return _this.hide(false);
          }
        };
      })(this));
    }
    return this.onClick = function(e) {
      if (this.closeOnClick && (e.target.parentElement === this.$el || e.target.parentElement.parentElement === this.$el || e.target.parentElement.parentElement.parentElement === this.$el)) {
        return this.close();
      }
    };
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<ul v-el:nav=\"v-el:nav\" @click=\"click\" v-bind:style=\"style\" v-bind:class=\"{right-aligned: rightAligned,fixed: fixed}\" class=\"side-nav\"><!--resizer(v-if=\"resize\"\nside=\"{{otherEdge()}}\"\nparent-size-style=\"{{@style.width}}\"\nmin-size=\"{{minWidth}}\"\ncontent-size=\"{{contentWidth}}\"\noffset=\"5\")--><slot>No content</slot></ul>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 3, stdin */\n.side-nav {\n  position: fixed;\n  width: 240px;\n  left: -105%;\n  top: 0;\n  margin: 0;\n  height: 100%;\n  height: calc(100% + 60px);\n  height: -moz-calc(100%);\n  padding-bottom: 60px;\n  z-index: 995;\n  overflow-y: auto;\n  will-change: left; }\n  /* line 18, stdin */\n  .side-nav.right-aligned {\n    will-change: right;\n    right: -105%;\n    left: auto; }\n  /* line 24, stdin */\n  .side-nav .collapsible {\n    margin: 0; }\n  /* line 29, stdin */\n  .side-nav li {\n    float: none; }\n    /* line 32, stdin */\n    .side-nav li:not(.no-hover):hover, .side-nav li:not(.no-hover).active {\n      background-color: #ddd; }\n  /* line 35, stdin */\n  .side-nav a {\n    color: #444;\n    display: block;\n    font-size: 1rem;\n    height: 64px;\n    line-height: 64px; }\n\n/* line 44, stdin */\n.side-nav.fixed {\n  left: 0;\n  position: fixed;\n  overflow-y: hidden; }\n  /* line 48, stdin */\n  .side-nav.fixed:hover {\n    overflow-y: auto; }\n  /* line 52, stdin */\n  .side-nav.fixed a {\n    display: block;\n    color: #444; }\n  /* line 57, stdin */\n  .side-nav.fixed.right-aligned {\n    right: 0;\n    left: auto; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}