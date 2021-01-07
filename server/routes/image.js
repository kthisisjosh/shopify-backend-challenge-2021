const express = require('express')
const router = express.Router()

const { create,
        imageById,
        read,
        remove, 
        list,
        photo } = require('../controllers/image')

const { requireSignin, isAuth } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/image/:imageId', read)
router.post('/image/create/:userId', requireSignin, isAuth, create)
router.delete('/image/:imageId/:userId', requireSignin, isAuth, remove)
router.get('/images', list)
router.get('/image/photo/:imageId', photo)

router.param('userId', userById)
router.param('imageId', imageById)

module.exports = router
