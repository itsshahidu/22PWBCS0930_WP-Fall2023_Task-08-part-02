const express = require('express');
const router = express.Router();

// Sample e-commerce product data with attributes. a simulated Database (in reality, this would connect to a database)

const products = [
  { 
    id: 1, 
    name: 'Laptop', 
    description: 'Powerful laptop with high-performance features.',
    price: 999.99,
    brand: 'TechMaster',
    category: 'Electronics',
    inStock: 50
  },
  { 
    id: 2, 
    name: 'Smartphone', 
    description: 'Latest smartphone with advanced camera and features.',
    price: 699.99,
    brand: 'GadgetTech',
    category: 'Electronics',
    inStock: 30
  },
  { 
    id: 3, 
    name: 'Running Shoes', 
    description: 'Comfortable running shoes for all types of terrain.',
    price: 89.99,
    brand: 'SportFit',
    category: 'Fashion',
    inStock: 100
  }
];


// here is the route for displaying all the products (you can also display one product as well)

router.get('/products', (req, res) => {
  res.json(products);
});

// here is the route for adding a product to the cart (simulated cart).

router.post('/cart/add/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const selectedProduct = products.find(product => product.id === productId);
  
  if (selectedProduct) {
    
    // Simulated cart addition (In reality, this would update the cart of user)
    res.send(`Added ${selectedProduct.name} to the cart.`);
  } else {
    res.status(404).send('Product not found.');
  }
});

// here is the route to view products details by id

router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  
  // Find the product by id (a dummy logic!!!)
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  res.json(product); // Sending product details as a JSON format
});

// here is the route for user authentication

router.post('/login', (req, res) => {
  // simulated login logic (In reality, this would validate user credentials)
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

module.exports = router;