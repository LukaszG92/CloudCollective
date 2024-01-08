const express = require("express");

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

app.listen(8000);