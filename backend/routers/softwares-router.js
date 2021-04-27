const router = require('express').Router();

const Softwares = require('../models/softwares-model.js');

const authenticate = require('../middleware/auth-middleware.js');

const requireSoftwares = require('../middleware/requireSoftwares-middleware.js');

// ADD SOFTWARES TO EMPLOYEE
router.post('/add', authenticate, requireSoftwares, (req, res) => {
  const softwares = req.body;

  Softwares.addSoftwares(softwares)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to add softwares', err });
    });
});

// GET LIST OF EMPLOYEE SOFTWARES
router.get('/list', authenticate, async (req, res) => {
  const { employee_id } = req.body;

  try {
    const softwares = await Softwares.findSoftwaresByEmployee({ employee_id });

    if (softwares.length > 0) {
      res.status(200).json(softwares);
    } else {
      res.status(404).json({ message: 'Invalid employee_id' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to retrieve employee software list' });
  }
});

// UPDATE SOFTWARES BY ID
router.put('/update/:id', authenticate, requireSoftwares, async (req, res) => {
  try {
    const softwares = await Softwares.updateSoftwares(req.params.id, req.body);

    if (softwares) {
      res.status(200).json({ message: `${softwares} record updated` });
    } else {
      res.status(404).json({ message: 'Softwares could not be found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update softwares', err });
  }
});

// DELETE SOFTWARE BY ID
router.delete('/delete/:id', authenticate, async (req, res) => {
  try {
    const count = await Softwares.removeSoftwares(req.params.id);

    if (count > 0) {
      res.status(200).json({ message: 'softwares deleted' });
    } else {
      res.status(404).json({
        message: `Could not find softwares with given id: ${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'Failed to delete softwares',
      err,
    });
  }
});

module.exports = router;
