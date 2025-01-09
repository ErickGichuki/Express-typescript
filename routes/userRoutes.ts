import { Router } from 'express';
import { signup, getUsers } from '../controllers/userController';

const router = Router();

router.post('/signup', signup);
router.get('/allusers', getUsers)
router.post('/login', );

export default router;
