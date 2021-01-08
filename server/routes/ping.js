const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
    const now = new Date();

    return res.status(200).json({
        status: 'OK',
        timestamp: '' + now.toLocaleString(),
    });
});

module.exports = router;
