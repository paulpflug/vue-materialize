env = null
describe "parallax", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/parallax.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
