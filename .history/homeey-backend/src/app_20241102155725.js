const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

//TODO: START WORKING on the profile routes next, Filling in the user profile details...
app.use('/api/profiles', )


module.exports = app;