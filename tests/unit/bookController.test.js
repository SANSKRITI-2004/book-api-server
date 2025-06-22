// tests/unit/bookController.test.js

const httpMocks = require('node-mocks-http');
const Book = require('../../models/Book');
const bookController = require('../../controllers/bookController');

jest.mock('../../models/Book'); // ✅ Match correct casing of file name

describe('Book Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBook', () => {
    it('should create a book successfully', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'New Book',
          author: 'Author Name',
        },
      });
      const res = httpMocks.createResponse();

      const mockSavedBook = {
        _id: '507f191e810c19729de860ea',
        title: 'New Book',
        author: 'Author Name',
      };

      // ✅ Mock Book.create() instead of new Book().save()
      Book.create.mockResolvedValue(mockSavedBook);

      await bookController.createBook(req, res);

      expect(res.statusCode).toBe(201);
      const data = res._getJSONData();
      expect(data).toEqual(mockSavedBook);
    });

    it('should return 500 on save error', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'New Book',
          author: 'Author Name',
        },
      });
      const res = httpMocks.createResponse();

      // ✅ Simulate error in Book.create()
      Book.create.mockRejectedValue(new Error('Save error'));

      await bookController.createBook(req, res);

      expect(res.statusCode).toBe(500);
      const data = res._getJSONData();
      expect(data.error).toBe('Something went wrong');
    });
  });
});
