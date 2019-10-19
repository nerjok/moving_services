/* eslint-disable no-undef */
const chai = require('chai');
const should = chai.should();

let chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const User = require('../models/User');
const passport = require("passport");
require("../services/passport");
const mockingoose = require('mockingoose').default;
const PasswordMail = require('../services/PasswordMail');


const app = require('../config/keys').baseUrl;
const authorization = require('../controllers/authorizationController');

chai.use(chaiHttp);
chai.should();

var agent = chai.request.agent(app);

const next = jest.fn(()=> {});
jest.mock('../services/PasswordMail');//Do not send test e-mails

describe('should test user authorization routes', () => {

  afterEach(() => {
    jest.clearAllMocks();
    //jest.resetAllMocks()
    jest.restoreAllMocks();
     
  });

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
      });
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
      });
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
      });
  });

  it('should log out user', (done) => {
    agent
      .get('/api/logout')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  /**
   * localLogin()
   */
  test('should Test password Login auth ', async (done) => {
    const send = jest.fn(()=> {});
    let mockReq = {
      body: {
        username: "tester@tester.com", password: "tukas"
      },
      logIn: (usr, clb) => {clb(false);}
    };

    var mockRes = { send };

    mockingoose.User.toReturn({ name: 'tester@tester.com',  
      email: 'tester@tester.com',   
      confirmed_email : true, 
      password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
    }, 'findOne');
    
    authorization.localLogin(mockReq, mockRes, next);

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


  /**
   * forgotPswd()
   */
  test('should forgotPswd() send mail', async (done) => {
    const send = jest.fn(()=> {});
    let mockReq = {
      body: {
        username: "tester@tester.com", password: "tukas"
      },
      logIn: (usr, clb) => {clb(false);}
    };

    var mockRes = { send };
    const sendMail = jest.fn(()=> {});


    PasswordMail.mockImplementation(() => {
      return {
        send: sendMail
      };
    });

    mockingoose.User.toReturn({ name: 'tester@tester.com',  
      email: 'neriejus@gmail.com',   
      confirmed_email : true, 
      password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
      updatedAt: "2019-10-16T09:28:28.301Z"
    }, 'findOne');
    
    authorization.forgotPswd(mockReq, mockRes, next);

    setTimeout(()=>{
      expect(next).not.toHaveBeenCalled();
      expect(sendMail).toHaveBeenCalledTimes(1);  
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({msg: 'Email sucessfuly registered'}),
      );
      done();
    }, 200);
  });

  test('should forgotPswd() validate 30min time', async (done) => {
    const send = jest.fn(()=> {});
    let mockReq = {
      body: {
        username: "tester@tester.com", password: "tukas"
      },
      logIn: (usr, clb) => {clb(false);}
    };

    const mockRes = { send };
    const sendMail = jest.fn(()=> {});


    PasswordMail.mockImplementation(() => {
      return {
        send: sendMail
      };
    });

    mockingoose.User.toReturn({ name: 'tester@tester.com',  
      email: 'neriejus@gmail.com',   
      confirmed_email : true, 
      password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
      updatedAt: new Date()
    }, 'findOne');
    
    authorization.forgotPswd(mockReq, mockRes, next);

    setTimeout(()=>{
      expect(next).not.toHaveBeenCalled();
      expect(sendMail).toHaveBeenCalledTimes(0);  
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({error: 'Email already sent'}),
      );
      done();
    }, 200);
  });



  /**
   * localSignup()
   */
  test('should return register error', async (done) => {
    const send = jest.fn(() => {});
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
    
    authorization.localSignup(mockReq, mockRes, next);

    setTimeout(()=>{

      expect(next).not.toHaveBeenCalled();
      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: "Email is already taken."
        }),
      );
      done();jest.mock('../models/User');
    }, 200);
    
  });


  /**
   * resetPassword()
   */
  test('should test password_reset() OK', async (done) => {
    const send = jest.fn(() => {});
    let mockReq = {
      body: {
        email: "tester@tester.com", 
        password: "tukas",
        password_reset: 'reset'
      },
      logIn: (usr, clb) => {clb(false);}
    };

    var mockRes = { send };
    
    mockingoose('User').toReturn({ 
      _id: '5da6e2665dff750631c459ae',
      name: 'tester@tester.com',  
      email: 'tester@tester.com',    
      password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
      password_reset: 'reset',
    }, 'findOne')
      .toReturn({ok: 'ok'}, 'updateOne')          ;
    
    authorization.reset_password(mockReq, mockRes, next);

    setTimeout(()=>{

      expect(next).not.toHaveBeenCalled();
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({
          msg: "Password changed sucessfuly"
        }),
      );
      done();
    }, 200);
  });

  test.skip('should test password_reset() ERROR', async (done) => {
    const send = jest.fn(() => {});
    let mockReq = {
      body: {
        email: "tester@tester.com", 
        password: "tukas",
        password_reset: 'resett'
      },
      logIn: (usr, clb) => {clb(false);}
    };

    var mockRes = { send };
    
    mockingoose('User').toReturn({ 
      name: 'tester@tester.com',  
      email: 'tester@tester.com',    
      password : "$2a$08$2TITP3egAq7Ij1z.q52/MedcMfNgWr5Mvvwp206Y5wjuTOiWc2Idq",
      password_reset: 'reset',
    }, 'findOne');
                                  
    authorization.reset_password(mockReq, mockRes, next);

    setTimeout(()=>{

      expect(next).not.toHaveBeenCalled();
      expect(send).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: "Error, provided data doesn't match"
        }),
      );
      done();
    }, 200);
  });
  

  /**
   * Get current User
   */
  test('should Get current User', done => {
    const send = jest.fn(() => {});
    let mockReq = { user: {usr: 'usr'}};
    var mockRes = { send };

    authorization.currentUser(mockReq, mockRes, next);
    expect(send).toHaveBeenCalledTimes(1);
    done();
  });


  /**
    * googleAuthCallback()
    */
  test('should googleAuthCallback() redirect to Edit', done => {
    const redirect = jest.fn(() => {});
    let mockReq = { user: {usr: 'usr'}};
    var mockRes = { redirect };
    authorization.googleAuthCallback(mockReq, mockRes, next);
    expect(redirect).toHaveBeenCalledTimes(1);
    done();
  });

  test('should googleAuthCallback() redirect to root /', done => {
    const redirect = jest.fn(() => {});
    let mockReq = { user: {city: 'usr', description: 'sf', name: 'sfd', available :'sdfs', city:'sfd'}};
    var mockRes = { redirect };
    authorization.googleAuthCallback(mockReq, mockRes, next);
    expect(redirect).toHaveBeenCalledTimes(1);
    done();
  });

});
