const chai = require('chai');
const should = chai.should();

require("../models/MessageThread");

const mongoose = require("mongoose");
const MessageThread = mongoose.model("MessageThread");

describe('test MessageThread model', () => {

  it('should throw error on save and forbid', (done) => {
    var adv = new MessageThread({})

    adv.validate(function(err){
      err.should.contains.all.keys('errors')
      done();
    })
  })
})
