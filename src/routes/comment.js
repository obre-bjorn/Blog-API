const express = require('express')
const passport = require('passport')

const commentController = require('../controllers/commentController')



const router = express.Router()


router.post('/post/:postId/comment', passport.authenticate('jwt', {session : false}),commentController.createComment)
router.put('/post/:postId/comment/:commentId', passport.authenticate('jwt', {session : false}) ,commentController.updateComment)
router.delete('/post/:postId/comment/:commentId', passport.authenticate('jwt', {session : false}),commentController.deleteComment)


module.exports = router