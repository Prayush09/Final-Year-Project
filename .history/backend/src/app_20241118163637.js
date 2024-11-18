const express = require('express');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')
const matchRoutes = require('./routes/matchRoutes');
const cookieParser = require('cookie-parser');
const cors = require()
//TODO: START WORKING ON FRONT_END!!!

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

//TODO: Update function needs to be revised.
app.use('/api/profiles', profileRoutes);

app.use('/api/match', matchRoutes);


module.exports = app;