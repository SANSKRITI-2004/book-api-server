// tests/integration/book.integration.test.js

const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app'); // your Express app
const Book = require('../../models/book');

let mongoServer;

beforeAll(async () => {
  jest.setTimeout(20000); // Increase timeout if needed

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Book Integration Tests', () => {
  let bookId;

  beforeEach(async () => {
    const book = await Book.create({ title: 'Test Book', author: 'Test Author' });
    bookId = book._id;
  });

  afterEach(async () => {
    await Book.deleteMany({});
  });

  it('should delete a book by ID', async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');

    const deleted = await Book.findById(bookId);
    expect(deleted).toBeNull();
  });
});
