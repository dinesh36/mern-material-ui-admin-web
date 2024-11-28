import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-example')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello from Express and MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
