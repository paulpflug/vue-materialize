var __vueify_style__ = require("vueify-insert-css").insert("/* line 2, stdin */\n.collapsible-header {\n  display: block;\n  cursor: pointer;\n  padding: 0 1rem; }\n  /* line 6, stdin */\n  .collapsible-header i {\n    width: 2rem;\n    font-size: 1.6rem;\n    display: block;\n    float: left;\n    text-align: center;\n    margin-right: 1rem; }\n\n/* line 15, stdin */\n.collapsible-body {\n  display: none; }\n  /* line 17, stdin */\n  .collapsible-body p {\n    margin: 0;\n    padding: 2rem; }\n\n/* line 25, stdin */\n.side-nav .collapsible-header {\n  background-color: transparent;\n  border: none;\n  height: inherit;\n  margin: 0 1rem; }\n  /* line 30, stdin */\n  .side-nav .collapsible-header i {\n    line-height: inherit; }\n\n/* line 32, stdin */\n.side-nav .collapsible-body {\n  border: 0; }\n  /* line 34, stdin */\n  .side-nav .collapsible-body li a {\n    margin: 0 1rem 0 2rem; }\n\n/* line 40, stdin */\n.collapsible.popout > li {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  margin: 0 24px;\n  -webkit-transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }\n\n/* line 46, stdin */\n.collapsible.popout > li.active {\n  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n  margin: 16px 0; }\n")
var Velocity;

Velocity = require("velocity-animate");

module.exports = {
  mixins: [require("vue-mixins/onClickEvent")],
  props: {
    "header": {
      type: String,
      "default": ""
    },
    "active": {
      type: Boolean,
      "default": false
    }
  },
  data: function() {
    return {
      style: {
        display: "none"
      }
    };
  },
  methods: {
    show: function() {
      this.active = true;
      Velocity(this.$els.body, "stop");
      return Velocity(this.$els.body, "slideDown", {
        duration: 350,
        easing: "easeOutQuart",
        queue: false
      });
    },
    hide: function() {
      this.active = false;
      Velocity(this.$els.body, "stop");
      return Velocity(this.$els.body, "slideUp", {
        duration: 350,
        easing: "easeOutQuart",
        queue: false
      });
    },
    open: function() {
      return this.show();
    },
    close: function() {
      return this.hide();
    },
    toggle: function() {
      return this.active = !this.active;
    }
  },
  compiled: function() {
    if (this.active) {
      this.style.display = "block";
    }
    return this.onClick((function(_this) {
      return function() {
        return _this.toggle();
      };
    })(this));
  },
  watch: {
    "active": function(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          return this.close();
        } else {
          return this.open();
        }
      }
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<li v-bind:class=\"{active:active}\"><a @click=\"click\" class=\"collapsible-header\">{{header}}</a><div v-el:body=\"v-el:body\" v-bind:style=\"style\" class=\"collapsible-body\"><slot>No content</slot></div></li>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 2, stdin */\n.collapsible-header {\n  display: block;\n  cursor: pointer;\n  padding: 0 1rem; }\n  /* line 6, stdin */\n  .collapsible-header i {\n    width: 2rem;\n    font-size: 1.6rem;\n    display: block;\n    float: left;\n    text-align: center;\n    margin-right: 1rem; }\n\n/* line 15, stdin */\n.collapsible-body {\n  display: none; }\n  /* line 17, stdin */\n  .collapsible-body p {\n    margin: 0;\n    padding: 2rem; }\n\n/* line 25, stdin */\n.side-nav .collapsible-header {\n  background-color: transparent;\n  border: none;\n  height: inherit;\n  margin: 0 1rem; }\n  /* line 30, stdin */\n  .side-nav .collapsible-header i {\n    line-height: inherit; }\n\n/* line 32, stdin */\n.side-nav .collapsible-body {\n  border: 0; }\n  /* line 34, stdin */\n  .side-nav .collapsible-body li a {\n    margin: 0 1rem 0 2rem; }\n\n/* line 40, stdin */\n.collapsible.popout > li {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  margin: 0 24px;\n  -webkit-transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }\n\n/* line 46, stdin */\n.collapsible.popout > li.active {\n  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n  margin: 16px 0; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}