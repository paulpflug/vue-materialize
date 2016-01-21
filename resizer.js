module.exports = {
  mixins: [require("vue-mixins/onDocument")],
  props: {
    "offset": {
      type: Number,
      "default": 0
    },
    "size": {
      type: Number,
      "default": 10
    },
    "minSize": {
      type: Number,
      "default": 0
    },
    "contentSize": {
      type: Number,
      "default": -1
    },
    "maxSize": {
      type: Number,
      "default": Number.MAX_VALUE
    },
    "side": {
      type: String,
      required: true
    },
    "parentSize": {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      startPos: 0,
      startSize: 0,
      removeMoveListener: null,
      removeEndListener: null,
      horizontal: true,
      plus: true,
      minSizeNumber: 0,
      contentSizeNumber: -1,
      style: {
        position: "absolute",
        width: null,
        height: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        cursor: "auto"
      }
    };
  },
  methods: {
    updateMinSize: function() {
      if (parseInt(this.parentSize.replace("px", ""), 10) < this.minSize) {
        return this.parentSize = this.minSize + "px";
      }
    },
    updateMaxSize: function() {
      if (parseInt(this.parentSize.replace("px", ""), 10) > this.maxSize) {
        return this.parentSize = this.maxSize + "px";
      }
    },
    resetSize: function() {
      if (this.contentSize > -1) {
        return this.parentSize = this.contentSize + "px";
      }
    },
    dragStart: function(e) {
      var ref;
      if ((ref = document.selection) != null) {
        ref.empty();
      }
      if (typeof window.getSelection === "function") {
        window.getSelection().removeAllRanges();
      }
      this.startSize = parseInt(this.parentSize.replace("px", ""), 10);
      if (this.horizontal) {
        this.startPos = e.clientX;
      } else {
        this.startPos = e.clientY;
      }
      document.body.style.cursor = this.style.cursor;
      this.removeMoveListener = this.onDocument("mousemove", this.drag);
      return this.removeEndListener = this.onceDocument("mouseup", this.dragEnd);
    },
    drag: function(e) {
      var moved, newSize, pos;
      if (this.horizontal) {
        pos = e.clientX;
      } else {
        pos = e.clientY;
      }
      moved = pos - this.startPos;
      if (!this.plus) {
        moved = -moved;
      }
      newSize = this.startSize + moved;
      if (newSize < this.minSize) {
        newSize = this.minSize;
      } else if (newSize > this.maxSize) {
        newSize = this.maxSize;
      }
      this.parentSize = newSize + "px";
      return e.preventDefault();
    },
    dragEnd: function() {
      document.body.style.cursor = null;
      if (typeof this.removeMoveListener === "function") {
        this.removeMoveListener();
      }
      if (typeof this.removeEndListener === "function") {
        this.removeEndListener();
      }
      return true;
    },
    setStyle: function() {
      switch (this.side) {
        case "top":
        case "bottom":
          this.horizontal = false;
          break;
        case "left":
        case "right":
          this.horizontal = true;
      }
      switch (this.side) {
        case "top":
        case "left":
          this.plus = false;
          break;
        case "right":
        case "bottom":
          this.plus = true;
      }
      this.style.right = null;
      this.style.bottom = null;
      if (this.horizontal) {
        this.style.width = this.size + "px";
        this.style.height = "100%";
        this.style.top = "0";
        this.style.left = null;
        this.style.cursor = "ew-resize";
      } else {
        this.style.width = "100%";
        this.style.height = this.size + "px";
        this.style.top = null;
        this.style.left = "0";
        this.style.cursor = "ns-resize";
      }
      return this.style[this.side] = -this.offset + "px";
    }
  },
  compiled: function() {
    return this.setStyle();
  },
  watch: {
    "minSize": "updateMinSize",
    "maxSize": "updateMaxSize",
    "side": "setStyle"
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-bind:style=\"style\" @mousedown=\"dragStart\" @dblclick=\"resetSize\" class=\"resizer\"></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}