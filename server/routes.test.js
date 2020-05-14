/* eslint-disable arrow-body-style */
const request = require('supertest');
const { app, knex } = require('./routes');

const voter = {
  name: 'Jim Halpert',
  address: '14 Old Chapel Rd., Middlebury, VT 05753',
  times_contacted: null,
  party: 'Democrat',
  regstration_status: 'Registered',
  age_range: '18-34',
  race: 'White',
  socioeconomic_status: 'upper',
  email: 'eosorio@middlebury.edu',
};

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});

test('dotenv configured', () => {
  expect(process.env).toBeDefined();
});

describe('Voters API', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  // SuperTest has several helpful methods for conveniently testing responses
  // that we can use to make the tests more concise

  test('GET /api/voters should return all voters', () => {
    return request(app)
      .get('/api/voters')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([{ id: 1, ...voter }]);
  });
});
