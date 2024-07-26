const express = require('express');
const { getRoomPrices } = require('../crawler/crawler');
const router = express.Router();





router.get('/', (req, res) => {
  res.send('Hello Asksuite World!');
});

router.post('/search', async (request, response) => {
  const { checkin, checkout } = request.body;

  if (!checkin || !checkout) {
    return response.status(400).json({ error: 'Check-in and check-out dates are required' });
  }

  try {
    const roomPrices = await getRoomPrices(checkin, checkout);
    response.json(roomPrices);
  } catch (error) {
    response.status(500).json({ error: 'An error occurred while fetching room prices' });
  }
});

//TODO implement endpoint here

module.exports = router;
