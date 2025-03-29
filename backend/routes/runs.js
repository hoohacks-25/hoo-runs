const express = require('express');
const router = express.Router();
const routeGen = require('../controllers/routeGen')

router.get('/generate', (req, res) => {
    const route = routeGen()
    return res.json({ route:route });
});

module.exports = router;