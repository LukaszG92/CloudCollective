const Comment = require('../Models/commentModel');


exports.createComment = (req, res) => {
    let postId = req.params.post;
    let authorUsername = req.headers.authorization;
    let body = req.body.commentInput;
    console.log(body)
    Comment.create({
        'body' : body,
        'authorUsername' : authorUsername,
        'postId' : postId
        }
    ).then(result => {
        let comment = result['dataValues']
        res.status(200).send({
            status: "success",
            message: "comments created successfully",
            data: {
                comment: comment
            },
        });
    }).catch(err => {
        console.log(err)
    })
}

exports.getPostComments = (req, res) => {
    Comment.findAll({where: {
        'postId' : req.params.post
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        let comments = [];
        result.forEach(comment => {
            comments.push(comment['dataValues'])
        })
        res.status(200).send({
            status: "success",
            message: "comments retrieved successfully",
            data: {
                comments: comments
            },
        });
    }).catch(err => {
        console.log(err)
    })
}