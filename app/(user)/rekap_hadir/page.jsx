"use client";

import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function RekapHadir() {
  const [rekap, setRekap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      setError("User tidak ditemukan. Silakan login.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/absensi/${loggedInUser.username}`)
      .then((res) => res.json())
      .then((data) => setRekap(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text("Rekapitulasi Kehadiran", 14, 15);
    doc.autoTable({
      startY: 20,
      head: [["No", "Nama", "Kelas", "Tanggal", "Status", "Catatan"]],
      body: rekap.map((item, index) => [
        index + 1,
        item.nama || "-",
        item.kelas || "-",
        item.tanggal ? new Date(item.tanggal).toLocaleDateString() : "-",
        item.status || "-",
        item.catatan || "-",
      ]),
    });
    doc.save("rekap_kehadiran.pdf");
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Rekapitulasi Kehadiran</h2>
      <button
        onClick={handlePrintPDF}
        className="mb-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Print PDF
      </button>
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-3">No</th>
              <th className="border p-3">Nama</th>
              <th className="border p-3">Kelas</th>
              <th className="border p-3">Tanggal</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {rekap.length > 0 ? (
              rekap.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border p-3 text-center">{index + 1}</td>
                  <td className="border p-3">{item.nama || "-"}</td>
                  <td className="border p-3 text-center">{item.kelas || "-"}</td>
                  <td className="border p-3 text-center">
                    {item.tanggal ? new Date(item.tanggal).toLocaleDateString() : "-"}
                  </td>
                  <td
                    className={`border p-3 text-center font-bold ${
                      item.status === "Hadir" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.status || "-"}
                  </td>
                  <td className="border p-3">{item.catatan || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-3 text-center text-gray-500">
                  Tidak ada data absensi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
