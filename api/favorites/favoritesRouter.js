const router = require('express').Router();
const db = require('./favoritesModel');

const authRequired = require('../middleware/authRequired');

router.use(authRequired);

router.get('/:email', async (req, res) => {
  const { email } = req.params;
  const favorites = await db('favorites').where({ email });
  favorites.map((fav) => {
    if (fav.zip == -1) {
      delete fav.zip;
    } else if (fav.city == 'default') {
      delete fav.city;
      delete fav.state;
    }
    return fav;
  });
  res.status(200).send(favorites);
});
