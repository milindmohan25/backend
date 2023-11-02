const Comment = require('../model/Comment.model');
const Post = require('../model/Post.model');
const User = require('../model/User.model');

//get all comment
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json({
      status: 'success',
      comments,
    });
  } catch (err) {
    throw err;
  }
};

// get all comment by postId
exports.getAllCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    });

    res.status(200).json({
      status: 'success',
      comments,
    });
  } catch (err) {
    throw err;
  }
};

// get all comment by userId
exports.getAllCommentsByUserId = async (req, res) => {
  try {
    const comments = await Comment.find({
      commenterId: req.params.userId,
    });

    res.status(200).json({
      status: 'success',
      comments,
    });
  } catch (err) {
    throw err;
  }
};

//create a new comment
exports.createAComment = async (req, res) => {
  try {
    const { comment,postId } = req.body;
    const post = await Comment.create({
      comment,
      postId,
    });
    let user = await User.findById(req.user._id);
    user.comments.push(post._id);
    await user.save(); //save changes made to the user doc

    let postUpdate = await Post.findById({ _id: postId });
    postUpdate.comments.push(post._id);
    await postUpdate.save();

    //send back response
    res.status(201).json({
      status: 'success',
      post,
    });
  } catch (err) {
    // throw err;
    console.log( "errr" , err , "err")
  }
};

//update a comment
exports.updateAComment = async (req, res) => {
  const { state, body } = req.body;
  try {
    const commentFound = await Comment.findById(req.params.commentId);
    if (!commentFound) {
      return res.status(404).json({
        status: 'Fail',
        message: `Post not found!`,
      });
    }
    // console.log(commentFound.commenterId.toString(), req.user._id.toString());
    //check if post belongs to the user initiatin the request
    if (commentFound.commenterId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: 'Fail',
        message: `You can only update a post you created!`,
      });
    }

    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      comment,
    });
  } catch (err) {
    throw err;
  }
};

//delete a comment
exports.deleteAComment = async (req, res) => {
  try {
    const commentFound = await Comment.findById(req.params.commentId);
    if (!commentFound) {
      return res.status(404).json({
        status: 'Fail',
        message: `Comment not found!`,
      });
    }
    //check if post belongs to the user initiatin the request
    if (commentFound.commenterId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: 'Fail',
        message: `You can only delete a comment you created!`,
      });
    }

    const comment = await Comment.findByIdAndRemove(req.params.commentId, {
      commenterId: req.user.id,
    });

    //delete comment from 'comments' array in user the document
    const commentByUser = await User.findById(req.user._id);
    commentByUser.comments.pull(comment._id);
    await commentByUser.updateOne({ comments: commentByUser.comments });

    //delete comment from 'comments' array in post the document
    const commentByPost = await Post.findById(comment.postId);
    commentByPost.comments.pull(comment._id);
    await commentByPost.updateOne({ comments: commentByPost.comments });

    //return deleted post
    res.status(200).json({
      status: 'success',
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    throw err;
  }
};
