exports.up = function (knex) {
  return knex.schema.createTable('employees', (employees) => {
    employees.increments();
    employees.string('email').notNullable().unique();
    employees.string('firstName').notNullable();
    employees.string('lastName').notNullable();
    employees.string('dept').notNullable();
    employees.string('manager').notNullable();
    employees
      .string('user_id')
      .unsigned()
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('employees');
};
