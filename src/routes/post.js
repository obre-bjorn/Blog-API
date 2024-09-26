const express = require('express')
const passport = require('passport')

const postController = require('../controllers/postController')
const {isUserAdmin} = require('../controllers/userController')


const router = express.Router()



router.get('/posts',postController.getAllPosts)
router.get('/post/:id', postController.getPostById)
router.post('/post', passport.authenticate('jwt', {session : false}),isUserAdmin, postController.createNewPost)
router.put('/post/:id', passport.authenticate('jwt', {session : false}),isUserAdmin,postController.updatePost)
router.delete('/post/:id', passport.authenticate('jwt', {session : false}),isUserAdmin, postController.deletePost)








module.exports = router