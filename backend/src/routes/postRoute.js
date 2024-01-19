const router = require("express").Router();
const postController = require('../controllers/postController')

router.post('/new', postController.createPost);
router.patch('/:post', postController.updatePost);
router.delete('/:post', postController.deletePost);
router.get('/p/:post', postController.findPost);
router.get('/feed', postController.feed);
router.get('/u/:user', postController.getUserPost);
router.get('/:post/like', postController.likePost);
router.get('/:post/likes', postController.getPostLikes);
module.exports = router;