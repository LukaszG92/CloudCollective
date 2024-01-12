const router = require("express").Router();
const userController = require('../controllers/userController')

router.post('/signup', userController.signup);
router.post('/login', userController.signin);
router.patch('/update', userController.updateUser)
router.get('/search/:username', userController.searchUser);
router.get('/:username');
router.get('/:user/followers');
router.get('/:user/followings');
router.post('/follow/:user');

module.exports = router;