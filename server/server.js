import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import cloudinary from 'cloudinary';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
//router
import authRouter from './routers/authRouter.js';
import jobRouter from './routers/jobRouter.js';
import userRouter from './routers/userRouter.js';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});


app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}

