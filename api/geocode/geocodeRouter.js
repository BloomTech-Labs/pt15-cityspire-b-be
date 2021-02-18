const router = require('express').Router();

const mapboxClient = require('@mapbox/mapbox-sdk');
const mapboxGeocode = require('@mapbox/mapbox-sdk/services/geocoding');
const baseClient = mapboxClient({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN,
});
const geocodeService = mapboxGeocode(baseClient);

router.get('/reverse', async (req, res) => {
  try {
    console.log(process.env.MAPBOX_ACCESS_TOKEN);
    const { lat, lng } = req.query;
    const { body } = await geocodeService
      .reverseGeocode({
        query: [parseFloat(lng), parseFloat(lat)],
        types: ['place', 'postcode'],
      })
      .send();
    res.status(200).json({ features: body.features });
  } catch (err) {
    res.status(500).json({ message: 'A server error has occurred' });
  }
});

module.exports = router;
