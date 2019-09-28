const chai = require('chai');
const should = chai.should();

let chaiHttp = require('chai-http');
const mongoose = require('mongoose');

require('../models/User');
const passport = require("passport");
require("../services/passport");
const mockingoose = require('mockingoose').default;


const app = require('../config/keys').baseUrl;
const authorization = require('../controllers/authorizationController');

chai.use(chaiHttp);
chai.should();

var agent = chai.request.agent(app)

const response = jest.fn((arg)=> {});
const next = jest.fn((args)=> {});

describe('should test user authorization routes', () => {

  it('should not login user', (done) => {
    agent
      .post('/auth/login')
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.to.eql({ error: 'Missing credentials' });
        res.body.should.have.all.keys(
          'error'
        );
        done();
      })
  });

  it('should login user', (done) => {
    agent
      .post('/auth/login')
      .send({username: 'tester@tester.com', password: 'tester'})
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.have.any.keys(
          '_id', 'email', 'password', 'createdAt', 'updatedAT', 'id'
        );

        done();
      })
  });

  it('should login user', (done) => {
    agent
      .get('/api/current_user')
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.have.any.keys(
          '_id', 'email', 'password', 'createdAt', 'updatedAT', 'id'
        );
        done();
      })
  });

  it('should log out user', (done) => {
    agent
      .get('/api/logout')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      })
  })

  test('should Test password Login auth', async (done) => {
    const send = jest.fn((args)=> {})
    let mockReq = {
      body: {
        username: "tester@tester.com", password: "tukas"
      },
      logIn: (usr, clb) => {clb(false);}
    };

    var mockRes = { send };

    mockingoose.User.toReturn({ name: 'tester@tester.com',  
                                email: 'tester@tester.com',    
                                password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
                              }, 'findOne');
    
    authorization.localLogin(mockReq, mockRes, next)

    setTimeout(()=>{

      expect(next).not.toHaveBeenCalled();
      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({
          name: 'tester@tester.com',  
          email: 'tester@tester.com', 
         }),
      );
      done();
    }, 200);
  });


  test('should return register error', async (done) => {
    const send = jest.fn((args) => {})
    let mockReq = {
      body: {
        username: "tester@tester.com", password: "tukas"
      },
      logIn: (usr, clb) => {clb(false);}
    };

    var mockRes = { send };

    mockingoose.User.toReturn({ name: 'tester@tester.com',  
                                email: 'tester@tester.com',    
                                password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
                              }, 'findOne');
    
    authorization.localSignup(mockReq, mockRes, next)

    setTimeout(()=>{

      expect(next).not.toHaveBeenCalled();
      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: "Email is already taken."
         }),
      );
      done();
    }, 200);
    
  });


  test('should test password reset func', async (done) => {
    const send = jest.fn((args) => {})
    let mockReq = {
      body: {
        username: "tester@tester.com", password: "tukas"
      },
      logIn: (usr, clb) => {clb(false);}
    };

    var mockRes = { send };

    mockingoose.User.toReturn({ name: 'tester@tester.com',  
                                email: 'tester@tester.com',    
                                password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
                              }, 'findOne');
    
    authorization.reset_password(mockReq, mockRes, next)

    setTimeout(()=>{

      expect(next).not.toHaveBeenCalled();
      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: "Error, provided data doesn't match"
         }),
      );
      done();
    }, 200);
  })
})
