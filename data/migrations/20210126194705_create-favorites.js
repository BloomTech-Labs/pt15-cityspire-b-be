exports.up = function (knex) {
  return knex.schema.createTable('favorites', (tbl) => {
    tbl.integer('okta_email');
    tbl.integer('zip_code').notNullable();
    tbl.primary(['okta_email', 'zip_code']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('favorites');
};
