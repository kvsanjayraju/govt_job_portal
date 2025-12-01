"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Job } from '../../types';
import { Navbar } from '../../components/Navbar';
import { Calendar, DollarSign, BookOpen, CheckCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`);
      if (!res.ok) throw new Error("Job not found");
      const data = await res.json();
      setJob(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = (status: string) => {
    if (!job) return;
    const savedJobs = JSON.parse(localStorage.getItem('myTrack') || '[]');
    const newEntry = {
        jobId: job.id,
        title: job.title,
        organization: job.organization,
        status, // Thinking, Applied, Admit Card, Result
        savedAt: new Date().toISOString()
    };

    // Remove if exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = savedJobs.filter((j: any) => j.jobId !== job.id);
    localStorage.setItem('myTrack', JSON.stringify([...filtered, newEntry]));
    alert('Job saved to My Track!');
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!job) return <div className="pt-32 text-center">Job not found.</div>;

  return (
    <>
    <Navbar />
    <div className="pt-24 pb-12 px-4 max-w-screen-lg mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-lg text-gray-500">{job.organization}</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
                <button onClick={() => handleSaveJob('Thinking')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                    Save for later
                </button>
                <button onClick={() => handleSaveJob('Applied')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                    Mark as Applied
                </button>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center"><Calendar className="w-5 h-5 mr-2"/> Important Dates</h3>
                <ul className="space-y-3 text-gray-600">
                    {job.importantDates?.map((d, i) => (
                        <li key={i} className="flex justify-between border-b pb-2">
                            <span>{d.title}</span>
                            <span className="font-medium text-gray-900">{new Date(d.date).toLocaleDateString()}</span>
                        </li>
                    ))}
                    {!job.importantDates?.length && <li>No dates available</li>}
                </ul>
            </div>
            <div>
                 <h3 className="text-lg font-semibold mb-4 flex items-center"><DollarSign className="w-5 h-5 mr-2"/> Application Fees</h3>
                 <p className="text-gray-600 whitespace-pre-line">{job.fees || "Not specified"}</p>
            </div>
        </div>

        <div className="mt-8">
             <h3 className="text-lg font-semibold mb-4 flex items-center"><BookOpen className="w-5 h-5 mr-2"/> Eligibility & Qualification</h3>
             <p className="text-gray-600 mb-4">{job.qualification}</p>
             <p className="text-gray-600 whitespace-pre-line">{job.eligibility}</p>
        </div>

        <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">Application Process</h3>
            <p className="text-gray-600 whitespace-pre-line">{job.applicationProcess || "Please refer to the official notification."}</p>

            <div className="mt-6 flex gap-4">
                {job.officialPdfUrl && (
                    <a href={job.officialPdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Download Official Notification
                    </a>
                )}
                {job.applyLink && (
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Apply Online
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
    </>
  );
}
