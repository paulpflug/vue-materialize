(function() {
  var overlay;

  overlay = null;

  module.exports = function(Vue) {
    if (overlay == null) {
      overlay = new Vue(require('./overlay-component'));
    }
    return overlay;
  };

}).call(this);
