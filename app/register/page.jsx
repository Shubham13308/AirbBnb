// app/register/page.jsx
'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [data, setData] = useState({ email: '', password: '', image: null });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', data.email);
    form.append('password', data.password);
    form.append('image', data.image);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: form,
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          required
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full mb-3"
          required
          onChange={(e) => setData({ ...data, image: e.target.files[0] })}
        />
        <button className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
