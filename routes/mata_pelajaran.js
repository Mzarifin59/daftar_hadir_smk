const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all users
router.get('/mata_pelajaran', (req, res) => {
    db.query('SELECT * FROM mata_pelajaran', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/mata_pelajaran/:id', (req, res) => {
    db.query('SELECT * FROM mata_pelajaran WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

router.post('/mata_pelajaran', (req, res) => {
    const { nama_pelajaran } = req.body;
    db.query('INSERT INTO mata_pelajaran (nama_pelajaran) VALUES (?)', [nama_pelajaran], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, nama_pelajaran });
    });
});

router.put('/mata_pelajaran/:id', (req, res) => {
    const {nama_pelajaran} = req.body;
    db.query('UPDATE mata_pelajaran SET nama_pelajaran = ? WHERE id = ?', [nama_pelajaran, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated' });
    });
});

router.delete('/mata_pelajaran/:id', (req, res) => {
    db.query('DELETE FROM mata_pelajaran WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
});

module.exports = router;
