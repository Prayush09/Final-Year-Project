const express = require('express');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

//TODO: Update function needs to be 
app.use('/api/profiles', profileRoutes);


module.exports = app;