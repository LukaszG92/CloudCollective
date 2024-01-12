const Comment = require('../Models/commentModel');


exports.createComment = (req, res) => {
    let postId = req.params.post;
    let authorUsername = "LukasG";
    Comment.create({
        'body' : "req.body.text",
        'authorUsername' : authorUsername,
        'postId' : postId
        }
    ).then(result => {
        console.log(result)
        res.redirect('/home')
    }).catch(err => {
        console.log(err)
        res.redirect('/home')
    })
}

exports.getPostComments = (req, res) => {
    Comment.findAll({where: {'postId' : req.params.post}}).then(results => console.log(results));
}