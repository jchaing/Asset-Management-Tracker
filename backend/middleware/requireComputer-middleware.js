module.exports = (req, res, next) => {
  const { type, serial, employee_id } = req.body;

  type && serial && employee_id
    ? next()
    : res.status(400).json({ message: 'Missing field requirements' });
};
