const express = require('express');
const router = express.Router();
const loginValidator = require('../middleware/loginValidator')
const userCtrl = require('../controllers/user');

router.post('/signup', loginValidator, userCtrl.signup);
router.post('/login',loginValidator, userCtrl.login);


module.exports = router;