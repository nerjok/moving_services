const chai = require('chai');
const should = chai.should();

require("../models/Message");

const mongoose = require("mongoose");
const Message = mongoose.model("Message");

describe('test messages model', () => {

  it('should throw error on save and forbid', (done) => {
    var adv = new Message({})

    adv.validate(function(err){
      err.should.contains.all.keys('errors')
      done();
    })
  })
})
