import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Signup
export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;

  const role = email.split('@')[1] === 'trainer.com' ? 'trainer' : 'member';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashedPassword, role });
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1d' });
    return res.json({ message: 'Login successful', token, role: user.role });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
