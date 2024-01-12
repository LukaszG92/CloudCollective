const Comment = require('../Models/commentModel');


exports.createComment = (req, res) => {
    let postId = req.params.post;
    let authorUsername = req.user;
    Comment.create({
        'body' : req.body.text,
        'authorUsername' : authorUsername,
        'postId' : postId
        }
    ).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.getPostComments = (req, res) => {
    Comment.findAll({where: {
        'postId' : req.params.post
        }
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}