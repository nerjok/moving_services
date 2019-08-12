const chai = require('chai');
const should = chai.should();

let chaiHttp = require('chai-http');

const app = require('../config/keys').baseUrl;
chai.use(chaiHttp);
chai.should();

var agent = chai.request.agent(app)

describe('Test advertisements controler', () => {
  var advertisementId;

  beforeAll(function () {
    agent
      .post('/auth/login')
      .send({username: 'tester', password: 'tester'})
      .end((err, res) => {})
  });

  it("should get last advertisements", (done) => {
    chai.request(app)
        .get('/api/advertisements')
        .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.should.be.an('object');
            res.body.should.have.all.keys(
              'advertisements', 'totalDocs', 'limit', 'hasPrevPage', 'hasNextPage', 'page', 'totalPages', 'pagingCounter', 
              'prevPage', 'nextPage', 'total'
              );

              if (adv = res.body.advertisements[0]) {
                advertisementId = adv._id
              }
            done();
         });
  });

  it('should get advertisement', (done) => {
    chai.request(app)
      .get('/api/advertisements/'+advertisementId)
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        
        res.body.should.contains.all.keys(
          'deleted', '_id', 'title', 'description', '_user', 'createdAt', 'updatedAt', 'photos'
        );

        done();
      })
  });

  it('should not save advertisement', done => {
    chai.request(app)
      .post('/api/advertisements/new')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(401);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.to.eql({ error: 'You must login' });
        done();
      })
  })

  it('should get create advertisement validation error', done => {
    agent
      .post('/api/advertisements/new')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.have.all.keys(
          'errors'
        )
        done();
      })
  })

  it('should create advertisement', done => {
    agent
      .post('/api/advertisements/new')
      .send({
        title: 'testTitletestTitletestTitletestTitletestTitletestTitle', 
        description: 'testerDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescription',
        skills: 'testSkilstestSkilstestSkils'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.not.have.all.keys(
          'errors'
        )
        res.body.should.contain.all.keys(
          '_id', 'title', 'description', 'skills', '_user'
        );

        if (id = res.body._id) {
          advertisementId = id
        }
        done();
      })
  })

  it('should update advertisement', done => {
    agent
      .post('/api/advertisements/'+advertisementId+'/update')
      .send({
        title: 'testTitletestTitletestTitletestTitletestTitletestTitle', 
        description: 'testerDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescription',
        skills: 'updateSkills'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.contain.all.keys(
          '_id', 'title', 'description', 'skills', '_user'
        );

        res.body.skills.should.be.equal('updateSkills');
        done();
      })
  })

  it('should delete advertisement', done => {
    agent
      .delete('/api/advertisements/'+advertisementId)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.have.all.keys(
          'advertisements', 'page', 'total'
          );
        done();
      })
  })
})  
