//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('/GET arrivals', () => {
  it('It should GET arrivals on a stop of a non-go line', (done) => {
    chai.request(server)
      .get('/arrivals/hsr/stop/1499/route/4421')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('It should GET arrivals on a stop of a go line', (done) => {
    chai.request(server)
      .get('/arrivals/go/stop/141/route/05210621-16')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});