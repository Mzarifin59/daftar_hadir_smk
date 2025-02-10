const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/user', (req, res) => {
    db.query('SELECT * FROM login_user', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;