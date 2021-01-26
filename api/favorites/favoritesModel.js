const db = require('../../data/db-config');

const getFavoritesByEmail = async (email) => {
  return db('favorites').where({ email });
};

const addFavorite = async (email, zip_code) => {
  return db('favorites').insert({ email, zip_code }).returning('*');
};

const removeFavorite = async (email, zip_code) => {
  return db('favorites').where({ email, zip_code }).del();
};

module.exports = {
  getFavoritesByEmail,
  addFavorite,
  removeFavorite,
};
