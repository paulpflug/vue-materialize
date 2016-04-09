(function() {
  var Velocity, sideNav;

  Velocity = require("velocity-animate");

  require("./overlay");

  sideNav = require("vue-side-nav");

  sideNav.props.transition["default"] = function(arg) {
    var cb, el, style;
    el = arg.el, style = arg.style, cb = arg.cb;
    Velocity(el, "stop");
    return Velocity(el, style, {
      duration: 300,
      queue: false,
      easing: 'easeOutQuad',
      complete: cb
    });
  };

  module.exports = sideNav;

}).call(this);
