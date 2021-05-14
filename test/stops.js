const common = require("./common");
const options = common.options;
const assert = common.assert;
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET stops', () => {
  it('It should GET all the stops', (done) => {
    chai.request(server)
      .get('/stops')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4249);
        done();
      });
  });

  it('It should GET stops that meets search query', (done) => {
    chai.request(server)
      .get('/stops?query=king')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(246);
        done();
      });
  });

  it('It should GET empty array of no stops', (done) => {
    chai.request(server)
      .get('/stops?query=zz')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('It should GET stops of the given limit size', (done) => {
    chai.request(server)
      .get('/stops?limit=3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });

  it('It should GET stops on the given page (with offset)', (done) => {
    chai.request(server)
      .get('/stops?page=2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].stop_id.should.be.eql(1002);
        done();
      });
  });

  it('It should GET stops with given query, page, and limit', (done) => {
    chai.request(server)
      .get('/stops?query=hi&page=2&limit=2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].stop_id.should.be.eql(1139);
        done();
      });
  });
});

describe('/GET a stop', () => {
  it('It should GET single stops', (done) => {
    chai.request(server)
      .get('/stops/1169')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('It should not GET single stops that does not exist', (done) => {
    chai.request(server)
      .get('/stops/9999')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.empty;
        done();
      });
  });
});

describe('/GET stops by line', () => {
  it('It should GET stops on specific line', (done) => {
    chai.request(server)
      .get('/stops/go/05210621-16')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});