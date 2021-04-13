const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('../routers/auth-router.js');
const employeesRouter = require('../routers/employees-router.js');
const computerRouter = require('../routers/computer-router.js');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/computer', computerRouter);

app.get('/api', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = app;
