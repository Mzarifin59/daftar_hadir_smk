const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/absensi", (req, res) => {
  const query = `
    SELECT 
      siswa.NISN, siswa.nama, siswa.kelas_id, kelas.kelas, daftar_hadir.id,
      daftar_hadir.date, daftar_hadir.status, daftar_hadir.note
    FROM siswa
    JOIN kelas ON siswa.kelas_id = kelas.id
    LEFT JOIN daftar_hadir ON siswa.nisn = daftar_hadir.nisn_siswa
    ORDER BY daftar_hadir.date DESC;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const absensiMap = {};

    results.forEach(row => {
      if (!absensiMap[row.id]) {
        absensiMap[row.id] = {
          id : row.id,
          nisn: row.NISN,
          nama: row.nama,
          kelas: row.kelas,
          tanggal: row.date,
          status: row.status,
          catatan: row.note
        };
      }
    });

    const response = Object.values(absensiMap);
    res.json(response);
  });
});

router.get("/absensi/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      siswa.NISN, siswa.nama, siswa.kelas_id, kelas.kelas, daftar_hadir.id,
      daftar_hadir.date, daftar_hadir.status, daftar_hadir.note
    FROM siswa
    JOIN kelas ON siswa.kelas_id = kelas.id
    LEFT JOIN daftar_hadir ON siswa.nisn = daftar_hadir.nisn_siswa
    WHERE siswa.NISN = ?;
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Data absensi tidak ditemukan" });

    const absensi = results.map(row => ({
      id: row.id,
      nisn: row.NISN,
      nama: row.nama,
      kelas: row.kelas,
      tanggal: row.date,
      status: row.status,
      catatan: row.note
    }));

    res.json(absensi);
  });
});


router.post("/absensi", (req, res) => {
  const { nisn_siswa, date, status, note } = req.body;

  console.log("Data yang diterima:", req.body)

  if (!nisn_siswa || !date || !status) {
    return res.status(400).json({ error: "NISN, tanggal, dan status harus diisi!" });
  }

  const query = `INSERT INTO daftar_hadir (nisn_siswa, date, status, note) VALUES (?, ?, ?, ?)`;
  db.query(query, [nisn_siswa, date, status, note], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Absensi berhasil ditambahkan", id: result.insertId });
  });
});

router.put("/absensi/:id", (req, res) => {
  const { id } = req.params;
  const { nisn_siswa, date, status, note } = req.body;

  if (!nisn_siswa || !date || !status) {
    return res.status(400).json({ error: "NISN, tanggal, dan status harus diisi!" });
  }

  const query = `UPDATE daftar_hadir SET nisn_siswa = ?, date = ?, status = ?, note = ? WHERE id = ?`;
  db.query(query, [nisn_siswa, date, status, note, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Data absensi tidak ditemukan" });
    }
    res.json({ message: "Absensi berhasil diperbarui" });
  });
});


router.delete("/absensi/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM daftar_hadir WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Data absensi tidak ditemukan" });
    }
    res.json({ message: "Absensi berhasil dihapus" });
  });
});

module.exports = router;
