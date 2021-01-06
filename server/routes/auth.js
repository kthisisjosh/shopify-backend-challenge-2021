const express = require('express')
const router = express.Router()

const { signup, signin, signout } = require('../controllers/auth');

router.get('/', (req, res) => {
    res.json({
        message: 'success'
    })
})

router.get('/signout', signout)
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router