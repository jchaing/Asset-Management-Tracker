exports.up = function (knex) {
  return knex.schema.createTable('employees', (employees) => {
    employees.increments();
    employees.string('email', 128).notNullable().unique();
    employees.string('firstName', 128).notNullable();
    employees.string('lastName', 128).notNullable();
    employees.string('dept', 128).notNullable();
    employees.string('manager', 128).notNullable();
    employees
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    employees.string('notes', 256);
    employees.boolean('active').notNullable().defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('employees');
};
