const router = require("express").Router();

router.post('/signup');
router.post('/login');
router.post('/logout');
router.patch('/update')
router.get('/search/:username');
router.get('/:username');
router.get('/:user/followers');
router.get('/:user/followings');
router.post('/follow/:user');
router.post('/:post/like');

module.exports = router;