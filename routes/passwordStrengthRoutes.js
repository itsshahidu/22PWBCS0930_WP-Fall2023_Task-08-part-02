const express = require('express');
const router = express.Router();
const passwordValidator = require('password-validator');

// here we are creating a schema for password validations
const schema = new passwordValidator();
schema
  .is().min(8)      // minimum length is 8
  .is().max(20)     // maximum length is 20
  .has().uppercase()// it must have uppercase letters
  .has().lowercase()// it must have lowercase letters
  .has().digits(1)  // it must have at least 1 digit
  .has().symbols(1) // it must have at least 1 symbol
  .has().not().spaces(); // it should not have spaces

// here is the middleware to parse JSON in POST requests
router.use(express.json());

// here are the endpoints to check password strength
router.post('/check-password', (req, res) => {
  const { password } = req.body;

  // validate the password against the schema
  const isValid = schema.validate(password);
  if (isValid) {
    res.status(200).json({ message: 'you have a strong password!' });
  } else {
    res.status(400).json({ message: 'you have a weak password! its not meeting with requirements.' });
  }
});

module.exports = router;