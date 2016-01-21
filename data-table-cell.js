require("insert-css")(".data-table-cell{position:relative;border-right:1px solid #000;margin-right:2px;overflow:hidden;white-space:nowrap;display:inline-block;line-height:1}");
var __vue_template__ = "<div v-style=\"style\" v-class=\"class\" class=\"data-table-cell\"></div>";
module.exports = {
  el: function() {
    return document.createElement("div");
  },
  data: function() {
    return {
      style: {
        width: null,
        height: null
      },
      "class": "",
      child: null,
      data: null,
      unwatch: null
    };
  },
  methods: {
    insertChild: function() {
      var base;
      if (this.child != null) {
        if (this.child["class"] != null) {
          this["class"] = this.child["class"];
        }
        return typeof (base = this.child).$appendTo === "function" ? base.$appendTo(this.$el) : void 0;
      }
    },
    setStyleWidth: function(width) {
      return this.style.width = width;
    }
  },
  watch: {
    "child": "insertChild",
    "data": function(data) {
      var ref;
      return (ref = this.child) != null ? ref.data = data : void 0;
    }
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
