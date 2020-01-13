//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

let Movie = require('../models/Movie');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Movie', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Movie.remove({}, (err) => {
    //         done();
    //     });
    // });
    /*
     * Test the /GET route
     */
    describe('/GET Movie', () => {
        it('it should GET all the Movies', (done) => {
            chai.request('http://localhost:5006')
                .get('/routes/movies/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.should.to.be.json;
                    res.body.should.be.an('object');
                    res.body.should.have.property('movies');
                    done();
                });
        });
    });
    describe('/GET Movie by ID', () => {
        it('it should GET Movie by id', (done) => {
            chai.request('http://localhost:5006')
                .get('/routes/movies/5e1baf4bc4c23c23443a2381')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.should.to.be.json;
                    res.body.should.be.an('object');
                    res.body.should.have.property('retrieveID');
                    done();
                });
        });
    });
    describe('/GET Movie by imdbID', () => {
        it('it should GET Movie by imdbID', (done) => {
            chai.request('http://localhost:5006')
                .get('/routes/movies/imdb/tt3470600')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.should.to.be.json;
                    res.body.should.be.an('object');
                    res.body.should.have.property('retrieveImdbID');
                    done();
                });
        });
    });

});


describe('/POST movie', () => {
    it('it should not POST a movie with empty query', (done) => {

        chai.request('http://localhost:5006')
            .post('/routes/movies/""/a381af98')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            });
    });
    it('it should POST a movie ', (done) => {

        chai.request('http://localhost:5006')
            .post('/routes/movies/sing/a381af98')
            .send({ query: "sing", apikey: 'a381af98' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('Title');
                res.body[0].should.have.property('Year');
                res.body[0].should.have.property('imdbID');
                res.body[0].should.have.property('Poster');
                res.body.length.should.be.eql(10);
                res.should.be.json;
                done();

            });
    });
});


describe('Comments', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Movie.remove({}, (err) => {
    //         done();
    //     });
    // });
    /*
     * Test the /GET route for comments
     */
    describe('/GET Movie', () => {
        it('it should GET all the Movies which have comments', (done) => {
            chai.request('http://localhost:5006')
                .get('/routes/movies/comment/comment/')
                .end((err, res) => {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.should.to.be.json;
                    res.body.should.be.an('array');
                    done();
                });
        });
    });

});


describe('/POST a comment', () => {
    it('it should POST a comment ', (done) => {
        let comment = {
            name: "Jack Sparrow",
            text: "Going to the Carribeans again",
        }

        chai.request('http://localhost:5006')
            .post('/routes/movies/comment/5e1baf4bc4c23c23443a2381')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('year');
                res.body.should.have.property('imdbID');
                res.body.should.have.property('poster');
                res.body.should.have.property('comments');
                res.should.be.json;
                done();

            });
    });
});