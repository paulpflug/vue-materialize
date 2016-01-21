require("insert-css")(".data-table-column{position:relative;border-right:1px solid #000;margin-right:2px;overflow:hidden;white-space:nowrap;display:inline-block}");
var __vue_template__ = "<div v-el=\"column\" v-style=\"style\" class=\"data-table-column\"><resizer v-if=\"resize\" side=\"{{resizeSide}}\" parent-size=\"{{@style.width}}\" min-size=\"{{minWidth}}\" max-size=\"{{maxWidth}}\" content-size=\"{{contentWidth}}\" offset=\"5\"></resizer><span v-el=\"label\"><content></content></span></div>";
module.exports = {
  components: {
    "resizer": require("./resizer")
  },
  props: {
    "field": {
      type: String,
      required: true
    },
    "resize": {
      type: Boolean,
      "default": true
    },
    "pinned": {
      type: Boolean,
      "default": false
    },
    "width": {
      type: Number,
      "default": 80
    },
    "minWidth": {
      type: Number,
      "default": -1
    },
    "contentWidth": {
      type: Number,
      "default": -1
    },
    "maxWidth": {
      type: Number,
      "default": Number.MAX_VALUE
    },
    "cellRender": {
      type: Object,
      "default": function() {
        return require("./data-table-cell-text");
      }
    },
    "cellOptions": {
      type: Object,
      "default": function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      resizeSide: "right",
      style: {
        width: this.width + "px"
      },
      isDataTableColumn: true,
      contentWidthSet: this.contentWidth > -1
    };
  },
  methods: {
    updateStyle: function(width) {
      return this.style.width = width + "px";
    },
    processMinWidth: function() {
      if (this.width < this.minWidth) {
        this.updateStyle(this.minWidth);
        return true;
      }
    },
    processMaxWidth: function() {
      if (this.width > this.maxWidth) {
        this.updateStyle(this.maxWidth);
        return true;
      }
    },
    processWidth: function() {
      if (!(processMinWidth() || processMaxWidth())) {
        return this.updateStyle(this.width);
      }
    }
  },
  attached: function() {
    if (this.minWidth < 0) {
      this.minWidth = this.$$.label.offsetWidth + 4;
    }
    if (!this.contentWidthSet) {
      return this.contentWidth = this.$$.label.offsetWidth + 8;
    }
  },
  watch: {
    "width": "processWidth",
    "maxWidth": "processMaxWidth",
    "minWidth": "processMinWidth"
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
