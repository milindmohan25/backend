const express = require('express');
const cors = require('cors');
//import post router and user router
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();

//add middleware to parse request body
// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware for API endpoints
app.use('/api', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

module.exports = app;
