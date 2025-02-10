"use client";

import { useState, useEffect } from "react";

export default function SiswaPage() {
  const [siswa, setSiswa] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [NISN, setNISN] = useState("");
  const [nama, setNama] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [agama, setAgama] = useState("");
  const [kelas, setKelas] = useState("");
  const [editingId, setEditingId] = useState(null);

  const endpoint = "http://localhost:5000/api/siswa";
  const endpointKelas = "http://localhost:5000/api/kelas";

  const fetchData = async () => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setSiswa(data);
    } catch (error) {
      console.error("Error fetching guru:", error);
    }
  };

  const fetchKelas = async () => {
    try {
      const res = await fetch(endpointKelas);
      const data = await res.json();
      setDataKelas(data);
    } catch (error) {
      console.error("Error fetching kelas:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchKelas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      NISN,
      nama,
      tempat_lahir: tempatLahir,
      jenis_kelamin: jenisKelamin,
      agama,
      kelas_id: kelas,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${endpoint}/${editingId}` : endpoint;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Berhasil di Tambah");
    } else {
      console.error("Upload error:", data.error);
    }

    setNISN("");
    setNama("");
    setTempatLahir("");
    setJenisKelamin("");
    setAgama("");
    setKelas("");
    setEditingId(null);
    fetchData();
  }

  function handleEdit(siswa) {
    setNISN(siswa.nisn);
    setNama(siswa.nama);
    setTempatLahir(siswa.tempat_lahir);
    setJenisKelamin(siswa.jenis_kelamin);
    setAgama(siswa.agama);
    setKelas(siswa.kelas_id);
    setEditingId(siswa.nisn);
  }

  async function handleDelete(nisn) {
    await fetch(`${endpoint}/${nisn}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div className="p-5 w-full flex flex-col bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {editingId ? "Edit Siswa" : "Tambah Siswa"}
        </h2>

        <label htmlFor="NISN" className="text-lg text-gray-600">
          NISN
        </label>
        <input
          id="NISN"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          value={NISN}
          onChange={(e) => setNISN(e.target.value)}
          placeholder="Masukkan NISN"
          required
        />

        <label htmlFor="nama" className="text-lg text-gray-600">
          Nama
        </label>
        <input
          id="nama"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan Nama"
          required
        />

        <label htmlFor="tempat_lahir" className="text-lg text-gray-600">
          Tempat Lahir
        </label>
        <input
          id="tempat_lahir"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={tempatLahir}
          onChange={(e) => setTempatLahir(e.target.value)}
          placeholder="Masukkan Tempat Lahir"
          required
        />

        <label htmlFor="jenis_kelamin" className="text-lg text-gray-600">
          Jenis_Kelamin
        </label>
        <input
          id="jenis_kelamin"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={jenisKelamin}
          onChange={(e) => setJenisKelamin(e.target.value)}
          placeholder="Masukkan Jenis Kelamin"
          required
        />

        <label htmlFor="agama" className="text-lg text-gray-600">
          Agama
        </label>
        <input
          id="tempat_lahir"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={agama}
          onChange={(e) => setAgama(e.target.value)}
          placeholder="Masukkan Agama"
          required
        />

        <label htmlFor="kelas" className="text-lg text-gray-600">
          Kelas
        </label>
        <select
          id="kelas"
          name="kelas"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={kelas || ""} 
          onChange={(e) => setKelas(e.target.value)}
          required
        >
          <option value="">Pilih Kelas</option>
          {dataKelas.map((item) => (
            <option key={item.id} value={item.id} defaultValue={item.id === kelas}>
              {item.kelas}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          {editingId ? "Update Data" : "Tambah Data"}
        </button>
      </form>

      <div className="mt-8 w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">NISN</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Tempat Lahir</th>
              <th className="p-3 text-left">Jenis Kelamin</th>
              <th className="p-3 text-left">Agama</th>
              <th className="p-3 text-left">Kelas</th>
              <th className="p-3 text-left">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {siswa.map((item) => (
              <tr key={item.nisn} className="border-b hover:bg-gray-100">
                <td className="p-3">{item.nisn}</td>
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.tempat_lahir}</td>
                <td className="p-3">{item.jenis_kelamin}</td>
                <td className="p-3">{item.agama}</td>
                <td className="p-3">{item.kelas}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.nisn)}
                    className="text-red-600 hover:underline mr-2"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
