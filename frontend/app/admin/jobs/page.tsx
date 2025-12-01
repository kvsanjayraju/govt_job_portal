"use client";
import { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import Link from 'next/link';
import { Job } from '../../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminJobsList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const res = await fetch(`${API_URL}/jobs?pageSize=100`);
        const data = await res.json();
        setJobs(data.data || []);
    };

    const filtered = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-24 px-4 max-w-screen-xl mx-auto">
                 <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">All Jobs</h1>
                    <Link href="/admin" className="text-blue-600 hover:underline">Back to Dashboard</Link>
                </div>

                <input
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Org</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filtered.map(job => (
                                <tr key={job.id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{job.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.organization}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.isArchived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {job.isArchived ? 'Archived' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link href={`/admin/jobs/${job.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
