"use client";

import { useState, useEffect } from "react";

export default function AbsensiPage() {
  const [absensi, setAbsensi] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [nisnSiswa, setNisnSiswa] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState(null);

  const endpoint = "http://localhost:5000/api/absensi";
  const endpointSiswa = "http://localhost:5000/api/siswa";
  const endpointKelas = "http://localhost:5000/api/kelas";

  const fetchData = async () => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setAbsensi(data);
    } catch (error) {
      console.error("Error fetching absensi:", error);
    }
  };

  const fetchSiswa = async () => {
    try {
      const res = await fetch(endpointSiswa);
      const data = await res.json();
      setDataSiswa(data);
    } catch (error) {
      console.error("Error fetching siswa:", error);
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
    fetchSiswa();
    fetchKelas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = { nisn_siswa: nisnSiswa, date, status, note };
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

    setNisnSiswa("");
    setDate("");
    setStatus("");
    setNote("");
    setEditingId(null);
    fetchData();
  }

  function handleEdit(item) {
    setNisnSiswa(item.nisn);
    setDate(item.tanggal);
    setStatus(item.status);
    setNote(item.catatan);
    setEditingId(item.id);
  }

  async function handleDelete(id) {
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    fetchData();
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-5 w-full flex flex-col bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {editingId ? "Edit Absensi" : "Tambah Absensi"}
        </h2>

        <label htmlFor="nisn_siswa" className="text-lg text-gray-600">
          Nama Siswa
        </label>
        <select
          id="nisn_siswa"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          value={nisnSiswa || ""}
          onChange={(e) => setNisnSiswa(e.target.value)}
          required
        >
          <option value="">Pilih Siswa</option>
          {dataSiswa.map((item) => (
            <option key={item.nisn} value={item.nisn}>
              {item.nama} - {item.kelas}
            </option>
          ))}
        </select>

        <label htmlFor="date" className="text-lg text-gray-600">
          Tanggal
        </label>
        <input
          id="date"
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          value={date ? date.substring(0, 10) : ""}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="status" className="text-lg text-gray-600">
          Status Kehadiran
        </label>
        <select
          id="status"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          value={status || ""}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Pilih Status</option>
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Alpha">Alpha</option>
        </select>

        <label htmlFor="note" className="text-lg text-gray-600">
          Catatan
        </label>
        <input
          id="note"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          type="text"
          value={note || ""}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Masukkan Catatan (opsional)"
        />

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
              <th className="p-3 text-left">Kelas</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Catatan</th>
              <th className="p-3 text-left">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {absensi.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{item.nisn}</td>
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.kelas}</td>
                <td className="p-3">{formatDate(item.tanggal)}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{item.catatan}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
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
