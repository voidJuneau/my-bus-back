const common = require("./common");
const options = common.options;
const assert = common.assert;
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET lines', () => {
  it('It should GET all the lines', (done) => {
    chai.request(server)
      .get('/lines')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(82);
        done();
      });
  });
});

describe('/GET a line', () => {
  it('It should GET single lines', (done) => {
    chai.request(server)
      .get('/lines/hsr/01')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('It should not GET single lines that does not exist', (done) => {
    chai.request(server)
      .get('/lines/hsr/999')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.empty;
        done();
      });
  });
});
