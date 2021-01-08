const express = require('express');
const router = express.Router();

const {
    create,
    imageById,
    read,
    remove,
    list,
    listByUser,
    removeAllByUser,
    update,
} = require('../controllers/image');

const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/image/:imageId', read);
router.post('/image/create/:userId', requireSignin, isAuth, create);
router.put('/image/:imageId/:userId', requireSignin, isAuth, update);
router.delete('/image/:imageId/:userId', requireSignin, isAuth, remove);
router.delete('/image/:userId', requireSignin, isAuth, removeAllByUser);
router.get('/images', list);
router.get('/images/:userId', requireSignin, isAuth, listByUser);

router.param('userId', userById);
router.param('imageId', imageById);

module.exports = router;
