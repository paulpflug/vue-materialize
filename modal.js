(function() {
  var Velocity, modal;

  Velocity = require("velocity-animate");

  require("./overlay");

  modal = require("vue-comps-modal");

  modal.props.bottomSheet = {
    type: Boolean,
    "default": false
  };

  modal.compiled = function() {
    if (this.bottomSheet) {
      return this.classes.push("bottom-sheet");
    }
  };

  modal.props.transitionIn["default"] = function(arg) {
    var cb, el;
    el = arg.el, cb = arg.cb;
    Velocity(el, "stop");
    if (this.bottomSheet) {
      return Velocity(el, {
        bottom: "0",
        opacity: 1
      }, {
        duration: 350,
        queue: false,
        ease: "easeOutCubic",
        complete: cb
      });
    } else {
      Velocity.hook(this.$els.modal, "scaleX", 0.7);
      return Velocity(el, {
        top: "10%",
        opacity: 1,
        scaleX: 1
      }, {
        duration: 350,
        ease: "easeOutCubic",
        complete: cb
      });
    }
  };

  modal.props.transitionOut["default"] = function(arg) {
    var cb, el;
    el = arg.el, cb = arg.cb;
    if (this.bottomSheet) {
      return Velocity(el, {
        bottom: "-100%",
        opacity: 0
      }, {
        duration: 350,
        queue: false,
        ease: "easeOutCubic",
        complete: cb
      });
    } else {
      return Velocity(el, {
        top: "4%",
        opacity: 0,
        scaleX: 0.7
      }, {
        duration: 350,
        ease: "easeOutCubic",
        complete: cb
      });
    }
  };

  module.exports = modal;

}).call(this);
