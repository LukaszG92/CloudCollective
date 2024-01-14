const User = require('../Models/userModel')
const Follow = require("../Models/followModel");
const {Op} = require("sequelize");

exports.signup = (req, res) => {
    try {
        User.create({
            'nome': req.body.nome,
            'cognome': req.body.cognome,
            'username': req.body.username,
            'password': req.body.password,
            'email': req.body.email,
        }).then(result => {
            res.session.user = req.body.cognome;
            res.status(200).send({
                status: "success",
                message: "user saved successfully",
            });
        })
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
}


exports.signin = (req, res) => {
    try {
        let password = req.body.password;
        let username = req.body.username;
        User.findOne({
            where: {
                'username': username
            }
        }).then(result => {
            if (!result) {
                return res.status(401).send({
                    status: "failure",
                    message: "user does not exist",
                });
            }
            if (password !== result['dataValues']['password']) {
                return res.status(401).send({
                    status: "failure",
                    message: "password is incorrect",
                });
            }
            res.session.user = username;
            res.status(200).send({
                status: "success",
                message: "logged in successfully",
            });
        })
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
}

exports.updateUser = (req, res) => {
    let username = req.session.user;
    User.findOne({where : {
            'username' : username
        }
    }).then(user => {
        user.update({
            'nome' : req.body.nome,
            'cognome' : req.body.cognome,
            'password' : req.body.password,
            'mail' : req.body.mail,
            'profilePic': req.body.proPic
        }).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    })
}

exports.searchUser = (req, res) => {
    let username = req.params.username;
    User.findAll({
        where: {
            'username' : { [Op.like] : `${username}%`}
        },
        order: [
            ['username', 'ASC']
        ]
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.getUser = (req, res) => {
    let username = req.params.user;
    User.findOne({
        where:{
             'username': username
        }
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.getFollowers = (req, res) => {
    let username = req.params.user;
    Follow.findAll({where: {
            'following' : username
        }
    }).then(results => {
        let followers = [];
        results.forEach(follower => {
            followers.push(follower['dataValues']['follower'])
        })
        console.log(followers);
    })
}

exports.getFollowing = (req, res) => {
    let username = req.params.user;
    try {
        Follow.findAll({
            where: {
                'follower': username
            }
        }).then(results => {
            let followings = [];
            results.forEach(following => {
                followings.push(following['dataValues']['following'])
            })
            console.log(followings)
            res.status(200).send({
                status: "success",
                message: "followings retrieved successfully",
                data: {
                    followings: followings
                },
            });
        })
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
}

exports.follow = (req, res) => {
    let follower = req.session.user;
    let following = req.params.user;
    Follow.count({
        where: {
            'follower':follower,
            'following':following
        }
    }).then(result => {
        if(result === 0)
            Follow.create({
                'follower':follower,
                'following':following
            }).then(result => {
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
        else
            Follow.destroy({
                where: {
                    'follower': follower,
                    'following': following
                }
            }).then(result => {
                    console.log(result)
                }).catch(err => {
                console.log(err)
            })
        })
}
