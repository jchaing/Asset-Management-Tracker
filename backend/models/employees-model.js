const db = require('../database/db-config.js');

function find() {
  return db('employees').select();
}

async function addEmployee(employee) {
  const [id] = await db('employees').insert(employee).returning('id');

  return findEmployeeById(id);
}

function findEmployeeById(id) {
  return db('employees').where({ id }).first();
}

function findEmployeeBy(filter) {
  return db('employees').select(filter);
}

function findEmployeeByUser(id) {
  return db('employees')
    .where(id)
    .select(
      'id',
      'email',
      'firstName',
      'lastName',
      'dept',
      'manager',
      'user_id',
      'notes',
      'active'
    );
}

function updateEmployee(id, changes) {
  return db('employees').where({ id }).update(changes);
}

function removeEmployee(id) {
  return db('employees').where({ id }).del();
}

module.exports = {
  find,
  addEmployee,
  findEmployeeById,
  findEmployeeBy,
  findEmployeeByUser,
  updateEmployee,
  removeEmployee,
};
