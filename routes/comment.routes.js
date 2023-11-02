const express = require('express');
const commentController = require('../controllers/comment.controller');
const postController = require('../controllers/post.controller');
const authController = require('../auth/auth');

//create router
const router = express.Router();

//API endpoint structure
router.post('/', authController.authenticate, commentController.createAComment); //protected route
router.get('/', commentController.getAllComments);
router.get('/post/:postId', commentController.getAllCommentsByPostId);
router.get('/user/:userId', commentController.getAllCommentsByUserId);
router.put(
  '/:commentId',
  authController.authenticate,
  commentController.updateAComment
); //protected route
router.delete(
  '/:commentId',
  authController.authenticate,
  commentController.deleteAComment
); //protected route
module.exports = router;
