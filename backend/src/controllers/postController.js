const Post = require('../Models/postModel')
const Follow = require('../Models/followModel')
const sequelize = require('../utils/database');
const {Op} = require("sequelize");

exports.createPost = (req, res) => {
    Post.create({
        'description' : req.body.text,
        'creatorUsername' : req.user
    }).then(result => {
        console.log(result)
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
        post.update({'description': req.body.text})
            .then(result => {
                console.log(result)
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
        console.log(result)
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
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.feed = (req, res) => {
    let userUsername = req.user;
    Follow.findAll({where: {
        'following' : userUsername
        }
    }).then(results => {
        let followings = [];
        results.forEach(following => {
            followings.push({'creatorUsername': following['dataValues']['follower']})
        })
        console.log(followings)
        Post.findAll({
            where:{
                [Op.or]: followings
            },
            order: [
                ['id', 'DESC']
            ]
        }).then(result => {
            console.log(result)
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
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.likePost = (req, res) => {
    let userUsername = req.user;
    let postId = req.params.post;
    sequelize.query(`SELECT COUNT(*) as likesCount FROM likes WHERE userLike = '${userUsername}' AND postId = ${postId}`)
        .then(result => {
            let count = result[0][0]['likesCount']
            if(count === 0)
                sequelize.query(`INSERT INTO likes(userLike, postId) VALUES ('${userUsername}', ${postId});`)
                    .then(result => {
                        console.log(result)
                    }).catch(err => {
                    console.log(err)
                })
            else
                sequelize.query(`DELETE FROM likes WHERE userLike = '${userUsername}' AND postId = ${postId};`)
                    .then(result => {
                        console.log(result)
                    }).catch(err => {
                    console.log(err)
                })
        })
}