const router = require("express").Router();

router.post('/new');
router.patch('/:post');
router.delete('/:post');
router.get('/:post');
router.get('/feed');
router.get('/:user');
router.post('/:post/like');

module.exports = router;