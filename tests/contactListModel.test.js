const chai = require('chai');
const should = chai.should();

require("../models/ContactList");

const mongoose = require("mongoose");
const ContactList = mongoose.model("ContactList");

describe('test ContactList model', () => {

  it('should throw error on save and forbid', (done) => {
    var adv = new ContactList({})

    adv.validate(function(err){
      err.should.contains.all.keys('errors')
      done();
    })
  })
})
