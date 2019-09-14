const chai = require('chai');
const should = chai.should();

let chaiHttp = require('chai-http');

const app = require('../config/keys').baseUrl;
chai.use(chaiHttp);
chai.should();

var agent = chai.request.agent(app)


describe('Test advertisements controler', () => {
  var msgThread;
  var user;

  beforeAll(() => {});


  it('should login', done => {
    agent
      .post('/auth/login')
      .send({username: 'tester@tester.com', password: 'tester'})
      .end((err, res) => {user = res.body; done();})
  })

  it('should get all messageThreads', done => {
    agent
      .get('/api/messages_topics')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('array');
        msgThread = res.body[0];
        done();
      })
  })

  it('should get all thread messages', done => {
    agent
      .get(`/api/messages/${msgThread._id}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.messages.should.be.an('array');
        res.body.msgThread.should.be.an('object');
        done();
      })
  })

  it('should save thread message', done => {
    const message = 'tedfgdf gdgdgdf dfgdfgdfgdfgdfster@tedfgdfgdfgddfg gdfgdfgdster.com';
    agent
      .post(`/api/messages`)
      .send({
        message, 
        message_thread_id: msgThread._id
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.message.should.be.a('string', message);
        res.body.message_thread_id.should.be.a('string', msgThread._id);
        done();
      })
  })

  it('should add new message to thread', done => {
    const message = 'tedfgdf gdgdgdf dfgdfgdfgdfgdfster@tedfgdfgdfgddfg gdfgdfgdster.com';
    let receiver_id = msgThread.receiver_id._id;
    if (receiver_id == user._id) {
      receiver_id = msgThread.sender_id._id
    }
    agent
      .post(`/api/new_message`)
      .send({
        message, 
        message_thread_id: msgThread._id,
        receiver_id
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.message.should.be.a('string', message);
        res.body.message_thread_id.should.be.a('string', msgThread._id);

        done();
      })
  })

  it('should get all thread messages', done => {
    const message = 'tedfgdf gdgdgdf dfgdfgdfgdfgdfster@tedfgdfgdfgddfg gdfgdfgdster.com';
    agent
      .post(`/api/new_thread`)
      .send({
        message, 
        message_thread_id: msgThread._id,
        receiver_id: user._id
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.error.should.be.a('string', 'You cannot send message youself!');
        done();
      })
  })
})
