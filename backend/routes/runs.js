const express = require('express');
const router = express.Router();

router.get('/generate', (req, res) => {
  res.json({ route:null });
});

module.exports = router;