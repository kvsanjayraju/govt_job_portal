"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Job } from '../types';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    examTrack: '',
    qualification: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchJobs();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('q', searchTerm);
      if (filters.state) params.append('state', filters.state);
      if (filters.examTrack) params.append('track', filters.examTrack);
      if (filters.qualification) params.append('qualification', filters.qualification);

      const res = await fetch(`${API_URL}/jobs?${params.toString()}`);
      const data = await res.json();
      setJobs(data.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs; // Server side filtering

  return (
    <div className="pt-24 px-4 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Job Catalogue</h1>
        <input
          type="text"
          placeholder="Search jobs by title or organization..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-4 mt-4">
           <select
              className="p-2 border border-gray-300 rounded-lg"
              value={filters.examTrack}
              onChange={(e) => setFilters({...filters, examTrack: e.target.value})}
           >
              <option value="">All Tracks</option>
              <option value="SSC">SSC</option>
              <option value="Banking">Banking</option>
              <option value="Railways">Railways</option>
              <option value="State">State</option>
              <option value="UPSC">UPSC</option>
           </select>
           <select
              className="p-2 border border-gray-300 rounded-lg"
              value={filters.state}
              onChange={(e) => setFilters({...filters, state: e.target.value})}
           >
              <option value="">All States</option>
              <option value="Central">Central</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Delhi">Delhi</option>
           </select>
           <input
              type="text"
              placeholder="Qualification (e.g. Graduate)"
              className="p-2 border border-gray-300 rounded-lg"
              value={filters.qualification}
              onChange={(e) => setFilters({...filters, qualification: e.target.value})}
           />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{job.title}</h5>
                    <p className="text-sm text-gray-500">{job.organization}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{job.examTrack}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                 {job.tags && job.tags.split(',').slice(0, 3).map(tag => (
                     <span key={tag} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-500">{tag.trim()}</span>
                 ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                 <Link href={`/jobs/${job.id}`} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    View Details
                 </Link>
                 <span className="text-xs text-gray-500">
                    Last Date: {job.lastDate ? new Date(job.lastDate).toLocaleDateString() : 'N/A'}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
