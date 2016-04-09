(function() {
  var Velocity, ci;

  Velocity = require("velocity-animate");

  ci = require("vue-comps-dropdown");

  ci.props.transitionIn["default"] = function(arg) {
    var cb, el;
    el = arg.el, cb = arg.cb;
    Velocity(el, "stop");
    Velocity(el, "slideDown", {
      duration: 300,
      queue: false,
      easing: 'easeOutCubic',
      complete: cb
    });
    return Velocity(el, {
      opacity: 1
    }, {
      duration: 300,
      queue: false,
      easing: 'easeOutSine'
    });
  };

  ci.props.transitionOut["default"] = function(arg) {
    var cb, el;
    el = arg.el, cb = arg.cb;
    Velocity(el, "stop");
    return Velocity(el, {
      opacity: 0
    }, {
      duration: 225,
      queue: false,
      easing: 'easeOutSine',
      complete: cb
    });
  };

  module.exports = ci;

}).call(this);
