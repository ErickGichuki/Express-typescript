import request from 'supertest';
import app from 'server'; // Assuming your Express app is exported from app.ts
import Contact from '../models/Contact';

// Mock the Contact model
jest.mock('../models/Contact');

describe('Contact Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /contacts (createContact)', () => {
    it('should create a new contact and return 201 status', async () => {
      const mockContact = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello, I have a question.',
      };

      (Contact.create as jest.Mock).mockResolvedValue(mockContact);

      const response = await request(app)
        .post('/contacts')
        .send(mockContact);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Message sent successfully');
      expect(Contact.create).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello, I have a question.',
      });
    });

    it('should return 400 if any field is missing', async () => {
      const response = await request(app).post('/contacts').send({
        name: 'John Doe',
        email: '',
        subject: 'Inquiry',
        message: 'Hello, I have a question.',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('All fields are required');
    });
  });

  describe('GET /contacts (getContacts)', () => {
    it('should return a list of contacts', async () => {
      const mockContacts = [
        { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Inquiry', message: 'Hello' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Support', message: 'Help' },
      ];

      (Contact.findAll as jest.Mock).mockResolvedValue(mockContacts);

      const response = await request(app).get('/contacts');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContacts);
    });

    it('should return 500 if there is a server error', async () => {
      (Contact.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/contacts');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Database error');
    });
  });

  describe('DELETE /contacts/:id (deleteContact)', () => {
    it('should delete a contact and return a success message', async () => {
      const mockContact = { id: 1, destroy: jest.fn() };

      (Contact.findByPk as jest.Mock).mockResolvedValue(mockContact);

      const response = await request(app).delete('/contacts/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Message deleted successfully');
      expect(mockContact.destroy).toHaveBeenCalled();
    });

    it('should return 404 if the contact does not exist', async () => {
      (Contact.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/contacts/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Contact not found');
    });

    it('should return 500 if there is a server error', async () => {
      (Contact.findByPk as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/contacts/1');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Database error');
    });
  });
});
