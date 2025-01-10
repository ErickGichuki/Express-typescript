import request from 'supertest';
import { app } from "server"
import Song from '../models/Song';

jest.mock('../models/Song'); // Mock the Song model

describe('Song Controller - createSong', () => {
  it('should create a song when title and lyrics are provided', async () => {
    // Mock the Song.create method
    (Song.create as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Song',
      lyrics: 'Some test lyrics',
    });

    const response = await request(app)
      .post('/songs')
      .send({ title: 'Test Song', lyrics: 'Some test lyrics' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Song added successfully',
      song: {
        id: 1,
        title: 'Test Song',
        lyrics: 'Some test lyrics',
      },
    });
  });

  it('should return 400 if title or lyrics are missing', async () => {
    const response = await request(app)
      .post('/songs')
      .send({ title: '', lyrics: '' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Title and lyrics are required' });
  });
});

describe('Song Controller - getSongs', () => {
    it('should return all songs', async () => {
      // Mock the Song.findAll method
      (Song.findAll as jest.Mock).mockResolvedValue([
        { id: 1, title: 'Song 1', lyrics: 'Lyrics 1' },
        { id: 2, title: 'Song 2', lyrics: 'Lyrics 2' },
      ]);
  
      const response = await request(app).get('/songs');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, title: 'Song 1', lyrics: 'Lyrics 1' },
        { id: 2, title: 'Song 2', lyrics: 'Lyrics 2' },
      ]);
    });
  
    it('should return 500 if there is a server error', async () => {
      (Song.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));
  
      const response = await request(app).get('/songs');
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Database error' });
    });
  });
  