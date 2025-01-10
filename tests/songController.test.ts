import request from 'supertest';
import { app } from '../server'; // Adjust the path as necessary
import Song from '../models/Song'; // Adjust the path as necessary

// Mock the Song model
jest.mock('../models/Song', () => ({
  default: {
    findAll: jest.fn(),
  },
}));

describe('Song Controller - getSongs', () => {
  it('should return all songs', async () => {
    // Mock the Song.findAll method to return an array of songs
    (Song.findAll as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Song 1', lyrics: 'Lyrics 1' },
      { id: 2, title: 'Song 2', lyrics: 'Lyrics 2' },
    ]);

    const response = await request(app).get('/songs');

    // Verify response status and body
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: 'Song 1', lyrics: 'Lyrics 1' },
      { id: 2, title: 'Song 2', lyrics: 'Lyrics 2' },
    ]);
  });

  it('should return 500 if there is a server error', async () => {
    // Mock the Song.findAll method to reject with an error
    (Song.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/songs');

    // Verify response status and body
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database error' });
  });
});
