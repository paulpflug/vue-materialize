env = null
describe "toaster", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/toaster.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
