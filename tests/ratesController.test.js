const chai = require('chai');
const should = chai.should();

let chaiHttp = require('chai-http');

const app = require('../config/keys').baseUrl;
chai.use(chaiHttp);
chai.should();

var agent = chai.request.agent(app);


describe('Test rates controler', () => {
  var user = {};
  it('should login', done => {
    agent
      .post('/auth/login')
      .send({username: 'tester@tester.com', password: 'tester'})
      .end((err, res) => {user = res.body; done();});
  });

  it('should get all rates', done => {
    agent
      .get(`/api/rates/${user._id}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('array');
        msgThread = res.body[0];
        done();
      });
  });

  it('should rate user', done => {
    agent
      .post(`/api/rates/`)
      .send({message: 'fsasdgasgfggdfgd', rate: 3, rate_for: '5cbd8be47da35752f2cd2b63', message_thread_id: '5d7bceed85000102e28548d0'})
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        msgThread = res.body[0];
        done();
      });
  });


  //ContactList test
  it.skip('should subscribe user', done => {
    agent
      .post(`/api/contactList`)
      .send({
        contact_person: '5cbd8be47da35752f2cd2b63'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        msgThread = res.body[0];
        done();
      });
  });

  it('should get contactList', done => {
    agent
      .get(`/api/contactList`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('array');
        msgThread = res.body[0];
        done();
      });
  });

});