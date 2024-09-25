const express = require('express')
const commentController = require('../controllers/commentController')


const router = express.Router()


router.post('/post/:postId/comment/:commentId',commentController.createComment)
router.put('/post/:postId/comment/:commentId', commentController.updateComment)
router.delete('/post/:postId/comment/:commentId',commentController.deleteComment)




module.exports = router