const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/api', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = app;
