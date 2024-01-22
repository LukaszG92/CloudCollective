const Post = require('../Models/postModel');
const User = require('../Models/userModel');
const Follow = require('../Models/followModel');
const sequelize = require('../utils/database');
const blobStorage = require('../utils/blobStorage');
const computerVision = require('../utils/imageClassifier');
const {Op} = require("sequelize");


exports.createPost = (req, res) => {
    let url = req.file.url.slice(0, req.file.url.indexOf('?'));
    if(req.file.blobSize < 4000000) {
        computerVision(req.file.url).then(topic => {
            Post.create({
                'image': url,
                'description': req.body.description,
                'creatorUsername': req.headers.authorization,
                'topic': topic
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
        })
    } else {
        Post.create({
            'image': url,
            'description': req.body.description,
            'creatorUsername': req.headers.authorization,
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
}

exports.updatePost = (req, res) => {
    let postId = req.params.post;
    Post.findOne({where : {
        'id' : postId
        }
    }).then(post => {
        post.update({'description': req.body.description})
            .then(result => {
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
        post['image'] = blobStorage(post['image'])
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
                post['dataValues']['image'] = blobStorage(post['dataValues']['image'])
                posts.push(post['dataValues'])
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
    })
}

exports.explore = (req, res) => {
    let userUsername = req.headers.authorization;
    User.findOne({where: {
            'username' : userUsername
        }
    }).then(user => {
        let interests = [user['dataValues']['interest1'], user['dataValues']['interest2'], user['dataValues']['interest3']];
        sequelize.query(`SELECT * FROM likes WHERE userLike = '${userUsername}'`).then( results => {
            let likedPosts = []
            results[0].forEach(result => {
                likedPosts.push(result['postId']);
            })
            Post.findAll({
                where: {
                    topic: {
                        [Op.or]: interests
                    },
                    creatorUsername: {
                        [Op.not]: userUsername
                    },
                    id: {
                        [Op.not]: likedPosts
                    }
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then(result => {
                let posts = [];
                result.forEach(post => {
                    post['dataValues']['image'] = blobStorage(post['dataValues']['image'])
                    posts.push(post['dataValues'])
                })
                res.status(200).send({
                    status: "success",
                    message: "explore retrieved successfully",
                    data: {
                        posts: posts
                    },
                });
            }).catch(err => {
                console.log(err)
            })
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