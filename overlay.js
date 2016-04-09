(function() {
  var Overlay, Velocity;

  Velocity = require("velocity-animate");

  Overlay = require("vue-overlay");

  Overlay.obj.props.fade["default"] = function(arg) {
    var cb, el, opacity;
    el = arg.el, opacity = arg.opacity, cb = arg.cb;
    return Velocity(el, {
      opacity: opacity
    }, {
      duration: 300,
      queue: false,
      easing: 'easeOutQuad',
      complete: cb
    });
  };

}).call(this);
