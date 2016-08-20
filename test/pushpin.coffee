env = null
describe "pushpin", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/pushpin.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
