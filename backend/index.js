const express = require('express')
require('dotenv').config();
const runsRoute = require('./routes/runs');

const app = express()
const port = process.env.PORT || 8080

app.use(express.json());
app.use('/run', runsRoute);

app.get('/', (req, res) => {
    return res.json({page:"index"})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})