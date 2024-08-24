const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { body } = require('express-validator');
const handleErrorMsg = require('../middlewares/handleErrorMsg');
const User = require('../models/User');
const bcrypt = require("bcrypt");

// register api
router.post('/register', [
    body('name').notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Email is required"),
    body('email').custom(async value => {
        const user = await User.findOne({email : value});
        if (user) {
          throw new Error('E-mail already in use');
        }
    }),
    body('password').notEmpty().withMessage("Password is required"),
], handleErrorMsg, AuthController.register);

// login api
router.post('/login',[
  body('email').notEmpty().withMessage("Email is required"),
  body('email').custom(async value => {
      const user = await User.findOne({email : value});
      if (!user) {
        throw new Error('E-mail is not registered yet.');
      }
  }),
  body('password').notEmpty().withMessage("Password is required"),
  body('password').custom(async (value, { req }) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isPasswordMatched = await bcrypt.compare(value, user.password);
      if (!isPasswordMatched) {
        throw new Error('Password is incorrect');
      }
    }
  })
], handleErrorMsg, AuthController.login);

// user data api
router.get('/user', AuthController.getUser);


router.post('/logout', AuthController.logout);

module.exports = router;