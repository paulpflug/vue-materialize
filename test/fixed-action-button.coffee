env = null
describe "fixed-action-button", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/fixed-action-button.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
