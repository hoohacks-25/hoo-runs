const express = require('express');
const router = express.Router();
const generateRun = require('../controllers/runController')

router.post('/generate', async (req, res) => {
    const {start, end, miles} = req.body
    const route = await generateRun(start, end, miles)
    return res.json({ route:route });
});

module.exports = router;