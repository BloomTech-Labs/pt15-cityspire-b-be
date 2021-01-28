exports.up = function (knex) {
  return knex.schema.createTable('preferred_statistics', (tbl) => {
    tbl.string('email').notNullable();
    tbl
      .integer('stat_id')
      .references('id')
      .inTable('statistics')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('preferred_statistics');
};
