exports.up = function (knex) {
  return knex.schema.dropTable('favorites').createTable('favorites', (tbl) => {
    tbl.increments();
    tbl.string('email').notNullable();
    tbl.integer('zip_code').default(-1);
    tbl.string('city').default('default');
    tbl.string('state').default('default');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('favorites').createTable('favorites', (tbl) => {
    tbl.integer('email');
    tbl.integer('zip_code').notNullable();
    tbl.primary(['email', 'zip_code']);
  });
};
