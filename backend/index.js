const express = require('express')
require('dotenv').config();
const runsRoute = require('./routes/runs');

const app = express()
const port = process.env.PORT || 8080

app.use('/run', runsRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})