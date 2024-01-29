const User = require('../Models/userModel')
const Follow = require("../Models/followModel");
const {Op} = require("sequelize");
const bcrypt = require('bcryptjs');
const blobStorage = require('../utils/blobStorage');
const { validationResult } = require('express-validator')

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: "failure",
            message: errors.array()[0].msg
        })
    }
    let {nome, cognome, username, password, email} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne( {
            where: {
                'username': username
            }
        });
    } catch (err) {
        console.log(existingUser)
        return res.status(500).send({
            status: "failure",
            message: "Cannot create an user now, try again."
        })
    }

    if(existingUser)
        return res.status(403).send({
            status: "failure",
            message: "User already exists."
        })

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot create an user now, try again."
        })
    }

    let user;
    try {
         user = await User.create({
            'nome': nome,
            'cognome': cognome,
            'username': username,
            'password': hashedPassword,
            'email': email,
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot create an user now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "user saved successfully",
        data: {
            user: user
        }
    });
}

exports.signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: "failure",
            message: errors.array()[0].msg
        })
    }

    let {password, username} = req.body

    let user
    try {
        user = await User.findOne({
            where: {
                'username': username
            }
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot login now, try again."
        })
    }

    if (!user) {
        return res.status(403).send({
            status: "failure",
            message: "User does not exist, cannot login.",
        });
    }

    let isValidPassword = false
    try {
        isValidPassword = await bcrypt.compare(password, user.password);
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot login now, try again."
        })
    }

    if(!isValidPassword)
        return res.status(403).send({
            status: "failure",
            message: "Wrong password, cannot login."
        })

    res.status(200).send({
        status: "success",
        message: "logged in successfully",
        data: {
            username: user.username
        }
    });
}

exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: "failure",
            message: errors.array()[0].msg
        })
    }

    let {nome, cognome, bio, mail, profilePic} = req.body
    let username = req.headers.authorization;

    let url
    if(req.file)
        url = req.file.url.slice(0, req.file.url.indexOf('?'));
    else
        url = profilePic

    let user
    try {
        user = await User.findOne({
            where: {
                'username': username
            }
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot update user data now, try again."
        })
    }

    let updatedUser
    try {
        updatedUser = await user.update({
            'nome': nome,
            'cognome': cognome,
            'bio': bio,
            'mail': mail,
            'profilePic': url
        })
    }  catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot update user data now, try again."
        })
    }

    res.status(200).send({
        status: "success",
        message: "User data updated successfully.",
        data: {
            user: updatedUser
        },
    });
}

exports.searchUser = async (req, res) => {
    let username = req.params.user;

    let users
    try {
        users = await User.findAll({
            where: {
                'username': {[Op.like]: `${username}%`}
            },
            order: [
                ['username', 'ASC']
            ]
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot find users now, try again.",
        })
    }

    users.forEach((user) => {
        try {
            user['profilePic'] = blobStorage(user['profilePic'])
        } catch (err) {
            return res.status(500).send({
                status: "failure",
                message: "Cannot find user now, try again.",
            })
        }
    })

    res.status(200).send({
        status: "success",
        message: "Users retrieved successfully.",
        data: {
            users: users
        },
    });

}

exports.getUser = async (req, res) => {
    let username = req.params.user;

    let user
    try {
        user = await User.findOne({
            where: {
                'username': username
            }
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot find user now, try again.",
        })
    }

    try {
        user['profilePic'] = blobStorage(user['profilePic'])
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot find user now, try again.",
        })
    }

    res.status(200).send({
        status: "success",
        message: "User retrieved successfully.",
        data: {
            user: user
        },
    });

}

exports.getFollowers = async (req, res) => {
    let username = req.params.user;

    let followers
    try {
        followers = await Follow.findAll({
            attributes: ['follower'],
            where: {
                'following': username
            }
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot find followings now, try again.",
        })
    }

    let followersUsername = []
    followers.forEach((follower) => {
        followersUsername.push(follower.follower)
    })

    res.status(200).send({
        status: "success",
        message: "Followings retrieved successfully.",
        data: {
            followers: followersUsername
        },
    });
}

exports.getFollowing = async (req, res) => {
    let username = req.params.user;

    let followings
    try {
        followings = await Follow.findAll({
            attributes: ['following'],
            where: {
                'follower': username
            }
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot find followings now, try again.",
        })
    }

    let followingsUsername = []
    followings.forEach((following) => {
        followingsUsername.push(following.following)
    })

    res.status(200).send({
        status: "success",
        message: "Followings retrieved successfully.",
        data: {
            followings: followingsUsername
        },
    });
}

exports.follow = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: "failure",
            message: errors.array()[0].msg
        })
    }

    let follower = req.body.user;
    let following = req.params.user;

    let exists
    try {
        exists = await Follow.count({
            where: {
                'follower':follower,
                'following':following
            }
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            message: "Cannot follow the user now, try again."
        })
    }

    if(!exists) {
        try {
            Follow.create({
                'follower': follower,
                'following': following
            })
        } catch (err) {
            return res.status(500).send({
                status: "failure",
                message: "Cannot follow the user now, try again."
            })
        }

        res.status(200).send({
            status: "success",
            message: "User followed successfully.",
        })
    }
    else {
        try {
            Follow.destroy({
                where: {
                    'follower': follower,
                    'following': following
                }
            })
        } catch (err) {
            return res.status(500).send({
                status: "failure",
                message: "Cannot unfollow the user now, try again."
            })
        }

        res.status(200).send({
            status: "success",
            message: "User unfollowed successfully",
        });
    }
}
