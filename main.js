const moment = require('moment');
const express = require('express');

const app = express();
const HOST = 'localhost';
const PORT = 8000;

app.get('/', (req, res) => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    res.status(200).json({date: now})
})

app.listen(PORT, HOST, () => {
    console.log(`server is runnig on http://${HOST}:${PORT}`)
})
