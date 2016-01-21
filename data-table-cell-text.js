var __vue_template__ = "<span>{{data}}</span>";
module.exports = {
  el: function() {
    return document.createElement("div");
  },
  data: function() {
    return {
      data: "",
      "class": "data-table-cell-text"
    };
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
