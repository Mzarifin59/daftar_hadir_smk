'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Absen() {
  const [nisn, setNisn] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [catatan, setCatatan] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user?.role !== "Murid") {
      router.push("/login");
    } else {
      setNisn(user.username);
      setTanggal(new Date().toISOString().split("T")[0]);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = { 
        nisn_siswa: nisn, 
        date: tanggal, 
        status, 
        note: catatan 
      };
    
    try {
      const response = await fetch("http://localhost:5000/api/absensi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Absensi Berhasil Disimpan");
      } else {
        alert("Upload error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan, coba lagi nanti");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Form Absensi</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">NISN</label>
          <input type="text" value={nisn} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal</label>
          <input type="date" value={tanggal} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
            <option value="Hadir">Hadir</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alpa">Alpa</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Catatan</label>
          <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} className="w-full px-3 py-2 border rounded-lg" rows="3"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Simpan Absensi
        </button>
      </form>
    </div>
  );
}
