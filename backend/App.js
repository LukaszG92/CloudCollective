const express = require("express");

const commentRouter = require('./src/routes/commentRoute');
const postRouter = require('./src/routes/postRoute');
const userRouter = require('./src/routes/userRoute');

const sequelize = require('./src/utils/database');
const User = require('./src/Models/userModel');
const Post = require('./src/Models/postModel');
const Comment = require('./src/Models/commentModel');

const app = express();

Comment.belongsTo(User, {as: 'author'})
Comment.belongsTo(Post)
Post.belongsTo(User, {as: 'creator'})
User.belongsToMany(Post, { through: sequelize.define('Likes', {}, {timestamps:false}), foreignKey: 'userLike'});

sequelize.sync()

app.use('/api/comments/', commentRouter);
app.use('/api/posts/', postRouter);
app.use('/api/user/', userRouter);


app.listen(8000);