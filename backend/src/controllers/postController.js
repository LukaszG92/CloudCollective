const Post = require('../Models/postModel')
const Follow = require('../Models/followModel')

exports.createPost = (req, res) => {
    Post.create({
        'description' : "Post from API",
        'creatorUsername' : "LukasG"
    }).then(result => {
        console.log(result)
        res.redirect('/home')
    }).catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}

exports.updatePost = (req, res) => {
    let postId = req.params.post;
    Post.findOne({where : {
        'postId' : postId
        }
    }).then(post => {
        post.update({'description': 'updated Post'})
            .then(result => {
                console.log(result)
                res.redirect('/home')
            }).catch(err => {
            console.log(err)
            res.redirect('/error')
        })
    })
}

exports.deletePost = (req, res) => {
    let postId = req.params.post;
    Post.destroy({where: {
        'postId' : postId
        }
    }).then(result => {
        console.log(result)
        res.redirect('/home')
    }).catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}

exports.findPost = (req, res) => {
    let postId = req.params.post;
    Post.findOne({where : {
            'postId' : postId
        }
    }).then(result => {
        console.log(result)
        res.redirect('/home')
    }).catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}

exports.getFeed = (req, res) => {
    let userUsername = req.user;
    Follow.findAll({where: {
        'following' : userUsername
        }
    }).then(results => {
        let followings = [];
        results.forEach(following => {
            followings.push({'creatorUsername': following})
        })
        Post.findAll({
            where:{
                $or: followings
            },
            order: ['id', 'DESC']
        }).then(result => {
            console.log(result)
            res.redirect('/home')
        }).catch(err => {
            console.log(err)
            res.redirect('/error')
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
        res.redirect('/home')
    }).catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}