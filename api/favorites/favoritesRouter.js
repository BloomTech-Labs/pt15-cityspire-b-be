const router = require('express').Router();
const db = require('./favoritesModel');

const authRequired = require('../middleware/authRequired');

router.use(authRequired);

const cleanFavorite = (fav) => {
  if (fav.zip == -1) {
    delete fav.zip;
  } else if (fav.city == 'default') {
    delete fav.city;
    delete fav.state;
  }
  return fav;
};

router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const favorites = await db.getFavoritesByEmail(email);
    favorites.map((fav) => {
      return cleanFavorite(fav);
    });
    res.status(200).send(favorites);
  } catch (e) {
    res.status(500).send({ message: 'a server issue has occured' });
  }
});
router.post('/:email', async (req, res) => {
  const { email } = req.params;
  const { city, state, zip } = req.body;
  let favorite;
  try {
    if (!zip && !city && !state) {
      res.status(400).send({ message: 'missing zip code, city, or state' });
    } else {
      if (zip) {
        favorite = await db.addFavorite({ email, zip_code: zip });
      } else if (city && state) {
        favorite = await db.addFavorite({ email, city, state });
      }
      res.status(201).send(cleanFavorite(favorite[0]));
    }
  } catch (e) {
    res.status(500).send({ message: 'a server error has occurred' });
  }
});

router.delete('/:email/:id', async (req, res) => {
  const { email, id } = req.params;
  try {
    const count = await db.removeFavorite(email, id);
    if (count == 0) {
      res.status(404).send({
        message: 'cannot find a favorite with that id belonging to this user',
      });
    } else {
      res.status(204).end();
    }
  } catch (e) {
    res.status(500).send({ message: 'sorry, a server error has occurred' });
  }
});

module.exports = router;
