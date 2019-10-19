const chai = require('chai');
const should = chai.should();

require("../models/Rate");

const mongoose = require("mongoose");
const Rate = mongoose.model("Rate");

describe('test rates model', () => {

  it('should throw error on save and forbid', (done) => {
    var adv = new Rate({});

    adv.validate(function(err){
      err.should.contains.all.keys('errors');
      done();
    });
  });
});
