env = null
describe "scrollspy", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/scrollspy.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
