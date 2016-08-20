env = null
describe "input-field", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/forms/input-field.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
