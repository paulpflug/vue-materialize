(function() {
  var camelize, i, len, materialize, name, ref, req;

  materialize = {};

  camelize = function(str) {
    return str.replace(/-(\w)/g, function(_, c) {
      if (c) {
        return c.toUpperCase();
      } else {
        return '';
      }
    });
  };

  req = require.context("..", false, /.js$/);

  ref = ["card", "collapsible-item", "collapsible", "dropdown", "fixed-action-button", "input-field", "material-box", "modal", "parallax", "pushpin", "scrollfire", "scrollspy-item", "scrollspy", "select-option", "select", "side-nav", "switch", "toaster", "tooltip", "waves"];
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    materialize[camelize(name)] = req("./" + name + ".js");
  }

  require('./materialize.config.scss');

  if (module.exports !== null) {
    module.exports = materialize;
  } else {
    window.vueMaterialize = materialize;
  }

}).call(this);
