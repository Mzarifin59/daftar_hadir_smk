const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all users
router.get('/nilai', (req, res) => {
    const query = `
    SELECT siswa.NISN, siswa.nama, nilai.id, nilai.nilai, nilai.jenis_nilai, mata_pelajaran.nama_pelajaran 
    FROM nilai 
    LEFT JOIN siswa ON nilai.siswa_id = siswa.NISN 
    LEFT JOIN mata_pelajaran ON nilai.mata_pelajaran = mata_pelajaran.id
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const nilaiMap = {};

        results.forEach(row => {
            if (!nilaiMap[row.NISN]) { 
                nilaiMap[row.NISN] = { 
                    id: row.id,
                    nisn: row.NISN,
                    nama: row.nama,
                    nilai: []
                };
            }

            if (row.nama_pelajaran) {
                nilaiMap[row.NISN].nilai.push({
                    nilai: row.nilai,
                    nama_pelajaran: row.nama_pelajaran.trim(),
                    jenis_nilai: row.jenis_nilai
                });
            }
        });

        const response = Object.values(nilaiMap);
        res.json(response);
    });
});


router.get('/nilai/:id', (req, res) => {
    const query = `
    SELECT siswa.nama, nilai.id, nilai.nilai, nilai.jenis_nilai, mata_pelajaran.nama_pelajaran FROM nilai LEFT JOIN siswa ON nilai.siswa_id = siswa.NISN LEFT JOIN mata_pelajaran ON nilai.mata_pelajaran = mata_pelajaran.id WHERE nilai.id = ?
    `
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        const nilaiMap = {};

        results.forEach(row => {
            if(!nilaiMap[row.id]){
                nilaiMap[row.id] = {
                    id: row.id,
                    nama: row.nama,
                    nilai: []
                };
            }

            if(row.nama_pelajaran){
                nilaiMap[row.id].nilai.push({
                    nilai: row.nilai,
                    nama_pelajaran: row.nama_pelajaran,
                    jenis_nilai: row.jenis_nilai
                })
            }
        });

        const response = Object.values(nilaiMap);
        res.json(response[0]);
    });
});


module.exports = router;
