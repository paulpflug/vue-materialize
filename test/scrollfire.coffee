env = null
describe "scrollfire", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/scrollfire.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
