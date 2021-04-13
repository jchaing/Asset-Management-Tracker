const router = require('express').Router();

const Computer = require('../models/computer-model.js');

const authenticate = require('../middleware/auth-middleware.js');

const requireComputer = require('../middleware/requireComputer-middleware.js');

// ADD A COMPUTER
router.post('/add', authenticate, requireComputer, (req, res) => {
  const computer = req.body;

  Computer.addComputer(computer)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to add computer', err });
    });
});

// GET LIST OF EMPLOYEE COMPUTER
router.get('/list', authenticate, async (req, res) => {
  const { employee_id } = req.body;

  try {
    const computer = await Computer.findComputerByEmployee({ employee_id });

    if (computer.length > 0) {
      res.status(200).json(computer);
    } else {
      res.status(404).json({ message: 'Invalid employee_id' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to retrieve employee computer list' });
  }
});

// UPDATE COMPUTER BY ID
router.put('/update/:id', authenticate, requireComputer, async (req, res) => {
  try {
    const computer = await Computer.updateComputer(req.params.id, req.body);

    if (computer) {
      res.status(200).json({ message: `${computer} record updated` });
    } else {
      res.status(404).json({ message: 'Computer could not be found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update computer', err });
  }
});

// DELETE COMPUTER BY ID
router.delete('/delete/:id', authenticate, async (req, res) => {
  try {
    const count = await Computer.removeComputer(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'computer deleted' });
    } else {
      res.status(404).json({
        message: `Could not find computer with given id: ${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'Failed to delete computer',
      err,
    });
  }
});

module.exports = router;
