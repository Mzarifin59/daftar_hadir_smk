const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all users
router.get("/siswa", (req, res) => {
  const query = `
        SELECT siswa.NISN, siswa.nama, siswa.tempat_lahir, siswa.jenis_kelamin, siswa.agama, kelas.kelas FROM siswa JOIN kelas ON siswa.kelas_id = kelas.id; 
    `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const siswaMap = {};

    results.forEach(row => {
        if (!siswaMap[row.NISN]) {
            siswaMap[row.NISN] = {
                nisn: row.NISN,
                nama: row.nama,
                kelas: row.kelas,
                tempat_lahir: row.tempat_lahir,
                jenis_kelamin: row.jenis_kelamin,
                agama: row.agama,
            };
        }
    });

    const response = Object.values(siswaMap);
    res.json(response);
  });
});

router.get("/siswa/:id", (req, res) => {
  const query = `
  SELECT siswa.NISN, siswa.nama, siswa.tempat_lahir, siswa.jenis_kelamin, siswa.agama, kelas.kelas FROM siswa JOIN kelas ON siswa.kelas_id = kelas.id WHERE siswa.NISN = ?; 
  `
  db.query(
    query,
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });
      const siswaMap = {};

      results.forEach(row => {
          if (!siswaMap[row.NISN]) {
              siswaMap[row.NISN] = {
                  nisn: row.NISN,
                  nama: row.nama,
                  kelas: row.kelas,
                  tempat_lahir: row.tempat_lahir,
                  jenis_kelamin: row.jenis_kelamin,
                  agama: row.agama,
              };
          }
      });
  
      const response = Object.values(siswaMap);
      res.json(response[0]);
    }
  );
});

router.post("/siswa", (req, res) => {
  const { NISN, nama, kelas_id, tempat_lahir, jenis_kelamin, agama } = req.body;

  if (!NISN || !nama || !kelas_id || !tempat_lahir || !jenis_kelamin || !agama) {
    return res.status(400).json({ error: "Semua field harus diisi!" });
  }

  const sql =
    "INSERT INTO siswa (NISN, nama, kelas_id, tempat_lahir, jenis_kelamin, agama) VALUES (?, ?, ?, ?, ?, ?)";
  
  db.query(sql, [NISN, nama, kelas_id, tempat_lahir, jenis_kelamin, agama], (err, result) => {
    if (err) {
      console.error("Error saat menambahkan siswa:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: "Siswa berhasil ditambahkan!" });
  });
});



router.put("/siswa/:id", (req, res) => {
  const { NISN, nama, kelas_id, tempat_lahir, jenis_kelamin, agama } = req.body;
  db.query(
    "UPDATE siswa SET NISN = ?, nama = ?, kelas_id = ?, tempat_lahir = ?, jenis_kelamin = ?, agama = ? WHERE NISN = ?",
    [NISN, nama, kelas_id, tempat_lahir, jenis_kelamin, agama, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated" });
    }
  );
});

router.delete("/siswa/:id", (req, res) => {
  db.query("DELETE FROM siswa WHERE NISN = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
});

module.exports = router;
