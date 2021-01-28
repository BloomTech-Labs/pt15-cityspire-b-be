const db = require('../../data/db-config');

const getFavoritesByEmail = async (email) => {
  return db('favorites').where({ email });
};

const addFavorite = async (favorite) => {
  return db('favorites').insert(favorite).returning('*');
};

const removeFavorite = async (email, id) => {
  return db('favorites').where({ email, id }).del().returning();
};

module.exports = {
  getFavoritesByEmail,
  addFavorite,
  removeFavorite,
};
