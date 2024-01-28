const Post = require('../Models/postModel');
const User = require('../Models/userModel');
const Follow = require('../Models/followModel');
const sequelize = require('../utils/database');
const blobStorage = require('../utils/blobStorage');
const computerVision = require('../utils/imageClassifier');
const {Op} = require("sequelize");
const {validationResult} = require("express-validator");


exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: "failure",
            message: errors.array()[0].msg
        })
    }

    let url = req.file.url.slice(0, req.file.url.indexOf('?'))
    let description = req.body.description
    let creatorUsername = req.headers.authorization

    let topic = ""
    if(req.file.blobSize < 4000000) {
        try {
            topic = await computerVision(req.file.url)
        } catch (err) {
            return res.status(500).send({
                status: "failure",
                message: "Cannot create a post now, try again."
            })
        }
    }

    let post
    try {
        post = await Post.create({
            'image': url,
            'description': description,
            'creatorUsername': creatorUsername,
            'topic': topic
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot create a post now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "Post created successfully",
        data: {
            post: post
        },
    })
}

exports.updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: "failure",
            message: errors.array()[0].msg
        })
    }

    let postId = req.params.post
    let description = req.body.description

    let post
    try {
        post = await Post.findOne({
            where: {
                'id': postId
            }
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot update the post now, try again."
        })
    }

    let updatedPost
    try {
        updatedPost = post.update({
            'description': description
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot update the post now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "Post updated successfully.",
        data: {
            post: updatedPost
        },
    })
}

exports.deletePost = async (req, res) => {
    let postId = req.params.post;

    let post
    try {
        post = await Post.findOne({where: {
                'id' : postId
            }
        })
    } catch(err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot delete the post now, try again."
        })
    }

    if(!post) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot delete the post now, try again."
        })
    }

    try{
        post.destroy()
    } catch(err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot delete the post now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "Post deleted successfully.",
    })
}

exports.findPost = async (req, res) => {
    let postId = req.params.post

    let post
    try {
        post = await Post.findOne({
            where: {
                'id': postId
            }
        })
    } catch(err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot find the post now, try again."
        })
    }

    try{
        post['image'] = blobStorage(post['image'])
    } catch(err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot find the post now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "Post retrieved successfully",
        data: {
            post: post
        },
    })
}

exports.feed = async (req, res) => {
    let userUsername = req.headers.authorization;

    let followings
    try {
        followings = await Follow.findAll({
            where: {
                'follower' : userUsername
            }
        })
    } catch (err){
        return res.status(500).send({
            status: "failure",
            message: "Cannot get the feed now, try again."
        })
    }

    if(!followings.length){
        return res.status(200).send({
            status: "success",
            message: "Feed retrieved successfully.",
            data: {
                posts: []
            },
        })
    }

    let followingsUsername = []
    followings.forEach( (following) => {
        followingsUsername.push(following['following'])
    })

    let posts
    try {
        posts = await Post.findAll({
            where: {
                'creatorUsername': { [Op.or]: followingsUsername }
            },
            order: [
                ['id', 'DESC']
            ]
        })
    } catch (err){
        console.log(err)
        return res.status(500).send({
            status: "failure",
            message: "Cannot get the feed now, try again."
        })
    }

    posts.forEach( (post) => {
        try {
            post.image = blobStorage(post.image)
        } catch (err){
            return res.status(500).send({
                status: "failure",
                message: "Cannot get the explore now, try again."
            })
        }
    })

    res.status(200).send({
        status: "success",
        message: "Feed retrieved successfully.",
        data: {
            posts: posts
        },
    })
}

