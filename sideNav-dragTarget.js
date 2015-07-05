require("insert-css")("#drag-target{height:100%;width:10px;position:fixed;top:0;z-index:998}");
var __vue_template__ = "<div id=\"drag-target\" style=\"{{left}}{{right}}\" v-on=\"click:click\"></div>";
module.exports = {
  mixins: [require("vue-mixins/left"), require("vue-mixins/right"), require("vue-mixins/width")],
  el: function() {
    return document.createElement("div");
  },
  methods: {
    click: function() {
      return this.$emit("click");
    }
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
