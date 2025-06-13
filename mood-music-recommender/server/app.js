const express = require('express');
const cors = require('cors');
const app = express();

const moodRoute = require('./routes/mood');

app.use(cors());
app.use(express.json());
app.use('/api/mood', moodRoute);

module.exports = app;
