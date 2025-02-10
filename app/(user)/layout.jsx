import UserLayout from "../../components/layouts/userLayouts";

export const metadata = {
    title: "Absensi SMK Indonesia",
    description: "Website Absensi untuk seluruh siswa SMK Indonesia"
}

export default function LayoutUser({children}){
    return <UserLayout>{children}</UserLayout>
}