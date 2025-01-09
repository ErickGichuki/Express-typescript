import { Request, Response } from 'express';
import Song from '../models/Song';

export const createSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, lyrics } = req.body;

    if (!title || !lyrics) {
      res.status(400).json({ error: 'Title and lyrics are required' });
      return;
    }

    const song = await Song.create({ title, lyrics });
    res.status(201).json({ message: 'Song added successfully', song });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// export const updateSong = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { title, lyrics } = req.body;

//     const song = await Song.findByPk(id);
//     if(!song){
//       res.status(404).json({error: "song not found!"})
//       return;
//     }

//     if (title) song.title = title;
//     if (lyrics) song.lyrics =  lyrics;

//     await song.save();
//     res.status(201).json({success: "Updated successfully!!", song});
//   } catch(err: any){
//     res.status(500).json({error: err.message})
//   }
// }

export const deleteSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const song = await Song.findByPk(id);
    if (!song) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }

    await song.destroy();
    res.json({ message: 'Song deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
