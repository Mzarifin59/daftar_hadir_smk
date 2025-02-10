'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'Murid') {
        router.push('/home');
      } else if (user.role === 'Guru') {
        router.push('/admin');
      }
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const res = await fetch('http://localhost:5000/api/user');
      const users = await res.json();
      
      const user = users.find((u) => u.username === username && u.password === password);
      
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        if (user.role === 'Murid') {
          router.push('/home');
        } else if (user.role === 'Guru') {
          router.push('/admin');
        }
      } else {
        setError('Username atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghubungi server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-lg" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded-lg" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
