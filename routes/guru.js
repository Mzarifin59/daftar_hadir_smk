const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all users
router.get('/guru', (req, res) => {
    const query = `SELECT guru.NIP, guru.nama, guru.usia, kelas.kelas FROM guru LEFT JOIN kelas ON guru.kelas_id = kelas.id`
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const guruMap = {};

        results.forEach(row => {
            if(!guruMap[row.NIP]){
                guruMap[row.NIP] = {
                    NIP: row.NIP,
                    nama: row.nama,
                    usia: row.usia,
                    kelas: row.kelas
                }
            }
        })
        const response = Object.values(guruMap)
        res.json(response);
    });
});

router.get('/guru/:id', (req, res) => {
    const query = `SELECT guru.NIP, guru.nama, guru.usia, kelas.kelas FROM guru LEFT JOIN kelas ON guru.kelas_id = kelas.id WHERE guru.NIP = ?`
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        const guruMap = {};

        results.forEach(row => {
            if(!guruMap[row.NIP]){
                guruMap[row.NIP] = {
                    NIP: row.NIP,
                    nama: row.nama,
                    usia: row.usia,
                    kelas: row.kelas
                }
            }
        })
        const response = Object.values(guruMap)
        res.json(response[0]);
    });
});

router.post('/guru', (req, res) => {
    const { NIP, nama, usia, kelas_id } = req.body;

    const query = `INSERT INTO guru (NIP, nama, usia, kelas_id) VALUES (?, ?, ?, ?)`;
    db.query(query, [NIP, nama, usia, kelas_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Guru berhasil ditambahkan", NIP, nama, usia, kelas_id });
    });
});


router.put('/guru/:NIP', (req, res) => {
    const { NIP } = req.params;
    const { nama, usia, kelas_id } = req.body;

    const query = `UPDATE guru SET nama = ?, usia = ?, kelas_id = ? WHERE NIP = ?`;
    db.query(query, [nama, usia, kelas_id, NIP], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Guru tidak ditemukan" });
        }

        res.json({ message: "Guru berhasil diperbarui", NIP, nama, usia, kelas_id });
    });
});

router.delete('/guru/:NIP', (req, res) => {
    const { NIP } = req.params;

    const query = `DELETE FROM guru WHERE NIP = ?`;
    db.query(query, [NIP], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Guru tidak ditemukan" });
        }

        res.json({ message: "Guru berhasil dihapus" });
    });
});


module.exports = router;
