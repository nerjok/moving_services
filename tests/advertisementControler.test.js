const chai = require('chai');
const should = chai.should();

let chaiHttp = require('chai-http');


require('../models/User');
require('../models/Advertisement');
const advertisement = require('../controllers/advertisementsController');
const mockingoose = require('mockingoose').default;


const app = require('../config/keys').baseUrl;
chai.use(chaiHttp);
chai.should();

var agent = chai.request.agent(app);

describe('Test advertisements controler', () => {
  var advertisementId;

  beforeAll(function () {
    agent
      .post('/auth/login')
      .send({username: 'tester@tester.com', password: 'tester'})
      .end((err, res) => {});
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
          advertisementId = adv._id;
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
          //'deleted', '_id', 'title', 'description', '_user', 'createdAt', 'updatedAt', 'photos'
          //"__v", "_id", "_user", "deleted", "description", "location", "payment", "photos", "skills", "time", "title", "tools"
          "__v", "_id", "_user", "deleted", "description", "location", "photos", "title"
        );

        done();
      });
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
      });
  });

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
        );
        done();
      });
  });

  it('should create advertisement', done => {
    agent
      .post('/api/advertisements/new')
      .send({
        title: 'testTitletestTitletestTitletestTitletestTitletestTitle', 
        description: 'testerDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescription',
        skills: 'testSkilstestSkilstestSkils',
        dateTime: new Date(),
        location: [55, 23]
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.an('object');
        res.body.should.not.have.all.keys(
          'errors'
        );
        res.body.should.contain.all.keys(
          '_id', 'title', 'description', 'skills', '_user'
        );

        if (id = res.body._id) {
          advertisementId = id;
        }
        done();
      });
  });

  it('should update advertisement', done => {
    agent
      .post('/api/advertisements/'+advertisementId+'/update')
      .send({
        title: 'testTitletestTitletestTitletestTitletestTitletestTitle', 
        description: 'testerDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescriptiontesterDescription',
        skills: 'updateSkills',
        location: [55, 23]
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
      });
  });

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
      });
  });


  test('show advertisements list ', done => {
    const send = jest.fn((resp) => {});
    let mockReq = {
      query: {
        page: 0, kuku:'kuk'
      },
    };

    var mockRes = { send };

    mockingoose.Advertisement.toReturn({advertisements: []}, 'paginate');

    advertisement.showAdvertisements(mockReq, mockRes);
    setTimeout(()=>{

      expect(send).toHaveBeenCalled();
      expect(send).toHaveBeenLastCalledWith(
        //expect.toHaveProperty('page', 'limit', 'totalDocs', 'advertisements', 'totalPages')
        expect.objectContaining({
          page: 1, limit: 5
        })
      );
      done();
    }, 100);  
  });

  test('show advertisement', done => {
    const send = jest.fn((resp) => {});
    let mockReq = {
      params: {
        id: 'abcde', kuku:'kuk'
      },
    };

    var mockRes = { send };

    mockingoose.Advertisement.toReturn({title: 'testTitle', _id: 'abcde'}, 'findOne');

    advertisement.showAdvertisement(mockReq, mockRes);
    setTimeout(()=>{

      expect(send).toHaveBeenCalled();
      expect(send).toHaveBeenLastCalledWith(
        //expect.toHaveProperty('page', 'limit', 'totalDocs', 'advertisements', 'totalPages')
        expect.objectContaining({
          deleted: false, title: 'testTitle'
        })
      );
      done();
    }, 100);  
  });


  test('create Advertisement', done => {
    const send = jest.fn((resp) => {});
    let mockReq = {
      body: {
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
        description:'aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa \
        aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        dateTime: new Date().toDateString(),
        location: [55, 23]
      },
    };

    var mockRes = { send };

    mockingoose.Advertisement.toReturn({title: 'testTitle', _id: 'abcde'}, 'create');

    advertisement.createAdvertisement(mockReq, mockRes);
    setTimeout(()=>{

      expect(send).toHaveBeenCalled();
      /*expect(send).toHaveBeenCalledWith(
        expect.objectContaining({
          deleted: false, 
          title: mockReq.body.title, 
          description: mockReq.body.description,
          dateTime: mockReq.body.dateTime
         })
      );*/
      done();
    }, 100);  
  });

  test('create Advertisement', done => {
    const send = jest.fn((resp) => {});
    let mockReq = {
      body: {
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
        description:'aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa \
        aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        dateTime: new Date().toDateString(),
        location: [55, 23]
      },
      params: {
        id: 'abcde'
      },
      user: {
        _id: 'sdfsdfsd'
      }
    };

    var mockRes = { send };

    mockingoose.Advertisement.toReturn({title: 'testTitle', _id: 'abcde'}, 'findOneAndUpdate');

    advertisement.updateAdvertisement(mockReq, mockRes);
    setTimeout(()=>{

      expect(send).toHaveBeenCalled();

      done();
    }, 100);  
  });
  

  test('filter advertisements list ', done => {
    const send = jest.fn((resp) => {});
    let mockReq = {
      query: {
        page: 0, kuku:'kuk'
      },
    };

    var mockRes = { send };

    mockingoose.Advertisement.toReturn({advertisements: []}, 'paginate');

    advertisement.filterAdvertisements(mockReq, mockRes);
    setTimeout(()=>{

      expect(send).toHaveBeenCalled();
      expect(send).toHaveBeenLastCalledWith(
        //expect.toHaveProperty('page', 'limit', 'totalDocs', 'advertisements', 'totalPages')
        expect.objectContaining({
          page: 1, limit: 5
        })
      );
      done();
    }, 100);  
  });
});  
