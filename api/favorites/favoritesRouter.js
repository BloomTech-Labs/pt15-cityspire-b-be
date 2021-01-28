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
router.post('/:email', async (req, res) => {
  const { email } = req.params;
  const { city, state, zip } = req.body;
  let favorite;
  if (!zip && !city && !state) {
    res.status(400).send({ message: 'missing zip code, city, or state' });
  } else {
    if (zip) {
      favorite = db.addFavorite({ email, zip });
    } else if (city && state) {
      favorite = db.addFavorite({ email, city, state });
    }
    res.status(201).send(favorite);
  }
});
