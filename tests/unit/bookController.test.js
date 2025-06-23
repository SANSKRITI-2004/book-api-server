const httpMocks = require('node-mocks-http');
const bookController = require('../../controllers/bookController');
const Book = require('../../models/Book');

jest.mock('../../models/Book'); // ✅ Mock the Mongoose model

describe('Book Controller - Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }];
      Book.find.mockResolvedValue(mockBooks); // ✅ Corrected mock

      await bookController.getAllBooks(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockBooks);
    });
  });

  describe('getBookById', () => {
    it('should return book by id', async () => {
      const mockBook = { _id: '1', title: 'Book 1' };
      req.params.id = '1';
      Book.findById.mockResolvedValue(mockBook); // ✅ Corrected mock

      await bookController.getBookById(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockBook);
    });
  });
});
