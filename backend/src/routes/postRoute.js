const router = require("express").Router()
const postController = require('../controllers/postController')
const fileController = require("../controllers/fileController")
const {check} = require("express-validator");

router.post('/new', fileController.single('image'), [
    check('description', 'Description cannot be empty.').notEmpty(),
], postController.createPost);

router.patch('/:post', [
    check('description', 'Description cannot be empty.').notEmpty(),
], postController.updatePost);

router.delete('/:post', postController.deletePost);
router.get('/p/:post', postController.findPost);
router.get('/feed', postController.feed);
router.get('/explore', postController.explore);
router.get('/u/:user', postController.getUserPost);
router.get('/:post/like', postController.likePost);
router.get('/:post/likes', postController.getPostLikes);
module.exports = router;