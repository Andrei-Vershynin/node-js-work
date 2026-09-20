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

let products = [
  {
    id: 1,
    name: 'keyboard',
    price: 760,
    category: 'electronics',
    image: '',
    count: 10
  },
  {
    id: 2,
    name: 'mouse',
    price: 550,
    category: 'electronics',
    image: '',
    count: 10
  },
  {
    id: 3,
    name: 'monitor',
    price: 1500,
    category: 'electronics',
    image: '',
    count: 5
  },
  {
    id: 4,
    name: 'headphones',
    price: 1200,
    category: 'electronics',
    image: '',
    count: 15
  },
  {
    id: 5,
    name: 'webcamera',
    price: 500,
    category: 'electronics',
    image: '',
    count: 100
  }
];

function addProduct(product) {
  return new Promise((resolve) => {
    setTimeout(() => {
      products = [
        ...products,
        product
      ];

      resolve(product);
    }, 2000);
  });
}

app.get('/', (req, res) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');

  res.status(200).json({
    date: now
  });
});

app.get('/products', (req, res) => {
  const { take, category } = req.query;

  let result = [...products];

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (take !== undefined) {
    const takeNumber = parseInt(take);

    if (Number.isInteger(takeNumber) && takeNumber >= 0) {
      result = result.slice(0, takeNumber);
    }
  }

  res.status(200).json(result);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  if (!Number.isInteger(productId)) {
    return res.status(400).json({
      message: 'id must be a valid integer'
    });
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      message: 'product not found'
    });
  }

  res.status(200).json(product);
});

app.post('/products', async (req, res) => {
  const { name, price, category, image } = req.body;

  if (
    typeof name !== 'string' || name.trim() == '' ||
    typeof price !== 'number' || price <= 0 ||
    typeof category !== 'string' || category.trim() == ''
  ) {
    return res.status(422).json({
      message: 'Invalid product data'
    });
  }

  const productExists = products.find((p) => {
    return p.name.toLowerCase() == name.trim().toLowerCase();
  });

  if (productExists) {
    return res.status(409).json({
      message: 'Conflict'
    });
  }

  const newProduct = {
    id: products.length + 1,
    name: name.trim(),
    price: price,
    category: category.trim(),
    image: image || ''
  };

  const createdProduct = await addProduct(newProduct);

  res.status(201).json(createdProduct);
});

app.listen(PORT, HOST, () => {
  console.log(`server is runnig on http://${HOST}:${PORT}`);
});