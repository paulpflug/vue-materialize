env = null
describe "waves", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/waves.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
