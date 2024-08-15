const express = require('express');
require('dotenv').config();
let morgan = require('morgan');
const receipeRoutes = require('./routes/receipeRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); //local development only for now --- to remove in production level
app.use(express.json());

const mongoURL = "mongodb+srv://wlktech22:wlktech123@mern-cluster.7bglb.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster"
mongoose.connect(mongoURL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port ' + process.env.PORT);
    });
})

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/api/receipes', receipeRoutes);


