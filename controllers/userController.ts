import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';


export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const role = email.split('@')[1] === 'trainer.com' ? 'trainer' : 'member';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashedPassword, role });
     res.status(201).json({ message: 'User created successfully', user });
  } catch (err: any) {
     res.status(400).json({ error: err.message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch(err:any){
    res.status(400).json({error: err.message})
  }
}

// export const deleteUser = async (req: Request, res: Response): Promise<void> =>{
//   try{
//     const { id } = req.params;

//     if (!id || isNaN(Number(id))){
//       res.status(400).json({message: "Invalid or Missing ID!"})
//     }
//     const user = await User.findByPk(id);
//     if(!user){
//       res.status(404).json({message: "User not found!!"});
//     }
//     await user.destroy();
//     res.status(200).json({success: "Deleted successfully!!"})
//   } catch(err:any){
//     res.status(500).json({error: err.message})
//   }
// }

// export const login = async (req: Request, res: Response): Promise<Response> => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1d' });
//     return res.json({ message: 'Login successful', token, role: user.role });
//   } catch (err: any) {
//     return res.status(400).json({ error: err.message });
//   }
// };


