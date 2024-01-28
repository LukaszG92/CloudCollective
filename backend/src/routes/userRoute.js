const router = require("express").Router()
const userController = require('../controllers/userController')
const fileController = require("../controllers/fileController")
const { check } = require('express-validator');

router.post('/signup', [
    check('nome', 'Name cannot be empty.').notEmpty(),
    check('cognome', 'Cognome cannot be empty.').notEmpty(),
    check('username', 'Username cannot be empty.').notEmpty(),
    check('email', 'Email format is example@domain.tld.').isEmail(),
    check('password', 'Password minimum length is 8.').isString().isLength({min: 8}),
], userController.signup);

router.post('/login',[
    check('username', 'Username cannot be empty.').notEmpty(),
    check('password', 'Password cannot be empty.').isString().isLength({min: 8}),
], userController.signin);

router.post('/update', fileController.single('image'), [
    check('nome', 'Name cannot be empty.').notEmpty(),
    check('cognome', 'Cognome cannot be empty.').notEmpty(),
    check('email', 'Email format is example@domain.tld.').isEmail(),
], userController.updateUser)

router.get('/search/:user', userController.searchUser);
router.get('/u/:user', userController.getUser);
router.get('/:user/followers', userController.getFollowers);
router.get('/:user/followings', userController.getFollowing);

router.post('/follow/:user',[
    check('follower', 'Invalid user to follow.').notEmpty(),
], userController.follow);

module.exports = router;