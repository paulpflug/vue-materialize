env = null
describe "collapsible", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/collapsible.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
