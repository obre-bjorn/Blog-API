const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()



router.get('/posts',postController.getAllPosts)
router.get('/post/:id', postController.getPostById)
router.post('/post',postController.createNewPost)
router.put('/post/:id',postController.updatePost)
router.delete('/post/:id',postController.deletePost)








module.exports = router