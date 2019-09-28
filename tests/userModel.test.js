const chai = require('chai');
const should = chai.should();

require("../models/User");

const mongoose = require("mongoose");
const User = mongoose.model("User");


describe('should test User model', () => {
var usr;

  it('should be valid user', (done) => {
     usr = new User({
                        city:"citycity citys", 
                        available: "avai;ableAvailable",
                        description: "fsdfsadfa dsafasfas fasdfasdf dsafsadf sadfsda sdafasdf sdfsadf sdafsadf sdafsdaf sdafsdaf sdaf",
                        email: "kuku@mailer.com",
                        name: "namename name",
                        password: 'labas'
                      })

    usr.validate(function(err){
      expect(err).toBeNull();
      done();
    })
  })

  it('should chec valid password', done => {

    let password = usr.generateHash('labas')
    expect(password).toBeTruthy();

    usr.password = password

    expect(usr.validPassword('labas')).toBeTruthy()
    expect(usr.checkPassword('labass')).toBeFalsy();
    done();
  })

  it('should show user without passords', done => {

    let usrJson = usr.toJSON();

    expect(usrJson).toBeTruthy();
    expect(usrJson).not.toHaveProperty('password')
    expect(usrJson).toHaveProperty('work_photos', 
                                   'availableTime', 
                                   'credits', 
                                   '_id',
                                   'city', 
                                   'available', 
                                   'description', 
                                   'email', 
                                   'name'
    )
    done();
  })


  it('should show user without passords', async done => {

    expect(usr.passwordReset()).toBeTruthy()
    expect(usr.passwordSet('kuku')).toBeTruthy()
    
    done()
  })
})
