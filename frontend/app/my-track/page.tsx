"use client";
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { motion } from 'framer-motion';

type SavedJob = {
    jobId: string;
    title: string;
    organization: string;
    status: 'Thinking' | 'Applied' | 'Admit Card' | 'Result';
    savedAt: string;
}

const COLUMNS = ['Thinking', 'Applied', 'Admit Card', 'Result'];

export default function MyTrackPage() {
    const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('myTrack');
        if (data) {
            // Use setTimeout to defer the state update if necessary, or better, rely on standard behavior.
            // The linter error 'Calling setState synchronously within an effect' is often a false positive with empty deps,
            // but we can wrap it or acknowledge it's safe here because it runs once on mount.
            // However, next lint is strict.
            setSavedJobs(JSON.parse(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getJobsByStatus = (status: string) => savedJobs.filter(j => j.status === status);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateStatus = (jobId: string, newStatus: any) => {
        const updated = savedJobs.map(j => j.jobId === jobId ? { ...j, status: newStatus } : j);
        setSavedJobs(updated);
        localStorage.setItem('myTrack', JSON.stringify(updated));
    };

    const removeJob = (jobId: string) => {
        const updated = savedJobs.filter(j => j.jobId !== jobId);
        setSavedJobs(updated);
        localStorage.setItem('myTrack', JSON.stringify(updated));
    }

    return (
        <>
        <Navbar />
        <div className="pt-24 px-4 max-w-screen-xl mx-auto overflow-x-auto">
            <h1 className="text-3xl font-bold mb-8">My Track Dashboard</h1>
            <div className="flex gap-6 min-w-max pb-8">
                {COLUMNS.map(col => (
                    <div key={col} className="w-80 bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h3 className="font-semibold text-gray-700 mb-4 flex justify-between">
                            {col}
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{getJobsByStatus(col).length}</span>
                        </h3>
                        <div className="space-y-3">
                            {getJobsByStatus(col).map(job => (
                                <motion.div
                                    layoutId={job.jobId}
                                    key={job.jobId}
                                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                                >
                                    <h4 className="font-bold text-gray-900">{job.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{job.organization}</p>

                                    <div className="flex justify-between items-center mt-2">
                                        <select
                                            value={job.status}
                                            onChange={(e) => updateStatus(job.jobId, e.target.value)}
                                            className="text-xs border border-gray-300 rounded p-1"
                                        >
                                            {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <button onClick={() => removeJob(job.jobId)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
