const express = require('express');
const router = express.Router();
const generateRun = require('../controllers/runController')

router.post('/generate', async (req, res) => {
    const {start, end, miles, model} = req.body
    const route = await generateRun(start, end, miles, model || 'gemini-2.5-pro-exp-03-25')
    return res.json(route);
});

module.exports = router;