const chai = require('chai');
const should = chai.should();

require("../models/User");

const mongoose = require("mongoose");
const User = mongoose.model("User");


describe('should test User model', () => {

  it('should be valid user', (done) => {
    var usr = new User({
                        city:"citycity citys", 
                        available: "avai;ableAvailable",
                        description: "fsdfsadfa dsafasfas fasdfasdf dsafsadf sadfsda sdafasdf sdfsadf sdafsadf sdafsdaf sdafsdaf sdaf",
                        email: "kuku@mailer.com",
                        name: "namename name"
                      })

    usr.validate(function(err){
      expect(err).toBeNull();
      done();
    })
  })
})
