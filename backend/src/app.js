const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');

app.use(express.json());  // ✅ Middleware to parse JSON
app.use('/api/users', userRoutes); // ✅ Registers user routes

module.exports = app;
