exports.up = function (knex) {
  return knex.schema.createTable('computer', (computer) => {
    computer.increments();
    computer.string('type', 128).notNullable();
    computer.string('serial', 128).notNullable();
    computer.string('notes', 256);
    computer
      .integer('employee_id')
      .unsigned()
      .notNullable()
      .references('employees.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('computer');
};
