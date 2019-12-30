/* eslint-env mocha */

const { expect } = require('chai'),
      supertest = require('supertest'),
      api = supertest('https://api-flask-baur.herokuapp.com/');


describe('REST API Test Suite', function (){
    it('should return Random quote and status 200', function (done){
        api.get('api/v1/quotes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.quote_id).not.equal(null);
                expect(res.body.author).to.be.a('string');
                expect(res.body.quote).to.be.a('string');
                done();
            });
    });
    it('should return First quote and status 200', function (done){
        api.get('api/v1/quotes/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.quote_id).to.equal(1);
                expect(res.body.author).to.equal('Dr. Seuss');
                expect(res.body.quote).to.equal('Don\'t cry because it\'s over, smile because it happened.');
                done();
        });
    });
    it('should return Quote not found and status 404', function (done){
        api.get('api/v1/quotes/99')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.text).to.equal('"Quote not found"\n');
                done();
        });
    });
    it('should return Last quote and status 200', function (done){
        api.get('api/v1/quotes/11')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.quote_id).to.equal(11);
                expect(res.body.author).to.equal('Mark Twain');
                expect(res.body.quote).to.equal('If you tell the truth, you don\'t have to remember anything.');
                done();
        });
    });
    it('should return Error if quote id is exist and status 400', function (done){
        api.post('api/v1/quotes/11')
            .send({ 
                quote_id: 11,
                author: "Anonimus",
                quote: "Dummy quote."
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.text).to.equal('"Quote with id 11 already exists"\n');
                done();
        });
    });
    it('should create a new Quote and return status 201', function (done){
        api.post('api/v1/quotes/100')
            .send({ 
                quote_id: 100,
                author: "Friedrich Nietzsche, Twilight of the Idols",
                quote: "Without music, life would be a mistake."
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                done();
        });
    });
    it('should edit a newly created Quote and return status 200', function (done){
        api.put('api/v1/quotes/8')
            .send({ 
                quote_id: 8,
                author: "Anonimus",
                quote: "There are no words."
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
        });
    });
    it('should delete a newly created Quote and return status 200', function (done){
        api.delete('api/v1/quotes/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
        });
    });
    
});