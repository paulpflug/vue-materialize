require("insert-css")(".side-nav{position:fixed;width:240px;left:-105%;top:0;margin:0;height:100%;height:calc(100% + 60px);height:-moz-calc(100%);padding-bottom:60px;z-index:999;overflow-y:auto;will-change:left}.side-nav.right-aligned{will-change:right;right:-105%;left:auto}.side-nav .collapsible{margin:0}.side-nav li{float:none}.side-nav li.active,.side-nav li:hover{background-color:#ddd}.side-nav a{color:#444;display:block;font-size:1rem;height:64px;line-height:64px}.side-nav.fixed a{display:block;color:#444}.side-nav.fixed{left:0;position:fixed}.side-nav.fixed.right-aligned{right:0;left:auto}");
var __vue_template__ = "<ul style=\"{{width}}{{left}}{{right}}\" v-class=\"right-aligned: rightAligned,fixed: fixed\" class=\"side-nav\"><content>No content</content></ul>";
var Velocity, Vue, dragTarget, overlay;

Vue = require('vue');

overlay = new Vue(require('./sideNav-overlay'));

dragTarget = new Vue(require('./sideNav-dragTarget')).$appendTo('body');

Velocity = require("velocity-animate");

module.exports = {
  mixins: [require("vue-mixins/left"), require("vue-mixins/right"), require("vue-mixins/width"), require("vue-mixins/onResize"), require("vue-mixins/setCss")],
  props: {
    "menu-width": {
      type: Number,
      "default": 240
    },
    "edge": {
      type: String,
      "default": "left"
    },
    "close-on-click": {
      type: Boolean,
      "default": false
    },
    "fixed": {
      type: Boolean,
      "default": false
    }
  },
  data: function() {
    return {
      rightAligned: false,
      menuOut: false,
      panning: false
    };
  },
  methods: {
    show: function() {
      this.menuOut = true;
      this.setCss(document.body, "overflow", "hidden");
      dragTarget.$appendTo('body');
      if (this.edge === 'left') {
        dragTarget.setWidth("50%");
        dragTarget.setRight(0);
        dragTarget.setLeft(void 0);
        Velocity(this.$el, {
          left: 0
        }, {
          duration: 300,
          queue: false,
          easing: 'easeOutQuad'
        });
      } else {
        dragTarget.setWidth("50%");
        dragTarget.setRight(void 0);
        dragTarget.setLeft(0);
        Velocity(this.$el, {
          right: 0
        }, {
          duration: 300,
          queue: false,
          easing: 'easeOutQuad'
        });
        this.setLeft(void 0);
      }
      overlay.setOpacity(0);
      overlay.$once("click", (function(_this) {
        return function() {
          _this.hide();
          return Velocity(overlay.$el, {
            opacity: 0
          }, {
            duration: 300,
            queue: false,
            easing: 'easeOutQuad',
            complete: function() {
              return overlay.$remove();
            }
          });
        };
      })(this));
      overlay.$appendTo('body');
      return Velocity(overlay.$el, {
        opacity: 1
      }, {
        duration: 300,
        queue: false,
        easing: 'easeOutQuad',
        complete: (function(_this) {
          return function() {
            _this.menuOut = true;
            return _this.panning = false;
          };
        })(this)
      });
    },
    hide: function(restoreNav) {
      this.panning = false;
      this.menuOut = false;
      this.setCss(document.body, "overflow");
      Velocity(overlay.$el, {
        opacity: 0
      }, {
        duration: 200,
        queue: false,
        easing: 'easeOutQuad',
        complete: function() {
          return overlay.$remove();
        }
      });
      if (this.edge === 'left') {
        dragTarget.setWidth(void 0);
        dragTarget.setRight(void 0);
        dragTarget.setLeft(0);
        return Velocity(this.$el, {
          left: -1 * (this.menuWidth + 10)
        }, {
          duration: 200,
          queue: false,
          easing: 'easeOutCubic',
          complete: function() {
            if (restoreNav) {
              this.setRight(void 0);
              this.setLeft(void 0);
              return this.setWidth(this.menuWidth);
            }
          }
        });
      } else {
        dragTarget.setWidth(void 0);
        dragTarget.setRight(0);
        dragTarget.setLeft(void 0);
        return Velocity(this.$el, {
          right: -1 * (this.menuWidth + 10)
        }, {
          duration: 200,
          queue: false,
          easing: 'easeOutCubic',
          complete: function() {
            if (restoreNav) {
              this.setRight(void 0);
              this.setLeft(void 0);
              return this.setWidth(this.menuWidth);
            }
          }
        });
      }
    },
    toggle: function() {
      if (this.menuOut) {
        return this.hide();
      } else {
        return this.show();
      }
    }
  },
  compiled: function() {
    this.setWidth(this.menuWidth);
    dragTarget.$on("click", this.hide);
    if (this.edge === "left") {
      this.setLeft(-1 * (this.menuWidth + 10));
      dragTarget.setLeft(0);
    } else {
      this.rightAligned = true;
      this.setRight(-1 * (this.menuWidth + 10));
      this.setLeft("");
      dragTarget.setRight(0);
    }
    if (this.fixed) {
      if (window.innerWidth > 992) {
        this.setLeft(void 0);
      }
      return this.addResizeCb((function(_this) {
        return function() {
          console.log("test");
          if (window.innerWidth > 992) {
            if (overlay.opacity !== 0 && _this.menuOut) {
              return _this.hide(true);
            } else {
              _this.setRight(void 0);
              _this.setLeft(void 0);
              return _this.setWidth(_this.menuWidth);
            }
          } else if (!_this.menuOut) {
            if (_this.edge === 'left') {
              return _this.setLeft(-1 * (_this.menuWidth + 10));
            } else {
              return _this.setRight(-1 * (_this.menuWidth + 10));
            }
          }
        };
      })(this));
    }
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
