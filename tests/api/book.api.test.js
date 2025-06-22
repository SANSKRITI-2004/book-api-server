// tests/api/book.api.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server'); // <-- make sure server.js exports the app
const Book = require('../../models/book');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'apitest' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Book.deleteMany({});
});

it('POST /books - should create a book', async () => {
  const response = await request(app).post('/books').send({
    title: 'API Test Book',
    author: 'API Tester'
  });

  expect(response.status).toBe(201);
  expect(response.body.title).toBe('API Test Book');
});
