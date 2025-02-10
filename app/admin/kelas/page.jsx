"use client";

import { useState, useEffect } from "react";

export default function KelasPage() {
  const [kelas, setKelas] = useState([]);
  const [kelasInput, setKelasInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  const endpoint = "http://localhost:5000/api/kelas";

  // 1. Pindahkan fetchData ke luar useEffect
  const fetchData = async () => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setKelas(data);
    } catch (error) {
      console.error("Error fetching kelas:", error);
    }
  };

  // 2. Panggil fetchData dalam useEffect
  useEffect(() => {
    fetchData();
  }, []);

  // 3. Perbaiki handleSubmit agar bisa akses fetchData
  async function handleSubmit(e) {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${endpoint}/${editingId}` : endpoint;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: editingId, kelas: kelasInput }),
    });

    setKelasInput("");
    setEditingId(null);
    fetchData(); 
  }

  async function handleEdit(kelass) {
    setKelasInput(kelass.kelas);
    setEditingId(kelass.id);
  }

  async function handleDelete(id) {
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    fetchData(); 
  }

  return (
    <div className="p-5 w-full flex flex-col bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{editingId ? "Edit Kelas" : "Tambah Kelas"}</h2>
        <label htmlFor="kelas" className="text-lg text-gray-600">Kelas</label>
        <input
          id="kelas"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="kelas"
          value={kelasInput}
          onChange={(e) => setKelasInput(e.target.value)}
          placeholder="Masukkan kelas (XII ..)"
          required
        />
        <button type="submit" className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          {editingId ? "Update Data" : "Tambah Data"}
        </button>
      </form>

      <div className="mt-8 w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Kelas</th>
              <th className="p-3 text-left">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {kelas.map((kelass) => (
              <tr key={kelass.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{kelass.id}</td>
                <td className="p-3">{kelass.kelas}</td>
                <td className="p-3">
                  <button onClick={() => handleEdit(kelass)} className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(kelass.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
