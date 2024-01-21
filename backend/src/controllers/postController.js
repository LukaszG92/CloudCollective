const Post = require('../Models/postModel')
const Follow = require('../Models/followModel')
const sequelize = require('../utils/database');
const {Op} = require("sequelize");
const fs = require("fs");

exports.createPost = (req, res) => {
    Post.create({
        'image': req.body.image,
        'description' : req.body.description,
        'creatorUsername' : req.headers.authorization
    }).then(result => {
        let post = result['dataValues'];
        res.status(200).send({
            status: "success",
            message: "Post created successfully",
            data: {
                post: post
            },
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.updatePost = (req, res) => {
    let postId = req.params.post;
    Post.findOne({where : {
        'id' : postId
        }
    }).then(post => {
        console.log(post)
        post.update({'description': req.body.description})
            .then(result => {
                console.log(result['dataValues'])
                let post = result['dataValues']
                res.status(200).send({
                    status: "success",
                    message: "Post updated successfully",
                    data: {
                        post: post
                    },
                })
            }).catch(err => {
            console.log(err)
        })
    })
}

exports.deletePost = (req, res) => {
    let postId = req.params.post;
    Post.destroy({where: {
        'id' : postId
        }
    }).then(result => {
        res.status(200).send({
            status: "success",
            message: "Post deleted successfully",
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.findPost = (req, res) => {
    let postId = req.params.post;
    Post.findOne({where : {
            'id' : postId
        }
    }).then(result => {
        let post = result['dataValues']
        res.status(200).send({
            status: "success",
            message: "Post retrieved successfully",
            data: {
                post: post
            },
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.feed = (req, res) => {
    let userUsername = req.headers.authorization;
    Follow.findAll({where: {
        'follower' : userUsername
        }
    }).then(results => {
        let followings = [];
        results.forEach(following => {
            followings.push({'creatorUsername': following['dataValues']['following']})
        })
        console.log(followings);
        Post.findAll({
            where:{
                [Op.or]: followings
            },
            order: [
                ['id', 'DESC']
            ]
        }).then(result => {
            let posts = [];
            result.forEach(post => {
                posts.push(post['dataValues'])
            })
            console.log(posts)
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
    })
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
    sequelize.query(`SELECT COUNT(*) as likesCount FROM likes WHERE userLike = '${userUsername}' AND postId = ${postId}`)
        .then(result => {
            let count = result[0][0]['likesCount']
            if(count === 0)
                sequelize.query(`INSERT INTO likes(userLike, postId) VALUES ('${userUsername}', ${postId});`)
                    .then(result => {
                        res.status(200).send({
                            status: "success",
                            message: "like added successfully",
                        });
                    }).catch(err => {
                    console.log(err)
                })
            else
                sequelize.query(`DELETE FROM likes WHERE userLike = '${userUsername}' AND postId = ${postId};`)
                    .then(result => {
                        res.status(200).send({
                            status: "success",
                            message: "like removed successfully",
                        });
                    }).catch(err => {
                    console.log(err)
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