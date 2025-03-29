const express = require('express');
const router = express.Router();
const generateRun = require('../controllers/runController')

router.get('/generate', (req, res) => {
    const route = generateRun()
    return res.json({ route:route });
});

module.exports = router;