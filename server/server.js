import express from "express";
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
dotenv.config();

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

app.post('/', (req, res) => {
    console.log(req);

    res.json({ message: 'Data received', data: req.body });
});

app.get('/', (req, res) => {
    res.send('hello world');
});



let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
];

//Get all jobs
app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json({ jobs });
});

// Create job
app.post('/api/v1/jobs', (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ messgae: 'please provide company and position' });
    }
    const id = nanoid(10);
    // console.log(id);
    const job = { id, company, position };
    jobs.push(job);
    res.status(201).json({ job });
});

// Get single job
app.get('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ message: `no job with id ${id} ` });
    }
    res.status(200).json({ job });
});

// EDIT JOB

app.patch('/api/v1/jobs/:id', (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'please provide company and position' });
    }
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }

    job.company = company;
    job.position = position;
    res.status(200).json({ msg: 'job modified', job });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
});



