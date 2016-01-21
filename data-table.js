require("insert-css")(".dt-main,.dt-main div{overflow:hidden;margin:0;padding:0;white-space:nowrap}.dt-main,.dt-main>.dt-content{height:100%}.dt-main .dt-pinned,.dt-main .dt-unpinned{display:inline-block;line-height:1}.dt-header{line-height:0;border-bottom:1px solid #000}");
var __vue_template__ = "<div v-style=\"style\" v-class=\"size-spy-sibling: sizeSpy\" class=\"dt-main\"><div v-el=\"header\" class=\"dt-header\"><div v-el=\"pinned\" class=\"dt-pinned\"></div><div v-el=\"unpinned\" v-style=\"flexHeaderStyle\" class=\"dt-unpinned\"><content>No columns</content></div></div><clusterize rows-builder=\"{{rowsBuilderPinned}}\" data=\"{{data}}\" data-getter=\"{{dataGetter}}\" row-counter=\"{{rowCounter}}\" auto-start=\"false\" scroll-bars=\"{{noScrollBars}}\" v-ref=\"clusterizePinned\" height=\"{{pinnedContentHeight}}\"></clusterize><clusterize rows-builder=\"{{rowsBuilderUnpinned}}\" data=\"{{data}}\" data-getter=\"{{dataGetter}}\" row-counter=\"{{rowCounter}}\" auto-start=\"false\" v-ref=\"clusterizeUnpinned\" height=\"{{flexContent.height}}\" width=\"{{flexContent.width}}\" max-width=\"{{flexContent['max-width']}}\"></clusterize></div>";
var Vue;

Vue = require('vue');

