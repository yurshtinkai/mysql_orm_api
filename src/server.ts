import dotenv from 'dotenv';  // Import dotenv
dotenv.config();  // Call dotenv.config() before anything else

import 'reflect-metadata'; 
import express from 'express';
import cors from 'cors';
// ... existing code ...
import { AppDataSource } from './_helpers/db';
// ... existing code ...
import userRouter from './users/user.controller';
import { errorHandler } from './_middleware/error-handler';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use(errorHandler);

const port = process.env.PORT || 4000;

AppDataSource.initialize().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}).catch(err => console.error('Database connection error:', err));