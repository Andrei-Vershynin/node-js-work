const moment = require('moment');
const express = require('express');
const app = express();
app.use(express.json());

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


const HOST = 'localhost';
const PORT = 8000;

app.get('/', (req, res) => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    res.status(200).json({date: now})
})

app.listen(PORT, HOST, () => {
    console.log(`server is runnig on http://${HOST}:${PORT}`)
})



let products = [
  {
        id: 1,
        title: 'keyboard',
        price: 760, 
        count: 10
    }, 
    {
        id: 2,
        title: 'mouse',
        price: 550,
        count: 10
    },
    {
      id: 3,
      title: 'monitor',
      price: 1500,
      count: 5
    },
    {
      id: 4,
      title: 'headphones',
      price: 1200,
      count: 15
    },
    {
      id: 5,
      title: 'webcamera',
      price: 500,
      count: 100
    }
]
app.get('/products', (req, res) => {
    const { take, category } = req.query
    let result = [...products]
    if (category) {
        result = result.filter((p) => p.category === category)
    }

    if (take !== undefined) {
        const takeNumber = parseInt(take)
        if (Number.isInteger(takeNumber) && takeNumber >= 0) {
            result = result.slice(0, takeNumber)
        }
    }
    res.status(200).json(result)
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params
    const productId = parseInt(id)
    if (!Number.isInteger(productId)) {
        return res.status(400).json({ message: 'id must be a valid integer' })
    }
    const product = products.find((p) => p.id === productId)

    if (!product) {
        return res.status(404).json({ message: 'product not found' })
    }
    res.status(200).json(product)
})