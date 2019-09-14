const chai = require('chai');
const should = chai.should();

let chaiHttp = require('chai-http');
const mongoose = require('mongoose');


const app = require('../config/keys').baseUrl;


chai.use(chaiHttp);
chai.should();

var agent = chai.request.agent(app)

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
})