env = null
describe "switch", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/forms/switch.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
