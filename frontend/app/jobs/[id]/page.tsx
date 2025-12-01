"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Job } from '../../types';
import { Navbar } from '../../components/Navbar';
import { Calendar, DollarSign, BookOpen, Clock, Users, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

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

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!job) return <div className="pt-32 text-center">Job not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
    <Navbar />

    {/* Hero Section */}
    <div className="bg-white border-b border-gray-200 pt-28 pb-12 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="md:w-2/3">
                 <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wide">{job.examTrack}</span>
                    {job.state && <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{job.state}</span>}
                 </div>
                 <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight"
                 >
                    {job.title}
                 </motion.h1>
                 <p className="text-xl text-gray-500 font-medium mb-4">{job.organization}</p>
                 {job.summaryShort && (
                     <p className="text-lg text-gray-700 leading-relaxed max-w-2xl border-l-4 border-blue-500 pl-4 italic">
                        {job.summaryShort}
                     </p>
                 )}
            </div>

            {/* Fact Card - Desktop (floats right) */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="md:w-1/3 w-full bg-white md:bg-gray-50 md:border md:border-gray-200 rounded-xl p-6 md:shadow-lg"
            >
                <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2"><Clock className="w-5 h-5"/> Quick Facts</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">Last Date</span>
                        <span className="font-semibold text-red-600">{job.lastDate ? new Date(job.lastDate).toLocaleDateString() : 'TBA'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">Vacancies</span>
                        <span className="font-semibold">{job.vacancies || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">Qualification</span>
                        <span className="font-semibold">{job.qualification || 'See Details'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">Mode</span>
                        <span className="font-semibold">{job.mode}</span>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    {job.applyLink && (
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2 transition-colors">
                            Apply Online <LinkIcon className="w-4 h-4" />
                        </a>
                    )}
                     {job.officialPdfUrl && (
                        <a href={job.officialPdfUrl} target="_blank" rel="noopener noreferrer" className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors">
                            Official Notification
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    </div>

    {/* Content Sections */}
    <div className="max-w-screen-xl mx-auto px-4 mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-12">

            {/* Why This Job Matters */}
            {job.whyThisJobMatters && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-purple-600" />
                        Why this job matters
                    </h2>
                    <div className="bg-purple-50 rounded-xl p-6 text-gray-800 leading-relaxed text-lg">
                        {job.whyThisJobMatters}
                    </div>
                </section>
            )}

            {/* Key Highlights */}
            {job.keyHighlights && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        Key Highlights
                    </h2>
                    <div className="prose prose-blue max-w-none bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <ReactMarkdown>{job.keyHighlights}</ReactMarkdown>
                    </div>
                </section>
            )}

            {/* Eligibility */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    Eligibility & Age Limit
                </h2>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{job.eligibilityNotes || job.eligibility || "Refer to notification"}</ReactMarkdown>
                    </div>
                    {job.qualification && (
                        <div className="bg-blue-50 p-4 rounded-lg inline-block">
                             <span className="font-semibold text-blue-900">Minimum Qualification:</span> {job.qualification}
                        </div>
                    )}
                </div>
            </section>

             {/* Exam Pattern */}
             {job.examPatternNotes && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-orange-600" />
                        Exam Pattern & Selection
                    </h2>
                    <div className="prose prose-orange max-w-none bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <ReactMarkdown>{job.examPatternNotes}</ReactMarkdown>
                    </div>
                </section>
            )}

            {/* Prep Tips */}
            {job.prepTips && (
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-teal-600" />
                        Prep Tips & Strategy
                    </h2>
                    <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 text-gray-800">
                         <div className="prose prose-teal max-w-none">
                            <ReactMarkdown>{job.prepTips}</ReactMarkdown>
                        </div>
                    </div>
                </section>
            )}

        </div>

        {/* Sidebar (Timeline & Dates) */}
        <div className="md:col-span-1 space-y-6">
             {/* Timeline */}
             <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 flex items-center"><Calendar className="w-5 h-5 mr-2 text-blue-600"/> Timeline</h3>
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pl-6 pb-2">
                    {job.timeline && job.timeline.map((item: any, idx: number) => (
                        <div key={idx} className="relative">
                            <span className={`absolute -left-[31px] flex items-center justify-center w-4 h-4 rounded-full ring-4 ring-white ${item.status === 'Done' ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                            <h4 className="font-semibold text-gray-900">{item.stage}</h4>
                            <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                            <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'Done' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>{item.status}</span>
                        </div>
                    ))}
                    {!job.timeline && <p className="text-gray-500 text-sm">No timeline available</p>}
                </div>

                <h3 className="text-lg font-bold mt-8 mb-4 flex items-center"><DollarSign className="w-5 h-5 mr-2 text-green-600"/> Fees</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                    {job.fees || "Not specified"}
                </p>
             </div>
        </div>
    </div>
    </div>
  );
}
