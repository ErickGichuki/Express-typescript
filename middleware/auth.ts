import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;  // Make sure to return here to prevent further execution
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);

    // Use type assertion to inform TypeScript that `user` will exist on `req`
    (req as any).user = verified; // Type assertion: `req` is being cast to `any` temporarily

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export default auth;
