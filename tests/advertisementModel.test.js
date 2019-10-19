const chai = require('chai');
const should = chai.should();

require("../models/Advertisement");

const mongoose = require("mongoose");
const Advertisement = mongoose.model("Advertisement");




describe('test advertisement model', () => {

  it('should throw error on save and forbid', (done) => {
    var adv = new Advertisement({});

    adv.validate(function(err){
      err.should.contains.all.keys('errors');
      done();
    });
  });

  it('should validate succesfuly and forbid', (done) => {
    var advt = new Advertisement({title: 'title', description: 'description', skills: 'skills'});
    advt.validate(function(err){
      err.should.contains.all.keys('errors');
      done();
    });
  });

  it('should validate properties succesfuly ', (done) => {

    const location =   { type: 'Point',
      coordinates: [ 54.897559955566074, 23.90896007328748 ] 
    };

    const advOk = {
      title: 'testTitletestTitletestTitletestTitletestTitletestTitle', 
      description: 'testerDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescription',
      skills: 'testSkilstestSkilstestSkils',
      dateTime: new Date(),
      location: {type: "Point", coordinates: [22, 33]},
    };
    advOk.location.coordinates = new Array(23, 23);
    var advert = new Advertisement(advOk);
    advert.validate(function(err){
      expect(err).toBeNull();
      done();
    });
  });
});
