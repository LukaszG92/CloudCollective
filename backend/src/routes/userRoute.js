const router = require("express").Router();
const userController = require('../controllers/userController')

router.get('/signup', userController.signup);
router.get('/login', userController.signin);
router.get('/update', userController.updateUser)
router.get('/search/:username', userController.searchUser);
router.get('/u/:user', userController.getUser);
router.get('/:user/followers', userController.getFollowers);
router.get('/:user/followings', userController.getFollowing);
router.get('/follow/:user', userController.follow);

module.exports = router;