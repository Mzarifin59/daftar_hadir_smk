'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Users, ClipboardList, UserCheck, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  return (
    <nav className="w-full bg-blue-600 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">SMK Indonesia</h1>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <Link href="/home">
              <NavigationMenuItem className="p-3 text-white flex items-center gap-2 rounded-md transition-all duration-500 hover:bg-white hover:text-black">
                <Home size={18} /> Home
              </NavigationMenuItem>
            </Link>
            <Link href="/data_siswa">
              <NavigationMenuItem className="p-3 text-white flex items-center gap-2 rounded-md transition-all duration-500 hover:bg-white hover:text-black">
                <Users size={18} /> Data Siswa
              </NavigationMenuItem>
            </Link>
            <Link href="/rekap_hadir">
              <NavigationMenuItem className="p-3 text-white flex items-center gap-2 rounded-md transition-all duration-500 hover:bg-white hover:text-black">
                <ClipboardList size={18} /> Rekap Hadir
              </NavigationMenuItem>
            </Link>
            <Link href="/absen">
              <NavigationMenuItem className="p-3 text-white flex items-center gap-2 rounded-md transition-all duration-500 hover:bg-white hover:text-black">
                <ClipboardList size={18} /> Absensi
              </NavigationMenuItem>
            </Link>
            <button
              onClick={handleLogout}
              className="p-3 text-white flex items-center gap-2 rounded-md transition-all duration-500 hover:bg-red-600 hover:text-white"
            >
              <LogOut size={18} /> Logout
            </button>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}