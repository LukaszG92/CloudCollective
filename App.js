const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const commentRouter = require('./src/routes/commentRoute');
const postRouter = require('./src/routes/postRoute');
const userRouter = require('./src/routes/userRoute');

const sequelize = require('./src/utils/database');
const User = require('./src/Models/userModel');
const Post = require('./src/Models/postModel');
const Comment = require('./src/Models/commentModel');
const path = require("path");

const app = express();

Comment.belongsTo(User, {as: 'author'})
Comment.belongsTo(Post)
Post.belongsTo(User, {as: 'creator'})
User.belongsToMany(Post, { through: sequelize.define('Likes', {}, { timestamps:false }), foreignKey: 'userLike' });

sequelize.sync();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.use(express.static(path.resolve(__dirname,'frontend', 'build')));
app.get( '*' , (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'))
})

console.log(path.resolve(__dirname, 'frontend', 'public', 'index.html'))

app.listen(8000);