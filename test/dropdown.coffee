env = null
describe "dropdown", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/dropdown.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
