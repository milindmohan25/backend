const express = require('express');
const postController = require('../controllers/post.controller');
const authController = require('../auth/auth');

//create router
const router = express.Router();

//API endpoint structure
router.post('/', authController.authenticate, postController.createAPost); //protected route
router.get('/', postController.getAllPublishedPost);
router.get('/:postId', postController.getASinglePublishedPost);
router.put('/:postId', authController.authenticate, postController.updateAPost); //protected route
router.delete(
  '/:postId',
  authController.authenticate,
  postController.deleteAPost
); //protected route
module.exports = router;
