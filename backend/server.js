const express = require('express');
require('dotenv').config();
let morgan = require('morgan');
const receipeRoutes = require('./routes/receipeRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthMiddleware = require('./middlewares/authMiddleware');
const multer = require('multer');
// const AuthMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
)); //local development only for now --- to remove in production level
app.use(express.json());
app.use(express.static('public'));



const mongoURL = "mongodb+srv://wlktech22:wlktech123@mern-cluster.7bglb.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster"
mongoose.connect(mongoURL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port ' + process.env.PORT);
    });
})

app.use(morgan('dev'));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/set-cookies', (req, res) => {
    res.cookie('name', 'wlktech');
    return res.send('You got the cookie');
});

app.use('/api', authRoutes);
app.use('/api/receipes', AuthMiddleware, receipeRoutes);


