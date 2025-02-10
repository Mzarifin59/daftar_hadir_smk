import Sidebar from "@/components/sidebar";

export default function AdminLayout({children}){
    return(
        <section>
            <div className="flex">
            <Sidebar />
            {children}
            </div>
        </section>
    )
}