const express = require('express')
const passport = require('passport')

const userControllers = require('../controllers/userController')

const router = express.Router()



router.post('/register',userControllers.registerUser)
router.post('/login', userControllers.loginUser)
router.post('loginAdmin',userControllers.loginAdminUser)
router.get('/users', userControllers.getAllUsers)
router.post('/user/:userId',userControllers.updateUser)



module.exports = router
