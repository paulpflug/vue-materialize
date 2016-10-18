# out: ../select.js
select = require "vue-simple-select"
clone = require "lodash/clone"
t = select.template
  .replace("<template v-if=unsafe>{{{content}}}</template><template v-else=v-else>{{content}}</template>","<input type=text class=select-dropdown readonly :value=content tabindex=-1 :disabled=disabled>")
  .replace("class=select-list","class='select-list dropdown-content' style='display:block;opacity:1;position:relative'")

s =
  template: t
  mixins: select.mixins
  components:
    dd: require "./dropdown"
    modal: require "./modal"
  props: clone(select.props)
  computed: select.computed
  data: select.data
  watch: select.watch
  methods: select.methods
  transitions:
    modal: require("./modal").transitions.modal
    dropdown: require("./dropdown").transitions.dropdown
s.props.overlay.default = true

module.exports = s
