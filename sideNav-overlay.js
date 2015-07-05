require("insert-css")("#sidenav-overlay{position:fixed;top:0;left:0;right:0;height:120vh;background-color:rgba(0,0,0,.5);z-index:997;will-change:opacity}");
var __vue_template__ = "<div id=\"sidenav-overlay\" style=\"{{left}}{{right}}{{opacity}}\" v-on=\"click:click\"></div>";
module.exports = {
  mixins: [require("vue-mixins/left"), require("vue-mixins/right"), require("vue-mixins/opacity")],
  el: function() {
    return document.createElement("div");
  },
  data: function() {},
  methods: {
    click: function() {
      return this.$emit("click");
    }
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
