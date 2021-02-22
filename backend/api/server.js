const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('../routers/auth-router.js');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/auth', authRouter);

app.get('/api', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = app;
