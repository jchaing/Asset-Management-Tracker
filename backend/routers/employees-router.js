const router = require('express').Router();

const Employees = require('../models/employees-model.js');

const authenticate = require('../middleware/auth-middleware.js');

const requireEmployee = require('../middleware/requireEmployee-middleware.js');

// ADD AN EMPLOYEE
router.post('/add', authenticate, requireEmployee, (req, res) => {
  const employee = req.body;

  Employees.addEmployee(employee)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to add employee', err });
    });
});

// GET LIST OF EMPLOYEES
router.get('/list', authenticate, async (req, res) => {
  const { user_id } = req.body;

  try {
    const employees = await Employees.findEmployeeByUser({ user_id });
    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(404).json({ message: 'Invalid user_id' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve employees list' });
  }
});

// GET AN EMPLOYEE BY ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employees.findEmployeeById(req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve employee', err });
  }
});

// UPDATE EMPLOYEE BY ID
router.put('/update/:id', authenticate, requireEmployee, async (req, res) => {
  try {
    const employee = await Employees.updateEmployee(req.params.id, req.body);
    if (employee) {
      res.status(200).json({ message: `${employee} record updated` });
    } else {
      res.status(404).json({ message: 'Employee could not be found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee', err });
  }
});

// DELETE EMPLOYEE BY ID
router.delete('/delete/:id', authenticate, async (req, res) => {
  try {
    const count = await Employees.removeEmployee(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'employee deleted' });
    } else {
      res.status(404).json({
        message: `Could not find employee with given id: ${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'Failed to delete employee',
      err,
    });
  }
});

module.exports = router;
