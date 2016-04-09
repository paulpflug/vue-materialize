env = null
describe "side-nav", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/side-nav.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
