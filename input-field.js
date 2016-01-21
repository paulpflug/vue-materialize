var __vueify_style__ = require("vueify-insert-css").insert("/* line 2, stdin */\n.input-field {\n  position: relative;\n  margin-top: 1rem; }\n  /* line 5, stdin */\n  .input-field > input,\n  .input-field > textarea {\n    background-color: transparent;\n    border-radius: 0;\n    outline: none;\n    height: 3rem;\n    width: 100%;\n    font-size: 1rem;\n    margin: 0 0 15px 0;\n    padding: 0;\n    box-shadow: none;\n    -webkit-transition: all .3s;\n    transition: all .3s; }\n  /* line 19, stdin */\n  .input-field > textarea {\n    overflow-y: hidden;\n    /* prevents scroll bar flash */\n    padding: 1.6rem 0;\n    /* prevents text jump on Enter keypress */\n    resize: none;\n    min-height: 3rem; }\n  /* line 25, stdin */\n  .input-field.valid > label:after,\n  .input-field.valid > input:focus + label:after,\n  .input-field.valid > textarea:focus + label:after {\n    content: attr(data-success);\n    opacity: 1; }\n  /* line 31, stdin */\n  .input-field.invalid > label:after,\n  .input-field.invalid > input:focus + label:after,\n  .input-field.invalid > textarea:focus + label:after {\n    content: attr(data-error);\n    opacity: 1; }\n  /* line 37, stdin */\n  .input-field > label {\n    position: absolute;\n    top: 0.8rem;\n    font-size: 1rem;\n    cursor: text; }\n  /* line 44, stdin */\n  .input-field > label:after {\n    display: block;\n    content: \"\";\n    position: absolute;\n    top: 65px;\n    opacity: 0;\n    -webkit-transition: .2s opacity ease-out, .2s color ease-out;\n    transition: .2s opacity ease-out, .2s color ease-out; }\n  /* line 52, stdin */\n  .input-field > i {\n    position: absolute;\n    height: 3rem;\n    font-size: 2.5rem;\n    padding-top: 0.5rem; }\n  /* line 58, stdin */\n  .input-field > i ~ input,\n  .input-field > i ~ textarea {\n    margin-left: 3rem;\n    width: 92%;\n    width: calc(100% - 3rem); }\n  /* line 64, stdin */\n  .input-field > i ~ textarea {\n    padding-top: .8rem; }\n  /* line 65, stdin */\n  .input-field > i ~ label {\n    margin-left: 3rem; }\n\n/* line 69, stdin */\n.hiddendiv {\n  display: none;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  /* future version of deprecated 'word-wrap' */\n  padding-top: 1.2rem;\n  /* prevents text jump on Enter keypress */ }\n")
module.exports = {
  props: {
    "debounce": {
      type: Number,
      "default": 50
    },
    "placeholder": {
      type: String,
      "default": ""
    },
    "readonly": {
      coerce: function(val) {
        if (val === "true" || val === true) {
          return true;
        }
        return false;
      },
      "default": false
    },
    "autofocus": {
      coerce: function(val) {
        if (val === "true" || val === true) {
          return true;
        }
        return false;
      },
      "default": false
    },
    "inputId": {
      type: String
    },
    "type": {
      type: String,
      "default": "text"
    },
    "disabled": {
      coerce: function(val) {
        if (val === "true" || val === true) {
          return true;
        }
        return false;
      },
      "default": false
    },
    "validate": {
      type: Function,
      "default": function() {
        return null;
      }
    },
    "dataError": {
      type: String,
      "default": ""
    },
    "dataSuccess": {
      type: String,
      "default": ""
    },
    "label": {
      type: String,
      "default": ""
    },
    "value": {
      type: String,
      "default": ""
    },
    "icon": {
      type: String,
      "default": ""
    }
  },
  data: function() {
    return {
      isFocused: false,
      isActive: false,
      isValid: false,
      isInvalid: false
    };
  },
  methods: {
    setValid: function() {
      this.isValid = true;
      this.isInvalid = false;
      return this.$dispatch("valid", this.value);
    },
    setInvalid: function() {
      this.isValid = false;
      this.isInvalid = true;
      return this.$dispatch("invalid", this.value);
    },
    checkValidity: function() {
      var result;
      if (this.value) {
        result = this.validate(this.value);
        if (result != null) {
          if (result.then != null) {
            return result.then(this.setValid)["catch"](this.setInvalid);
          } else {
            if (result) {
              return this.setValid();
            } else {
              return this.setInvalid();
            }
          }
        } else {
          this.isValid = false;
          return this.isInvalid = false;
        }
      } else {
        if (!(this.isFocused || this.placeholder)) {
          this.isActive = false;
        }
        this.isValid = false;
        return this.isInvalid = false;
      }
    },
    focus: function() {
      return this.$els.input.focus();
    },
    blur: function() {
      return this.$els.input.blur();
    },
    onInputFocus: function() {
      this.isActive = true;
      if (!this.readonly) {
        this.isFocused = true;
      }
      return this.$dispatch("focus");
    },
    onInputBlur: function() {
      this.isFocused = false;
      if (!(this.value || this.placeholder)) {
        this.isActive = false;
      }
      return this.$dispatch("blur");
    },
    onChangeTrigger: function() {
      this.$dispatch("change", arguments);
      return this.checkValidity();
    },
    onConfirmTrigger: function() {
      if (!this.isInvalid) {
        return this.$dispatch("confirm");
      }
    }
  },
  watch: {
    "value": "onChangeTrigger"
  },
  compiled: function() {
    if (this.autofocus || this.value || this.placeholder) {
      this.isActive = true;
      if (!(this.readonly || this.placeholder)) {
        return this.isFocused = true;
      }
    }
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-bind:class=\"{active: isActive,focus: isFocused,disabled: disabled,readonly: readonly,valid: isValid,invalid: isInvalid}\" class=\"input-field\"><i v-if=\"icon\" v-bind:class=\"icon\"></i><input v-el:input=\"v-el:input\" v-if=\"type!='textarea'\" v-bind:style=\"inputStyle\" v-bind:type=\"type\" v-bind:id=\"inputId\" v-bind:disabled=\"disabled\" v-bind:autofocus=\"autofocus\" v-bind:placeholder=\"placeholder\" v-bind:debounce=\"debounce\" v-model=\"value\" @focus=\"onInputFocus\" @blur=\"onInputBlur\" @keyup.enter=\"onConfirmTrigger\"/><textarea v-el:input=\"v-el:input\" v-if=\"type=='textarea'\" v-bind:style=\"inputStyle\" v-bind:type=\"type\" v-bind:id=\"inputId\" v-bind:disabled=\"disabled\" v-bind:autofocus=\"autofocus\" v-bind:placeholder=\"placeholder\" v-bind:debounce=\"debounce\" v-model=\"value\" @focus=\"onInputFocus\" @blur=\"onInputBlur\" @keyup.enter=\"onConfirmTrigger\"></textarea><label v-if=\"label\" v-bind:for=\"inputId\" v-bind:data-error=\"dataError\" v-bind:data-success=\"dataSuccess\">{{label}}</label></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/home/peaul"
  module.hot.dispose(function () {
    require("vueify-insert-css").cache["/* line 2, stdin */\n.input-field {\n  position: relative;\n  margin-top: 1rem; }\n  /* line 5, stdin */\n  .input-field > input,\n  .input-field > textarea {\n    background-color: transparent;\n    border-radius: 0;\n    outline: none;\n    height: 3rem;\n    width: 100%;\n    font-size: 1rem;\n    margin: 0 0 15px 0;\n    padding: 0;\n    box-shadow: none;\n    -webkit-transition: all .3s;\n    transition: all .3s; }\n  /* line 19, stdin */\n  .input-field > textarea {\n    overflow-y: hidden;\n    /* prevents scroll bar flash */\n    padding: 1.6rem 0;\n    /* prevents text jump on Enter keypress */\n    resize: none;\n    min-height: 3rem; }\n  /* line 25, stdin */\n  .input-field.valid > label:after,\n  .input-field.valid > input:focus + label:after,\n  .input-field.valid > textarea:focus + label:after {\n    content: attr(data-success);\n    opacity: 1; }\n  /* line 31, stdin */\n  .input-field.invalid > label:after,\n  .input-field.invalid > input:focus + label:after,\n  .input-field.invalid > textarea:focus + label:after {\n    content: attr(data-error);\n    opacity: 1; }\n  /* line 37, stdin */\n  .input-field > label {\n    position: absolute;\n    top: 0.8rem;\n    font-size: 1rem;\n    cursor: text; }\n  /* line 44, stdin */\n  .input-field > label:after {\n    display: block;\n    content: \"\";\n    position: absolute;\n    top: 65px;\n    opacity: 0;\n    -webkit-transition: .2s opacity ease-out, .2s color ease-out;\n    transition: .2s opacity ease-out, .2s color ease-out; }\n  /* line 52, stdin */\n  .input-field > i {\n    position: absolute;\n    height: 3rem;\n    font-size: 2.5rem;\n    padding-top: 0.5rem; }\n  /* line 58, stdin */\n  .input-field > i ~ input,\n  .input-field > i ~ textarea {\n    margin-left: 3rem;\n    width: 92%;\n    width: calc(100% - 3rem); }\n  /* line 64, stdin */\n  .input-field > i ~ textarea {\n    padding-top: .8rem; }\n  /* line 65, stdin */\n  .input-field > i ~ label {\n    margin-left: 3rem; }\n\n/* line 69, stdin */\n.hiddendiv {\n  display: none;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  /* future version of deprecated 'word-wrap' */\n  padding-top: 1.2rem;\n  /* prevents text jump on Enter keypress */ }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}