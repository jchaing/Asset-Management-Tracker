module.exports = (req, res, next) => {
  const { email, firstName, lastName, dept, manager, user_id } = req.body;

  email && firstName && lastName && dept && manager && user_id
    ? next()
    : res.status(400).json({ message: 'Missing field requirements' });
};
