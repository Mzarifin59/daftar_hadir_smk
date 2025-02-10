'use client';

import { useEffect, useState } from "react";

export default function HalamanSiswa() {
    const [siswa, setSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/siswa")
            .then((res) => res.json())
            .then((data) => setSiswa(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center text-blue-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Daftar Siswa</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="border p-3">No</th>
                            <th className="border p-3">NISN</th>
                            <th className="border p-3">Nama</th>
                            <th className="border p-3">Kelas</th>
                            <th className="border p-3">Tempat Lahir</th>
                            <th className="border p-3">Jenis Kelamin</th>
                            <th className="border p-3">Agama</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.length > 0 ? (
                            siswa.map((item, index) => (
                                <tr key={item.nisn} className="hover:bg-gray-100">
                                    <td className="border p-3 text-center">{index + 1}</td>
                                    <td className="border p-3">{item.nisn}</td>
                                    <td className="border p-3">{item.nama}</td>
                                    <td className="border p-3 text-center">{item.kelas}</td>
                                    <td className="border p-3 text-center">{item.tempat_lahir}</td>
                                    <td className="border p-3 text-center">{item.jenis_kelamin}</td>
                                    <td className="border p-3 text-center">{item.agama}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="border p-3 text-center text-gray-500">Tidak ada data siswa.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
