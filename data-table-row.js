require("insert-css")("div.data-table-row{overflow:visible;line-height:0}");
var __vue_template__ = "<div v-style=\"style\" v-show=\"hasData\" class=\"data-table-row\"></div>";
var Cell, Vue;

Vue = require('vue');

Cell = require("./data-table-cell");

module.exports = {
  el: function() {
    return document.createElement("div");
  },
  data: function() {
    return {
      style: {
        height: null
      },
      columns: [],
      data: null,
      hasData: false,
      cells: {},
      rowHeight: -1
    };
  },
  methods: {
    cleanCells: function() {
      var cell, column, field, i, len, newCells, ref, ref1, ref2;
      newCells = {};
      ref = this.columns;
      for (i = 0, len = ref.length; i < len; i++) {
        column = ref[i];
        if (this.cells[column.field] != null) {
          newCells[column.field] = this.cells[column.field];
        }
      }
      ref1 = this.cells;
      for (field in ref1) {
        cell = ref1[field];
        if (newCells[field] == null) {
          if (typeof cell.unwatch === "function") {
            cell.unwatch();
          }
          if ((ref2 = cell.child) != null) {
            if (typeof ref2.$destroy === "function") {
              ref2.$destroy();
            }
          }
          if (typeof cell.$destroy === "function") {
            cell.$destroy();
          }
        }
      }
      return this.cells = newCells;
    },
    setOptions: function(cell, options) {
      var key, results, val;
      results = [];
      for (key in options) {
        val = options[key];
        results.push(cell[key] = val);
      }
      return results;
    },
    createCell: function(column) {
      var cell, cellChild;
      cell = new Vue(Cell);
      cell.style.width = column.style.width;
      cell.unwatch = column.$watch("style.width", cell.setStyleWidth);
      cellChild = new Vue(column.cellRender);
      this.setOptions(cellChild, column.cellOptions);
      cell.child = cellChild;
      return cell;
    },
    redrawCells: function(newColumns) {
      var cell, column, i, lastCell, len, ref, results;
      if (newColumns == null) {
        newColumns = this.columns;
      }
      if (newColumns) {
        this.cleanCells();
        if (newColumns.length > 0) {
          lastCell = this.createCell(newColumns[0]);
          lastCell.$appendTo(this.$el);
          this.cells[newColumns[0].field] = lastCell;
          if (newColumns.length > 1) {
            ref = newColumns.slice(1);
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              column = ref[i];
              cell = this.createCell(column);
              cell.$after(lastCell.$el);
              this.cells[column.field] = cell;
              results.push(lastCell = cell);
            }
            return results;
          }
        }
      }
    },
    render: function(data) {
      var column, i, len, ref;
      this.hasData = data != null;
      if (this.hasData) {
        ref = this.columns;
        for (i = 0, len = ref.length; i < len; i++) {
          column = ref[i];
          if (data[column.field] != null) {
            this.cells[column.field].data = data[column.field];
          }
        }
        return this.$nextTick((function(_this) {
          return function() {
            var j, len1, ref1, results, width;
            ref1 = _this.columns;
            results = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              column = ref1[j];
              if ((data[column.field] != null) && !column.contentWidthSet) {
                width = _this.cells[column.field].$el.offsetWidth + 8;
                if (width > column.contentWidth) {
                  results.push(column.contentWidth = width);
                } else {
                  results.push(void 0);
                }
              } else {
                results.push(void 0);
              }
            }
            return results;
          };
        })(this));
      }
    },
    updateRowHeight: function() {
      var cell, field, ref, results;
      if (this.rowHeight > 0) {
        ref = this.cells;
        results = [];
        for (field in ref) {
          cell = ref[field];
          results.push(cell.style.height = this.rowHeight + "px");
        }
        return results;
      }
    }
  },
  watch: {
    "columns": "redrawCells",
    "data": "render",
    "rowHeight": "updateRowHeight"
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
