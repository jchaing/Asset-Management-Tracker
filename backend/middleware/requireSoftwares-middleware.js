module.exports = (req, res, next) => {
  const { employee_id } = req.body;

  employee_id
    ? next()
    : res.status(400).json({ message: 'Missing field requirements' });
};
