exports.up = function (knex) {
  return knex.schema.createTable('softwares', (softwares) => {
    softwares.increments();
    softwares.boolean('office365').defaultTo(true);
    softwares.boolean('project').defaultTo(false);
    softwares.boolean('visio').defaultTo(false);
    softwares.boolean('vs_ent').defaultTo(false);
    softwares.boolean('vs_pro').defaultTo(false);
    softwares.boolean('exchange').defaultTo(false);
    softwares.boolean('arena_full').defaultTo(false);
    softwares.boolean('arena_approver').defaultTo(false);
    softwares.boolean('arena_read').defaultTo(false);
    softwares.boolean('netsuite').defaultTo(false);
    softwares.boolean('zoom').defaultTo(false);
    softwares.boolean('1pass').defaultTo(false);
    softwares.boolean('adobe').defaultTo(false);
    softwares.boolean('adobe_ill').defaultTo(false);
    softwares.boolean('aws').defaultTo(false);
    softwares.boolean('github').defaultTo(false);
    softwares.boolean('jira').defaultTo(false);
    softwares.boolean('box').defaultTo(false);
    softwares.boolean('gsuite').defaultTo(false);
    softwares.boolean('gcp').defaultTo(false);
    softwares
      .integer('software_id')
      .unsigned()
      .notNullable()
      .references('employees.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('softwares');
};
