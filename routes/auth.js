const express = require('express')
const router = express.Router()
const {login,register} = require('../controllers/auth')

// router.route('/register').post(register)
router.post('/register',register)
router.route('/login').post(login)

module.exports = router