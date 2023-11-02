const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'A Blog Post must have a title'],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
