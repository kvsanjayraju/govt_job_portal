"use client";
import { useState, FormEvent } from 'react';
import { Navbar } from '../components/Navbar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        // Super basic MVP auth
        if (password === 'admin123') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid password');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl mb-4">Admin Login</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="Password"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Login</button>
                </form>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="pt-24 px-4 max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Create New Job</h2>
                        <CreateJobForm />
                   </div>
                   {/* Job List for Editing/Archiving could go here */}
                </div>
            </div>
        </>
    );
}

function CreateJobForm() {
    const [formData, setFormData] = useState({
        title: '',
        organization: '',
        examTrack: 'SSC',
        mode: 'Online',
        tags: '',
        qualification: '',
        lastDate: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    lastDate: formData.lastDate ? new Date(formData.lastDate).toISOString() : null
                })
            });
            if (res.ok) {
                alert('Job Created!');
                setFormData({ title: '', organization: '', examTrack: 'SSC', mode: 'Online', tags: '', qualification: '', lastDate: '' });
            } else {
                alert('Failed to create job');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Track</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.examTrack} onChange={e => setFormData({...formData, examTrack: e.target.value})}>
                        <option value="SSC">SSC</option>
                        <option value="Banking">Banking</option>
                        <option value="Railways">Railways</option>
                        <option value="UPSC">UPSC</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mode</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})}>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                <input className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Last Date</label>
                <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={formData.lastDate} onChange={e => setFormData({...formData, lastDate: e.target.value})} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create Job</button>
        </form>
    )
}
