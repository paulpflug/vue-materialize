env = null
describe "tooltip", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/tooltip.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
