exports.up = function (knex) {
  return knex.schema.createTable('statistics', (tbl) => {
    tbl.increments();
    tbl.string('name').unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('statistics');
};
