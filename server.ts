import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import songsRoute from './routes/songs';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/songs', songsRoute);
app.use('/contacts', contactRoutes);
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Hello world!!!" });
});

// Check if required environment variables are available
const db = process.env.DATABASE_URL;
if (!db) {
    throw new Error('DATABASE_URL is not defined in environment variables!');
}

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
        console.log(`The db url is ${db}`);
    });
}

export default app;
