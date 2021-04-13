const db = require('../database/db-config.js');

function findComputer() {
  return db('computer').select();
}

async function addComputer(computer) {
  const [id] = await db('computer').insert(computer).returning('id');

  return findComputerById(id);
}

function findComputerById(id) {
  return db('computer').where({ id }).first();
}

function findComputerByEmployee(id) {
  return db('computer')
    .where(id)
    .select('id', 'type', 'serial', 'notes', 'employee_id');
}

function updateComputer(id, changes) {
  return db('computer').where({ id }).update(changes);
}

function removeComputer(id) {
  return db('computer').where({ id }).del();
}

module.exports = {
  findComputer,
  addComputer,
  findComputerById,
  findComputerByEmployee,
  updateComputer,
  removeComputer,
};
