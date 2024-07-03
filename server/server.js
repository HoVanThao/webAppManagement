import express from "express";
import morgan from 'morgan';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// import 'express-async-errors';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

dotenv.config();

import jobRouter from './routers/jobRouter.js';
import { body, validationResult } from "express-validator";


const app = express();

try {
    const response = await fetch(
        'https://www.course-api.com/react-useReducer-cart-project'
    );
    const cartData = await response.json();
    console.log(cartData);
} catch (error) {
    console.log(error);
}


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



app.use(express.json());



app.get('/', (req, res) => {
    res.send('hello world');
});


app.use('/api/v1/jobs', jobRouter);


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



