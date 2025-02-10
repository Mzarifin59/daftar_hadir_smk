export default function Home() {
  return (
    <div className="h-full py-28 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Selamat Datang di Sistem Daftar Hadir Siswa SMK Indonesia
      </h1>
      <div className="flex flex-grow gap-5 items-center justify-center">
        <p className="mt-4 text-lg text-gray-700 max-w-2xl text-center">
          Sistem ini dirancang untuk membantu pencatatan kehadiran siswa secara
          digital. Dengan fitur yang mudah digunakan, guru dan staf dapat dengan
          cepat melihat laporan kehadiran siswa secara real-time. Aplikasi ini
          juga mendukung analisis data kehadiran untuk membantu dalam evaluasi
          akademik siswa.
        </p>
        <img
          src="/img/attendace_ilustration.jpg"
          alt="Ilustrasi Absensi Siswa"
          className="mt-6 w-96 h-auto"
        />
      </div>
    </div>
  );
}

