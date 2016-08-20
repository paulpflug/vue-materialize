env = null
describe "card", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/card.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
