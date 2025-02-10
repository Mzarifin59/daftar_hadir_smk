"use client";

import { useState, useEffect } from "react";

export default function GuruPage() {
  const [guru, setGuru] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [NIP, setNIP] = useState("");
  const [nama, setNama] = useState("");
  const [usia, setUsia] = useState("");
  const [kelas, setKelas] = useState("");
  const [editingId, setEditingId] = useState(null);

  const endpoint = "http://localhost:5000/api/guru";
  const endpointKelas = "http://localhost:5000/api/kelas";

  const fetchData = async () => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setGuru(data);
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
      NIP,
      nama,
      usia,
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

    setNIP("");
    setNama("");
    setUsia("");
    setKelas("");
    setEditingId(null);
    fetchData();
  }

  function handleEdit(guru) {
    setNIP(guru.NIP);
    setNama(guru.nama);
    setUsia(guru.usia); 
    setKelas(guru.kelas);
    setEditingId(guru.NIP);
  }

  async function handleDelete(nip) {
    await fetch(`${endpoint}/${nip}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div className="p-5 w-full flex flex-col bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {editingId ? "Edit Guru" : "Tambah Guru"}
        </h2>

        <label htmlFor="NIP" className="text-lg text-gray-600">
          NIP
        </label>
        <input
          id="NIP"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={NIP}
          onChange={(e) => setNIP(e.target.value)}
          placeholder="Masukkan NIP"
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

        <label htmlFor="usia" className="text-lg text-gray-600">
          Usia
        </label>
        <input
          id="usia"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          value={usia}
          onChange={(e) => setUsia(e.target.value)}
          placeholder="Masukkan Usia"
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
            <option key={item.id} value={item.id}>
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
              <th className="p-3 text-left">NIP</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Usia</th>
              <th className="p-3 text-left">Kelas</th>
              <th className="p-3 text-left">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {guru.map((item) => (
              <tr key={item.NIP} className="border-b hover:bg-gray-100">
                <td className="p-3">{item.NIP}</td>
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.usia}</td>
                <td className="p-3">{item.kelas}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.NIP)}
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
