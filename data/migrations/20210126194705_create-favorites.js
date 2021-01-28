exports.up = function (knex) {
  return knex.schema.createTable('favorites', (tbl) => {
    tbl.integer('email');
    tbl.integer('zip_code').notNullable();
    tbl.primary(['email', 'zip_code']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('favorites');
};
