// import request from 'supertest';
// import { app } from '../server'; // Adjust the path as needed
// import Song from '../models/Song'; // Adjust the path as needed

// // Mock the Song model
// jest.mock('../models/Song', () => ({
//   findAll: jest.fn(), // Mock the findAll method
// }));

// describe('Song Controller - getSongs', () => {
//   it('should return all songs', async () => {
//     // Mock the Song.findAll method to return an array of songs
//     (Song.findAll as jest.Mock).mockResolvedValue([
//       { id: 1, title: 'Song 1', lyrics: 'Lyrics 1' },
//       { id: 2, title: 'Song 2', lyrics: 'Lyrics 2' },
//     ]);

//     const response = await request(app).get('/songs');

//     // Verify that the response status is 200 (OK)
//     expect(response.status).toBe(200);

//     // Verify that the response body matches the expected songs array
//     expect(response.body).toEqual([
//       { id: 1, title: 'Song 1', lyrics: 'Lyrics 1' },
//       { id: 2, title: 'Song 2', lyrics: 'Lyrics 2' },
//     ]);
//   });

//   it('should return 500 if there is a server error', async () => {
//     // Mock the Song.findAll method to reject with an error
//     (Song.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

//     const response = await request(app).get('/songs');

//     // Verify that the response status is 500 (Internal Server Error)
//     expect(response.status).toBe(500);

//     // Verify that the response body contains the error message
//     expect(response.body).toEqual({ error: 'Database error' });
//   });
// });
