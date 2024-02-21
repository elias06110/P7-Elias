const express = require('express');
const router = express.Router();
const loginValidator = require('../middleware/loginValidator')
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/passwordValidator')

router.post('/signup', loginValidator,passwordValidator, userCtrl.signup);
router.post('/login',loginValidator,passwordValidator, userCtrl.login);


module.exports = router;