"use client";
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check session
    useEffect(() => {
        const session = sessionStorage.getItem('admin_token');
        if (session === 'valid') setIsLoggedIn(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In real world, send to backend. Here we use a simple env check or hardcoded for MVP as requested "env variable like ADMIN_PASSWORD".
        // Since we can't easily access server env from client without exposing it, we'll verify against an API endpoint.
        verifyPassword(password);
    };

    const verifyPassword = async (pwd: string) => {
        // Mock verification for MVP as backend logic for this specific simple auth wasn't explicitly requested to be an endpoint,
        // but it is safer. However, for "simple password check", I will assume the user sets NEXT_PUBLIC_ADMIN_PASSWORD in frontend build
        // OR we just use a hardcoded value here matching the seed/env idea.
        // Let's implement a simple API route for this to be cleaner.

        try {
            const res = await fetch(`${API_URL}/admin/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pwd })
            });
            if (res.ok) {
                setIsLoggedIn(true);
                sessionStorage.setItem('admin_token', 'valid');
            } else {
                alert('Invalid Password');
            }
        } catch (e) {
            console.error(e);
            alert('Error verifying password');
        }
    };

    if (!isLoggedIn) {
        return (
             <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl mb-4 font-bold text-center">Admin Access</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="Enter Admin Password"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded font-bold hover:bg-blue-700">Unlock</button>
                </form>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-24 px-4 max-w-screen-xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Link href="/admin/jobs/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        + New Job
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/admin/jobs" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Manage Jobs</h5>
                        <p className="font-normal text-gray-700">View, edit, and archive job posts.</p>
                    </Link>
                    {/* Add more cards for Users, Notifications etc */}
                </div>
            </div>
        </div>
    );
}
