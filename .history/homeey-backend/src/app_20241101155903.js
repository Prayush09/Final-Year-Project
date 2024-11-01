const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieparser);

app.use('/api/users', userRoutes);

module.exports = app;