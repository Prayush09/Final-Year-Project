const express = require('express');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

//TODO: Update function needs to be revised.
app.use('/api/profiles', profileRoutes);

//TODO: Start working on the match making dashboard, and how to implement the machine learning model to fetch from DB and 

module.exports = app;