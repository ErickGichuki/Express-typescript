import { Router } from 'express';
import { createSong, getSongs, deleteSong } from '../controllers/songController';

const router = Router();

router.post('/', createSong);
router.get('/', getSongs);
router.delete('/:id', deleteSong);

export default router;
