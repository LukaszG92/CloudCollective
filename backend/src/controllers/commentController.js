const Comment = require('../Models/commentModel');


exports.createComment = async (req, res) => {
    let postId = req.params.post;
    let authorUsername = req.headers.authorization;
    let body = req.body.commentInput;

    let comment
    try  {
        comment = await Comment.create({
            'body' : body,
            'authorUsername' : authorUsername,
            'postId' : postId
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot create an user now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "Comments created successfully.",
        data: {
            comment: comment
        },
    });
}

exports.getPostComments = async (req, res) => {
    let comments
    try {
        comments = await Comment.findAll({
            where: {
                'postId': req.params.post
            },
            order: [
                ['id', 'DESC']
            ]
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot retrieve comments now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "Comments retrieved successfully.",
        data: {
            comments: comments
        }
    })
}