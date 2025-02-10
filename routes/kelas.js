const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/kelas', (req, res) => {
    db.query('SELECT * FROM kelas', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/kelas/:id', (req, res) => {
    db.query('SELECT * FROM kelas WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

router.post('/kelas', (req, res) => {
    const { kelas } = req.body;
    db.query('INSERT INTO kelas (kelas) VALUES (?)', [kelas], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, kelas});
    });
});

router.put('/kelas/:id', (req, res) => {
    const {kelas} = req.body;
    db.query('UPDATE kelas SET kelas = ? WHERE id = ?', [kelas, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated' });
    });
});

router.delete('/kelas/:id', (req, res) => {
    db.query('DELETE FROM kelas WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
});

module.exports = router;
