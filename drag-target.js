var __vueify_style__ = require("vueify-insert-css").insert("/* line 3, stdin */\n#drag-target {\n  height: 100%;\n  width: 20px;\n  position: fixed;\n  top: 0;\n  z-index: 998; }\n")
module.exports = {
  mixins: [require("vue-mixins/onClick")],
  el: function() {
    return document.createElement("div");
  },
  props: {
    "factor": {
      type: Number,
      "default": 1,
      coerce: Number
    },
    "edge": {
      type: String,
      "default": "left"
    },
    "onMove": {
      type: Function,
      required: true
    },
    "onOpen": {
      type: Function,
      required: true
    },
    "onOpenAbort": {
      type: Function,
      required: true
    },
    "onClose": {
      type: Function,
      required: true
    },
    "onCloseAbort": {
      type: Function,
      required: true
    },
    "maxOpen": {
      type: Number,
      required: true
    },
    "width": {
      type: String,
      "default": "70%"
    }
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
  compiled: function() {
    return this.close();
  },
  methods: {
    send: function(left) {
      if ((this.opened && this.edge !== "left") || (!this.opened && this.edge === "left")) {
        this.style.right = void 0;
        return this.style.left = 0;
      } else {
        this.style.right = 0;
        return this.style.left = void 0;
      }
    },
    open: function() {
      this.opened = true;
      this.style.width = this.width;
      return this.send();
    },
    close: function() {
      this.opened = false;
      this.style.width = void 0;
      return this.send();
    },
    onPan: function(event) {
      var dX;
      if (event.type === "pan") {
        dX = event.deltaX * this.factor;
        if (this.edge === "left") {
          if (!this.opened) {
            if (!event.isFinal && dX > 0 && dX < this.maxOpen) {
              return this.onMove(dX);
            } else {
              if (dX > this.maxOpen) {
                return this.onOpen();
              } else {
                return this.onOpenAbort();
              }
            }
          } else {
            if (!event.isFinal && dX < 0 && dX > -this.maxOpen) {
              return this.onMove(this.maxOpen + dX);
            } else {
              if (dX < -this.maxOpen) {
                return this.onClose();
              } else {
                return this.onCloseAbort();
              }
            }
          }
        }
      }
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div id=\"drag-target\" v-bind:style=\"style\" @click=\"click\" v-touch:pan=\"onPan\"></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 3, stdin */\n#drag-target {\n  height: 100%;\n  width: 20px;\n  position: fixed;\n  top: 0;\n  z-index: 998; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}