exports.explore = async (req, res) => {
    let userUsername = req.headers.authorization;

    let user
    try {
        user = await User.findOne({
            where: {
                'username': userUsername
            }
        })
    } catch (err){
        return res.status(500).send({
            status: "failure",
            message: "Cannot get the explore now, try again."
        })
    }

    let interests = [user.interest1, user.interest2, user.interest3]

    let likedPosts
    try {
        likedPosts = await sequelize.query(
            `SELECT postId
             FROM likes
             WHERE userLike = '${userUsername}'`)
    } catch (err){
        return res.status(500).send({
            status: "failure",
            message: "Cannot get the explore now, try again."
        })
    }

    let likedIds = []
    likedPosts[0].forEach( (likedPost) => {
        likedIds.push(likedPost.postId)
    })

    let explorePosts
    try {
        explorePosts = await Post.findAll({
            where: {
                topic: {
                    [Op.or]: interests
                },
                creatorUsername: {
                    [Op.not]: userUsername
                },
                id: {
                    [Op.not]: likedIds
                }
            },
            order: [
                ['id', 'DESC']
            ]
        })
    } catch (err){
        return res.status(500).send({
            status: "failure",
            message: "Cannot get the explore now, try again."
        })
    }

    explorePosts.forEach( (post) => {
        try {
            post.image = blobStorage(post.image)
            console.log(post.image)
        } catch (err){
            return res.status(500).send({
                status: "failure",
                message: "Cannot get the explore now, try again."
            })
        }
    })

    res.status(200).send({
        status: "success",
        message: "explore retrieved successfully",
        data: {
            posts: explorePosts
        },
    });
}

exports.getUserPost = (req, res) => {
    let userUsername = req.params.user;
    Post.findAll({
        where:{
            'creatorUsername':userUsername
        }
    }).then(result => {
        let posts = [];
        result.forEach(post => {
            posts.push(post['dataValues']['id'])
        })
        res.status(200).send({
            status: "success",
            message: "feed retrieved successfully",
            data: {
                posts: posts
            },
        });
    }).catch(err => {
        console.log(err)
    })
}

exports.likePost = (req, res) => {
    let userUsername = req.headers.authorization;
    let postId = req.params.post;
    setUserInterest(userUsername);
    sequelize.query(`SELECT COUNT(*) as likesCount FROM likes WHERE userLike = '${userUsername}' AND postId = ${postId}`)
        .then(result => {
            let count = result[0][0]['likesCount']
            if(count === 0)
                sequelize.query(`INSERT INTO likes(userLike, postId) VALUES ('${userUsername}', ${postId});`)
                    .then( () => {
                        setUserInterest(userUsername).then(() => {
                            res.status(200).send({
                                status: "success",
                                message: "like added successfully",
                            });
                        })
                    }).catch(err => {
                    console.log(err)
                })
            else
                sequelize.query(`DELETE FROM likes WHERE userLike = '${userUsername}' AND postId = ${postId};`)
                    .then( () => {
                        setUserInterest(userUsername).then(() => {
                            res.status(200).send({
                                status: "success",
                                message: "like removed successfully",
                            });
                        })
                    }).catch(err => {
                    console.log(err)
                })
        })
}

const setUserInterest = async (userUsername) => {
    let interest1= null;
    let interest2= null;
    let interest3 = null;
    sequelize.query(`SELECT posts.topic, COUNT(*) as likesCount FROM likes JOIN posts ON likes.postId = posts.id WHERE userLike = '${userUsername}' AND posts.topic IS NOT NULL GROUP BY posts.topic ORDER BY likesCount DESC`)
        .then(result => {
            if (result[0].length === 1) {
                interest1 = result[0][0]['topic'];
            }
            if (result[0].length === 2) {
                interest1 = result[0][0]['topic'];
                interest2 = result[0][1]['topic'];
            }
            if (result[0].length > 3) {
                interest1 = result[0][0]['topic'];
                interest2 = result[0][1]['topic'];
                interest3 = result[0][2]['topic'];
            }
            User.findOne({
                where: {
                    'username': userUsername
                }
            }).then(user => {
                user.update({
                    'interest1': interest1,
                    'interest2': interest2,
                    'interest3': interest3
                })
            })
        })
}

exports.getPostLikes = (req, res) => {
    let postId = req.params.post;
    sequelize.query(`SELECT * FROM likes WHERE postId = ${postId}`)
        .then(result => {
            const likes = [];
            if(result[0].length) {
                result[0].forEach(like => {
                    likes.push(like['userLike']);
                })
            }
            res.status(200).send({
                status: "success",
                message: "likes retrieved successfully",
                data: {
                    likes: likes
                }
            });
        })
}