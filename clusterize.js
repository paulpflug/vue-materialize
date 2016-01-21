require("insert-css")(".clusterize{float:left;height:100%}.clusterize.scroll-bar-x:hover{overflow-x:auto}.clusterize.scroll-bar-y:hover{overflow-y:auto}");
var __vue_template__ = "<div v-style=\"style\" v-class=\"scroll-bar-x:scrollBars.x, scroll-bar-y:scrollBars.y\" v-on=\"mouseenter:onHover,mouseleave:onHover,scroll:onScroll\" class=\"clusterize\"><div v-el=\"firstRow\" v-style=\"firstRowStyle\" class=\"clusterize-first-row\"></div><clusterize-cluster row-height=\"{{rowHeight}}\"></clusterize-cluster><clusterize-cluster row-height=\"{{rowHeight}}\"></clusterize-cluster><clusterize-cluster row-height=\"{{rowHeight}}\"></clusterize-cluster><clusterize-cluster row-height=\"{{rowHeight}}\"></clusterize-cluster><div v-el=\"lastRow\" v-style=\"lastRowStyle\" class=\"clusterize-last-row\"></div></div>";
var Vue;

Vue = require('vue');

module.exports = {
  components: {
    "clusterize-cluster": require("./clusterize-cluster")
  },
  props: {
    "width": {
      type: Number,
      "default": -1
    },
    "maxWidth": {
      type: Number,
      "default": -1
    },
    "height": {
      type: Number,
      "default": -1
    },
    "position": {
      type: Number,
      "default": 0
    },
    "scrollBars": {
      type: Object,
      "default": function() {
        return {
          x: true,
          y: true
        };
      }
    },
    "rowsBuilder": {
      type: Function,
      required: true
    },
    "autoStart": {
      type: Boolean,
      "default": true
    },
    "data": {
      type: Array,
      "default": function() {
        return [];
      }
    },
    "dataGetter": {
      type: Function,
      "default": function() {
        return [];
      }
    },
    "rowCounter": {
      type: Function,
      "default": function() {
        return 0;
      }
    },
    "scrollPosition": {
      type: Object,
      "default": function() {
        return {
          left: -1,
          top: -1
        };
      }
    }
  },
  data: function() {
    return {
      style: {
        width: null,
        height: null,
        "max-width": null
      },
      firstRowStyle: {
        height: null
      },
      lastRowStyle: {
        height: null
      },
      rowCount: this.data.length,
      rowHeight: -1,
      rows: [],
      rowsCount: -1,
      clustersCount: -1,
      clusterHeight: null,
      clusterSize: 25,
      clusters: [],
      clustersBelow: 3,
      clusterVisible: 0,
      clusterVisibleLast: -1,
      minHeight: null,
      scrollBarSize: {
        height: 0,
        width: 0
      }
    };
  },
  methods: {
    getRows: function(count) {
      var j, len, ref, row;
      if (this.rows.length >= count) {
        return this.rows.slice(0, count);
      } else {
        ref = this.rowsBuilder(count - this.rows.length);
        for (j = 0, len = ref.length; j < len; j++) {
          row = ref[j];
          this.rows.push(row);
        }
        return this.rows;
      }
    },
    calcRowHeight: function(dataSet, cb) {
      this.clusters[0].rows = this.getRows(1);
      return this.$nextTick((function(_this) {
        return function() {
          _this.clusters[0].rows[0].render(dataSet);
          return _this.$nextTick(function() {
            _this.rowHeight = _this.clusters[0].rows[0].$el.offsetHeight;
            _this.calcClusterSize();
            return cb();
          });
        };
      })(this));
    },
    calcClusterSize: function() {
      this.clusterSize = Math.ceil(this.$el.offsetHeight / this.rowHeight);
      if (this.rowsCount) {
        this.clustersCount = Math.ceil(this.rowsCount / this.clusterSize);
        this.updateLastRow();
      }
      this.fillClustersWithRows();
      return this.clusterHeight = this.rowHeight * this.clusterSize;
    },
    fillClustersWithRows: function() {
      var cluster, i, j, len, ref, results, rows;
      rows = this.getRows(4 * this.clusterSize);
      ref = this.clusters;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        cluster = ref[i];
        results.push(cluster.rows = rows.slice(i * this.clusterSize, (i + 1) * this.clusterSize));
      }
      return results;
    },
    onScroll: function(e) {
      var left, top;
      top = this.$el.scrollTop;
      left = this.$el.scrollLeft;
      if (this.scrollPosition.left !== left) {
        this.scrollPosition.left = left;
      }
      if (this.scrollPosition.top !== top) {
        this.scrollPosition.top = top;
        return this.processScroll(top);
      }
    },
    setPosition: function(pos) {
      if (pos == null) {
        pos = this.position;
      }
      if (pos > -1 && this.rowHeight > -1) {
        this.setScrollPosition.top = this.rowHeight * this.position;
        return true;
      }
    },
    setScrollPosition: function() {
      this.setScrollTop(this.scrollPosition.top);
      return this.setScrollLeft(this.scrollPosition.left);
    },
    setScrollTop: function(top) {
      if (top > -1 && this.$el.scrollTop !== top) {
        this.$el.scrollTop = top;
        return this.processScroll(top);
      }
    },
    setScrollLeft: function(left) {
      if (left > -1 && this.$el.scrollLeft !== left) {
        return this.$el.scrollLeft = left;
      }
    },
    processScroll: function(top) {
      if (top < 0) {
        this.setPosition();
        return this.$nextTick((function(_this) {
          return function() {
            top = _this.$el.scrollTop;
            if (top === 0) {
              _this.visibleCluster = 0;
            } else {
              _this.visibleCluster = Math.floor(top / _this.clusterHeight);
            }
            return _this.processClusterChange(top);
          };
        })(this));
      } else {
        if (top === 0) {
          this.visibleCluster = 0;
        } else {
          this.visibleCluster = Math.floor(top / this.clusterHeight);
        }
        if (this.clusterVisibleLast !== this.visibleCluster) {
          this.processClusterChange(top);
          return this.clusterVisibleLast = this.visibleCluster;
        }
      }
    },
    getData: function(first, last, cb) {
      if (this.dataGetter) {
        return this.dataGetter(first, last).then(cb);
      } else {
        return cb(this.data.slice(first, last));
      }
    },
    fillClusterWithData: function(cluster, first, last) {
      if (this.rowsCount > -1 && this.rowsCount <= first) {
        return cluster.data = [];
      } else {
        return this.getData(first, last, (function(_this) {
          return function(data) {
            return cluster.data = data;
          };
        })(this));
      }
    },
    processClusterChange: function(top) {
      var absI, j, newTop, ref, ref1, relI;
      if (this.visibleCluster === 0) {
        this.clustersBelow = 3;
      } else if (this.visibleCluster === 1) {
        this.clustersBelow = 2;
      } else if (this.visibleCluster === this.clustersCount - 2) {
        this.clustersBelow = 1;
      } else if (this.visibleCluster === this.clustersCount - 1) {
        this.clustersBelow = 0;
      } else if (this.clusterVisibleLast < this.visibleCluster) {
        this.clustersBelow = 2;
      } else {
        this.clustersBelow = 1;
      }
      for (absI = j = ref = this.visibleCluster - 3 + this.clustersBelow, ref1 = this.visibleCluster + this.clustersBelow; ref <= ref1 ? j <= ref1 : j >= ref1; absI = ref <= ref1 ? ++j : --j) {
        newTop = absI * this.clusterHeight;
        relI = absI % 4;
        if (this.clusters[relI].top !== newTop) {
          if (this.clusters[relI].top > newTop) {
            this.clusters[relI].$after(this.$$.firstRow);
          } else {
            this.clusters[relI].$before(this.$$.lastRow);
          }
          this.clusters[relI].top = newTop;
          this.fillClusterWithData(this.clusters[relI], absI * this.clusterSize, (absI + 1) * this.clusterSize);
        }
      }
      this.updateFirstRow();
      if (this.rowsCount) {
        return this.updateLastRow();
      }
    },
    updateFirstRow: function() {
      var newHeight;
      newHeight = (this.visibleCluster - (3 - this.clustersBelow)) * this.clusterHeight;
      if (newHeight > 0) {
        return this.firstRowStyle.height = newHeight + "px";
      } else {
        return this.firstRowStyle.height = null;
      }
    },
    updateLastRow: function() {
      var newHeight;
      newHeight = (this.rowsCount - (this.visibleCluster + this.clustersBelow + 1) * this.clusterSize) * this.rowHeight;
      if (newHeight > 0) {
        return this.lastRowStyle.height = newHeight + "px";
      } else {
        return this.lastRowStyle.height = null;
      }
    },
    processCount: function() {
      var get, process;
      get = (function(_this) {
        return function(cb) {
          if (_this.rowCounter) {
            return _this.rowCounter().then(cb);
          } else {
            return cb(_this.data.length);
          }
        };
      })(this);
      process = (function(_this) {
        return function(count) {
          if (count > 0) {
            _this.rowsCount = count;
            _this.clustersCount = Math.ceil(_this.rowsCount / _this.clusterSize);
            return _this.updateLastRow();
          }
        };
      })(this);
      return get(process);
    },
    start: function() {
      if (this.data.length > 0) {
        this.$watch("data", this.processData);
      }
      return this.getData(0, 1, (function(_this) {
        return function(data) {
          _this.processCount();
          return _this.calcRowHeight(data[0], function() {
            _this.processScroll(-1);
            return _this.onHover();
          });
        };
      })(this));
    },
    processData: function(newData, oldData) {
      if (newData !== oldData) {
        this.setPosition = 0;
        return this.processCount();
      }
    },
    onHover: function() {
      if (this.scrollBars.y) {
        this.checkScrollBarWidth();
      }
      if (this.scrollBars.x) {
        return this.$nextTick(this.checkScrollBarHeight);
      }
    },
    checkScrollBarHeight: function() {
      return this.scrollBarSize.height = this.$el.offsetHeight - this.$el.clientHeight;
    },
    checkScrollBarWidth: function() {
      return this.scrollBarSize.width = this.$el.offsetWidth - this.$el.clientWidth;
    },
    updateHeight: function(height, oldHeight) {
      if (height == null) {
        height = this.height;
      }
      if (height > 0) {
        this.style.height = height + "px";
      } else {
        this.style.height = null;
      }
      if (this.rowHeight > -1 && Math.abs(oldHeight - height) > 0.8 * height) {
        return this.$nextTick(this.calcClusterSize);
      }
    },
    updateWidth: function(width) {
      if (width == null) {
        width = this.width;
      }
      if (width > 0) {
        return this.style.width = width + "px";
      } else {
        return this.style.width = null;
      }
    },
    updateMaxWidth: function(width) {
      if (width == null) {
        width = this.maxWidth;
      }
      return this.style["max-width"] = width + "px";
    }
  },
  compiled: function() {
    var cluster, j, len, ref, results;
    if (this.height) {
      this.updateHeight();
    }
    if (this.width) {
      this.updateWidth();
    }
    if (this.maxWidth) {
      this.updateMaxWidth();
    }
    ref = this.$children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      cluster = ref[j];
      if (cluster.isCluster) {
        results.push(this.clusters.push(cluster));
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  ready: function() {
    if (this.autoStart) {
      return this.start();
    }
  },
  watch: {
    "width": "updateWidth",
    "height": "updateHeight",
    "maxWidth": "updateMaxWidth",
    "scrollPosition.top": "setScrollTop",
    "scrollPosition.left": "setScrollLeft",
    "position": "setPosition"
  }
};

;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;
