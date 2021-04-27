const db = require('../database/db-config.js');

async function addSoftwares(softwares) {
  const [id] = await db('softwares').insert(softwares).returning('id');

  return findSoftwaresById(id);
}

function findSoftwaresById(id) {
  return db('softwares').where({ id }).first();
}

function findSoftwaresByEmployee(id) {
  return db('softwares').where(id).select();
}

function updateSoftwares(id, changes) {
  return db('softwares').where({ id }).update(changes);
}

function removeSoftwares(id) {
  return db('softwares').where({ id }).del();
}

module.exports = {
  addSoftwares,
  findSoftwaresById,
  findSoftwaresByEmployee,
  updateSoftwares,
  removeSoftwares,
};
