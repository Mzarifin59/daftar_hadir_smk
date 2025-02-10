'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
    { name: "Dashboard", link: "/admin" },
    { name: "Siswa", link: "/admin/siswa" },
    { name: "Guru", link: "/admin/guru" },
    { name: "Absensi", link: "/admin/absensi" },
    { name: "Kelas", link: "/admin/kelas" },
];

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        router.push("/login");
    };

    return (
        <div className="w-72 h-screen bg-blue-600 text-white p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold mb-4">SMK Merdeka</h2>
                <nav>
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className="mb-2">
                                <Link href={item.link} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-700 transition">
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <button 
                onClick={handleLogout} 
                className="mt-4 w-full bg-red-500 p-2 rounded-lg hover:bg-red-700 transition text-center">
                Logout
            </button>
        </div>
    );
}
