const router = require("express").Router();
const commentController = require("../controllers/commentController");
const {check} = require("express-validator");

router.post('/:post/new', [
    check('commentInput', 'Comment text cannot be empty.').notEmpty(),
], commentController.createComment);
router.get('/:post', commentController.getPostComments);

module.exports = router;