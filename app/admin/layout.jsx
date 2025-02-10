import AdminLayout from "@/components/layouts/adminLayout";

export const metadata = {
    title: "Admin - SMK Indonesia",
    description: "Web admin pengelolaan data daftar hadir siswa SMK Indonesia"
}

export default function layoutAdmin({children}){
    return <AdminLayout>{children}</AdminLayout>
}
