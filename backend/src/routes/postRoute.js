const router = require("express").Router();
const postController = require('../controllers/postController')

router.post('/new', postController.createPost);
router.patch('/:post', postController.updatePost);
router.delete('/:post', postController.deletePost);
router.get('/:post', postController.findPost);
router.get('/feed', postController.getFeed);
router.get('/:user', postController.getUserPost);
router.post('/:post/like', postController.likePost);

module.exports = router;