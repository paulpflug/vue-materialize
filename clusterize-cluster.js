require("insert-css")("div.clusterize-cluster{overflow:visible;margin:0;padding:0;position:relative}");
var __vue_template__ = "<div v-el=\"cluster\" v-attr=\"top\" class=\"clusterize-cluster\"></div>";
module.exports = {
  props: {
    "top": {
      type: Number
    },
    "rowHeight": {
      type: Number
    },
    "rows": {
      type: Array,
      "default": function() {
        return [];
      }
    },
    "data": {
      type: Array,
      "default": function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      isCluster: true
    };
  },
  methods: {
    redrawRows: function(newRows, oldRows) {
      var j, k, lastRow, len, len1, ref, row;
      for (j = 0, len = oldRows.length; j < len; j++) {
        row = oldRows[j];
        if (newRows.indexOf(row) < 0) {
          row.$remove();
        }
      }
      if (newRows.length > 0) {
        lastRow = newRows[0];
        lastRow.$appendTo(this.$$.cluster);
        if (newRows.length > 1) {
          ref = newRows.slice(1);
          for (k = 0, len1 = ref.length; k < len1; k++) {
            row = ref[k];
            row.$after(lastRow.$el);
            lastRow = row;
          }
        }
      }
      return this.updateRowHeight();
    },
    updateRowHeight: function() {
      var j, len, ref, results, row;
      if (this.rowHeight > 0) {
        ref = this.rows;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          row = ref[j];
          results.push(row.rowHeight = this.rowHeight);
        }
        return results;
      }
    },
    updateData: function() {
      var i, j, len, ref, results, row;
      ref = this.rows;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        row = ref[i];
        if (this.data[i] != null) {
          results.push(row.render(this.data[i]));
        } else {
          results.push(row.render());
        }
      }
      return results;
    }
  },
  watch: {
    "data": "updateData",
    "rows": "redrawRows",
    "rowHeight": "updateRowHeight"
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
