const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const { city, state, zip, lat, lng } = req.query;
  try {
    const results = await axios.post(
      `http://cityspire-bb.eba-sigmrfvv.us-east-1.elasticbeanstalk.com/output?city=${city}&state=${state}&ZIPcode=${zip}&latitude=${lat}&longitude=${lng}`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ message: 'an error occurred' });
  }
});

module.exports = router;
