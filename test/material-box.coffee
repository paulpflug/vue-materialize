env = null
describe "material-box", ->


  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/material-box.vue"))

    after ->
      unloadComp(env)

    it "should work", ->
