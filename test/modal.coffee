env = null
describe "modal", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/modal.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
