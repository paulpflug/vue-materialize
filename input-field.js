var __vueify_style__ = require("vueify-insert-css").insert(".input-field{position:relative;margin-top:1rem}.input-field>input,.input-field>textarea{background-color:transparent;border-radius:0;outline:none;height:3rem;width:100%;font-size:1rem;margin:0 0 15px;padding:0;box-shadow:none;-webkit-transition:all .3s;transition:all .3s}.input-field>textarea{overflow-y:hidden;padding:1.6rem 0;resize:none;min-height:3rem}.input-field.valid>input:focus+label:after,.input-field.valid>label:after,.input-field.valid>textarea:focus+label:after{content:attr(data-success);opacity:1}.input-field.invalid>input:focus+label:after,.input-field.invalid>label:after,.input-field.invalid>textarea:focus+label:after{content:attr(data-error);opacity:1}.input-field>label{position:absolute;top:.8rem;font-size:1rem;cursor:text}.input-field>label:after{display:block;content:\"\";position:absolute;top:65px;opacity:0;-webkit-transition:.2s opacity ease-out,.2s color ease-out;transition:.2s opacity ease-out,.2s color ease-out}.input-field>i{position:absolute;height:3rem;font-size:2.5rem;padding-top:.5rem}.input-field>i~input,.input-field>i~textarea{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.input-field>i~textarea{padding-top:.8rem}.input-field>i~label{margin-left:3rem}.hiddendiv{display:none;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;padding-top:1.2rem}")
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
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-bind:class=\"{active: isActive,focus: isFocused,disabled: disabled,readonly: readonly,valid: isValid,invalid: isInvalid}\" class=input-field><i v-if=icon v-bind:class=icon></i><input v-el:input=v-el:input v-if=\"type!='textarea'\" v-bind:style=inputStyle v-bind:type=type v-bind:id=inputId v-bind:disabled=disabled v-bind:autofocus=autofocus v-bind:placeholder=placeholder v-bind:debounce=debounce v-model=value @focus=onInputFocus @blur=onInputBlur @keyup.enter=onConfirmTrigger><textarea v-el:input=v-el:input v-if=\"type=='textarea'\" v-bind:style=inputStyle v-bind:type=type v-bind:id=inputId v-bind:disabled=disabled v-bind:autofocus=autofocus v-bind:placeholder=placeholder v-bind:debounce=debounce v-model=value @focus=onInputFocus @blur=onInputBlur @keyup.enter=onConfirmTrigger></textarea><label v-if=label v-bind:for=inputId v-bind:data-error=dataError v-bind:data-success=dataSuccess>{{label}}</label></div>"
