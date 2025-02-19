const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

const connection = mongoose.connection;
connection.on('error', (err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
