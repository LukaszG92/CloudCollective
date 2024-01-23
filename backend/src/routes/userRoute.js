const router = require("express").Router()
const userController = require('../controllers/userController')
const fileController = require("../controllers/fileController")

router.post('/signup', userController.signup);
router.post('/login', userController.signin);
router.post('/update', fileController.single('image'), userController.updateUser)
router.get('/search/:user', userController.searchUser);
router.get('/u/:user', userController.getUser);
router.get('/:user/followers', userController.getFollowers);
router.get('/:user/followings', userController.getFollowing);
router.post('/follow/:user', userController.follow);

module.exports = router;