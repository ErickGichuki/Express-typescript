import { Request, Response } from 'express';
import Song from '../models/Song';

// Create a new song
export const createSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, lyrics } = req.body;

    // Validate input
    if (!title || !lyrics) {
      res.status(400).json({ error: 'Title and lyrics are required' });
      return;
    }

    // Create the song
    const song = await Song.create({ title, lyrics });
    res.status(201).json({ message: 'Song added successfully', song });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get all songs
export const getSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    const songs = await Song.findAll(); // Fetch all songs using Sequelize
    res.json(songs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a song by ID
export const deleteSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the song by ID
    const song = await Song.findByPk(id);
    if (!song) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }

    // Delete the song
    await song.destroy();
    res.json({ message: 'Song deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
