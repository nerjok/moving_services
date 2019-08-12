const chai = require('chai');
const should = chai.should();

require("../models/User");

const mongoose = require("mongoose");
const User = mongoose.model("User");


describe('should test User model', () => {

  it('should be valid user', (done) => {
    var usr = new User({})

    usr.validate(function(err){
      expect(err).toBeNull();
      done();
    })
  })
})