module.exports = {
  components: {
    "clusterize": require("./clusterize")
  },
  props: {
    "height": {
      type: Number,
      "default": -1
    },
    "width": {
      type: Number,
      "default": -1
    },
    "maxWidth": {
      type: Number,
      "default": -1
    },
    "sizeSpy": {
      type: Object
    },
    "find": {
      type: Function
    },
    "count": {
      type: Function
    },
    "data": {
      type: Array,
      "default": function() {
        return [];
      }
    },
    "columns": {
      type: Array,
      "default": function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      noScrollBars: {
        x: false,
        y: false
      },
      style: {
        height: null,
        width: null,
        "max-width": null
      },
      pinnedContentHeight: -1,
      flexContent: {
        height: -1,
        width: -1,
        "max-width": -1
      },
      flexHeaderStyle: {
        width: null,
        "max-width": null
      },
      pinnedColumns: [],
      columnsWidthWatcher: [],
      unpinnedColumns: [],
      fields: "",
      filter: {},
      getter: null
    };
  },
  methods: {
    dataGetter: function(start, end) {
      return this.getter = this.find(this.filter, this.fields, {
        skip: start,
        limit: end - start
      }).then(function(data) {
        return data.slice(start, end);
      });
    },
    rowCounter: function() {
      return this.count(this.filter);
    },
    getColumns: function() {
      var child, columns, i, len, ref;
      columns = [];
      ref = this.$children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if (child.isDataTableColumn) {
          columns.push(child);
        }
      }
      return this.columns = columns;
    },
    processColumns: function() {
      var column, i, k, len, len1, pinned, ref, ref1, unpinned, unwatch;
      ref = this.columnsWidthWatcher;
      for (i = 0, len = ref.length; i < len; i++) {
        unwatch = ref[i];
        unwatch();
      }
      pinned = [];
      unpinned = [];
      this.fields = "";
      ref1 = this.columns;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        column = ref1[k];
        this.fields += column.field + " ";
        if (column.pinned) {
          pinned.push(column);
          if (this.maxWidth || this.sizeSpy || this.width) {
            this.columnsWidthWatcher.push(column.$watch("style.width", (function(_this) {
              return function() {
                _this.processWidth();
                return _this.processMaxWidth();
              };
            })(this)));
          }
          column.$appendTo(this.$$.pinned);
        } else {
          unpinned.push(column);
          if (this.maxWidth || this.sizeSpy) {
            this.columnsWidthWatcher.push(column.$watch("style.width", (function(_this) {
              return function() {
                return _this.updateFlexMaxWidth();
              };
            })(this)));
          }
          column.$appendTo(this.$$.unpinned);
        }
      }
      this.pinnedColumns = pinned;
      return this.unpinnedColumns = unpinned;
    },
    rowsBuilderPinned: function(count) {
      return this.rowsBuilder(count, this.pinnedColumns);
    },
    rowsBuilderUnpinned: function(count) {
      return this.rowsBuilder(count, this.unpinnedColumns);
    },
    rowsBuilder: function(count, columns) {
      var i, j, ref, row, rows;
      rows = [];
      for (j = i = 1, ref = count; 1 <= ref ? i <= ref : i >= ref; j = 1 <= ref ? ++i : --i) {
        row = new Vue(require("./data-table-row"));
        row.columns = columns;
        rows.push(row);
      }
      return rows;
    },
    processHeight: function(height) {
      this.style.height = height + "px";
      this.flexContent.height = height - this.$$.header.offsetHeight;
      return this.updatePinnedContentHeight();
    },
    updatePinnedContentHeight: function(scrollBarSize) {
      if (scrollBarSize == null) {
        scrollBarSize = this.$.clusterizeUnpinned.scrollBarSize.height;
      }
      return this.pinnedContentHeight = this.flexContent.height - scrollBarSize;
    },
    processWidth: function(width) {
      var column, i, len, ref;
      if (width == null) {
        width = this.width;
      }
      if (width) {
        ref = this.columns;
        for (i = 0, len = ref.length; i < len; i++) {
          column = ref[i];
          column.maxWidth = width / 2;
        }
        this.style.width = width + "px";
        this.flexContent.width = width - this.$$.pinned.offsetWidth;
        return this.updateFlexHeaderWidth();
      }
    },
    updateFlexHeaderWidth: function(scrollBarSize) {
      var width;
      width = this.flexContent.width;
      if (width == null) {
        width = this.$.clusterizeUnpinned.$el.offsetWidth;
      }
      if (scrollBarSize == null) {
        scrollBarSize = this.$.clusterizeUnpinned.scrollBarSize.width;
      }
      return this.flexHeaderStyle.width = width - scrollBarSize + "px";
    },
    processMaxWidth: function(width) {
      var column, flexWidth, i, len, ref;
      if (width == null) {
        width = this.maxWidth;
      }
      if (width) {
        this.maxWidth = this.sizeSpy.width;
        ref = this.columns;
        for (i = 0, len = ref.length; i < len; i++) {
          column = ref[i];
          column.maxWidth = width / 2;
        }
        this.style["max-width"] = width + "px";
        flexWidth = width - this.$$.pinned.offsetWidth;
        this.flexContent["max-width"] = flexWidth;
        this.flexHeaderStyle["max-width"] = flexWidth + "px";
        return this.updateFlexMaxWidth();
      }
    },
    updateFlexMaxWidth: function(scrollBarSize) {
      if (this.maxWidth) {
        if (scrollBarSize == null) {
          scrollBarSize = this.$.clusterizeUnpinned.scrollBarSize.width;
        }
        if (scrollBarSize) {
          if (this.maxWidth === this.$el.offsetWidth) {
            return this.flexHeaderStyle.width = this.flexContent["max-width"] - scrollBarSize + "px";
          } else {
            return this.flexContent.width = this.$$.unpinned.offsetWidth + scrollBarSize;
          }
        } else {
          this.flexHeaderStyle.width = null;
          return this.flexContent.width = -1;
        }
      }
    }
  },
  ready: function() {
    this.getColumns();
    if (this.sizeSpy != null) {
      this.height = this.sizeSpy.height;
      this.sizeSpy.$watch("height", this.processHeight);
      this.maxWidth = this.sizeSpy.width;
      this.sizeSpy.$watch("width", this.processMaxWidth);
      this.$.clusterizeUnpinned.$watch("scrollBarSize.width", this.updateFlexMaxWidth, {
        immediate: true
      });
    } else {
      if (this.height) {
        this.processHeight(this.height);
      }
      if (this.width) {
        this.processWidth(this.width);
      }
      if (this.maxWidth) {
        this.processMaxWidth(this.maxWidth);
      }
      this.$.clusterizeUnpinned.$watch("scrollBarSize.width", this.updateFlexHeaderWidth, {
        immediate: true
      });
    }
    this.$nextTick((function(_this) {
      return function() {
        _this.$.clusterizePinned.start();
        return _this.$.clusterizeUnpinned.start();
      };
    })(this));
    this.$.clusterizeUnpinned.$watch("scrollBarSize.height", this.updatePinnedContentHeight);
    this.$.clusterizeUnpinned.$watch("scrollPosition.left", (function(_this) {
      return function(left) {
        return _this.$$.unpinned.scrollLeft = left;
      };
    })(this));
    return this.$.clusterizeUnpinned.$watch("scrollPosition.top", (function(_this) {
      return function(top) {
        return _this.$.clusterizePinned.scrollPosition.top = top;
      };
    })(this));
  },
  watch: {
    "columns": "processColumns",
    "width": "processWidth",
    "height": "processHeight",
    "maxWidth": "processMaxWidth"
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
