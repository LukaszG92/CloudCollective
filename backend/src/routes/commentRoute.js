const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post('/:post/new', commentController.createComment);
router.get('/:post', commentController.getPostComments);

module.exports = router;