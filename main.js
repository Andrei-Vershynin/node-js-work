const moment = require('moment');
const express = require('express');

function getCurrentDay() {
  console.log(moment().format('dddd'));
}

function getCurrentMonth() {
  console.log(moment().format('MMMM'));
}

function getCurrentYear() {
  console.log(moment().format('YYYY'));
}

getCurrentDay();
getCurrentMonth();
getCurrentYear();


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
