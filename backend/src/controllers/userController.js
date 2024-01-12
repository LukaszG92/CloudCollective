const User = require('../Models/userModel')
const Follow = require("../Models/followModel");
const {Op} = require("sequelize");

exports.signup = (req, res) => {
    User.create({
        'nome' : req.body.nome,
        'cognome' : req.body.cognome,
        'username' : req.body.username,
        'password' : req.body.password,
        'email' : req.body.email,
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}


exports.signin = (req, res) => {
    let password = req.body.password
    let username = req.body.username
    User.findOne({
        where: {
            'username' : username
        }
    }).then(results => {
        console.log(results)
        let savedPassword = results['dataValues']['password'];
        if(savedPassword === password)
            console.log('good-login')
        else
            console.log('not-login')
    }).catch(err => {
        console.log(err)
    })
}

exports.updateUser = (req, res) => {
    let username = req.user;
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
    Follow.findAll({where: {
            'follower' : username
        }
    }).then(results => {
        let followings = [];
        results.forEach(following => {
            followings.push(following['dataValues']['following'])
        })
        console.log(followings);
    })
}

exports.follow = (req, res) => {
    let follower = req.user;
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
