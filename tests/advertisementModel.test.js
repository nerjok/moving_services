const chai = require('chai');
const should = chai.should();

require("../models/Advertisement");

const mongoose = require("mongoose");
const Advertisement = mongoose.model("Advertisement");




describe('test advertisement model', () => {

  it('should throw error on save and forbid', (done) => {
    var adv = new Advertisement({})

    adv.validate(function(err){
      err.should.contains.all.keys('errors')
      done();
    })
  })

  it('should validate succesfuly and forbid', (done) => {
    var advt = new Advertisement({title: 'title', description: 'description', skills: 'skills'})
    advt.validate(function(err){
      err.should.contains.all.keys('errors')
      done();
    })
  })

  it('should validate properties succesfuly ', (done) => {
    const advOk = {
      title: 'testTitletestTitletestTitletestTitletestTitletestTitle', 
      description: 'testerDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescription',
      skills: 'testSkilstestSkilstestSkils'
    }
    var advert = new Advertisement(advOk)
    advert.validate(function(err){console.log('valid data', err)
      expect(err).toBeNull();
      done();
    })
  })
})
