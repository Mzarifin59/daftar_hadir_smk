export async function GetKelas() {
    const res = await fetch(`${process.env.BASE_URL}/kelas`, {cache: 'no-cache'});
    const data = await res.json();

    return data;
}

export async function GetAbsensi() {
    const res = await fetch(`${process.env.BASE_URL}/absensi`, {cache: 'no-cache'});
    const data = await res.json();

    return data;
}

export async function GetGuru() {
    const res = await fetch(`${process.env.BASE_URL}/kelas`, {cache: 'no-cache'});
    const data = await res.json();

    return data;
}

export async function GetSiswa() {
    const res = await fetch(`${process.env.BASE_URL}/siswa`, {cache: 'no-cache'});
    const data = await res.json();

    return data;
}