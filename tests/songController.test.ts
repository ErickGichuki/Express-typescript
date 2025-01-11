import request from 'supertest';
import app from 'server';
import Song from '../models/Song';

// Mock the Song model
jest.mock('../models/Song');

describe('Song Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /songs (createSong)', () => {
    it('should create a new song and return 201 status', async () => {
      const mockSong = {
        id: 1,
        title: 'My Song',
        lyrics: 'These are the lyrics to my song.',
      };

      (Song.create as jest.Mock).mockResolvedValue(mockSong);

      const response = await request(app)
        .post('/songs')
        .send({ title: 'My Song', lyrics: 'These are the lyrics to my song.' });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Song added successfully');
      expect(Song.create).toHaveBeenCalledWith({
        title: 'My Song',
        lyrics: 'These are the lyrics to my song.',
      });
    });

    it('should return 400 if title or lyrics are missing', async () => {
      const response = await request(app).post('/songs').send({
        title: '',
        lyrics: 'Some lyrics',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title and lyrics are required');
    });
  });

  describe('GET /songs (getSongs)', () => {
    it('should return a list of songs', async () => {
      const mockSongs = [
        { id: 1, title: 'Song One', lyrics: 'Lyrics for song one' },
        { id: 2, title: 'Song Two', lyrics: 'Lyrics for song two' },
      ];

      (Song.findAll as jest.Mock).mockResolvedValue(mockSongs);

      const response = await request(app).get('/songs');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSongs);
    });

    it('should return 500 if there is a server error', async () => {
      (Song.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/songs');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Database error');
    });
  });

  describe('DELETE /songs/:id (deleteSong)', () => {
    it('should delete a song and return a success message', async () => {
      const mockSong = { id: 1, destroy: jest.fn() };

      (Song.findByPk as jest.Mock).mockResolvedValue(mockSong);

      const response = await request(app).delete('/songs/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Song deleted successfully');
      expect(mockSong.destroy).toHaveBeenCalled();
    });

    it('should return 404 if the song does not exist', async () => {
      (Song.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/songs/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Song not found');
    });

    it('should return 500 if there is a server error', async () => {
      (Song.findByPk as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/songs/1');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Database error');
    });
  });
});
