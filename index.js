const express = require('express');
const app = express();

// Middleware to the logging is here
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

// middleware to the authentication is here
const authenticateUser = (req, res, next) => {
  const isLoggedIn = true;
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('Unauthorized. please log-in');
  }
};

// importing the route files here

const ecommerceRoutes = require('./routes/ecommerceRoutes');
const passwordStrengthRoutes = require('./routes/passwordStrengthRoutes');

// mounting the routes here

app.use('/ecommerce', authenticateUser, ecommerceRoutes);
app.use('/password', passwordStrengthRoutes);

// middleware for parsing incoming requests is here

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);

// this is the main Route 

app.get("/",(req,res)=>{
  res.send("Please put (/ecommerce/products) or (/ecommerce/products/id)[id may be 1, 2, 3...] in front of the above link [localhost:3000] in the browser. Note: For password checking, that either it is strong or weak, we have to use Postman because its POST method." )
})

// starting the server here
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});