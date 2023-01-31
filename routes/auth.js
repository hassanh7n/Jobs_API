const express = require('express');
const router = express.Router();
const {
    LogIn,
    Register
} = require('../controllers/auth');

router.route('/register').post(Register)
router.route('/LogIn').post(LogIn)



module.exports = router;