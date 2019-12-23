import app from '../src/index';
import request from 'supertest';

describe('GET /users', () => {
  it('get all users', (done) => {
    request(app)
    .get('/users')
    .end((_, res) => {
      console.log(res.body);
      done();
    });
    
  });
});