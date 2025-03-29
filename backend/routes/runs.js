const express = require('express');
const router = express.Router();

router.get('/generate', (req, res) => {
  return res.json({ route:null });
});

module.exports = router;