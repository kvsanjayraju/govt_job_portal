"use client";
import { useState, useEffect } from 'react';
import { Navbar } from '../../../../components/Navbar';
import { useRouter, useParams } from 'next/navigation';
import { Job } from '../../../../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function JobEditor() {
    const router = useRouter();
    const { id } = useParams(); // If present, it's edit mode
    const isEdit = !!id;

    const [formData, setFormData] = useState<Partial<Job>>({
        title: '',
        organization: '',
        examTrack: 'SSC',
        mode: 'Online',
        tags: '',
        qualification: '',
        summaryShort: '',
        whyThisJobMatters: '',
        keyHighlights: '',
        eligibilityNotes: '',
        examPatternNotes: '',
        prepTips: '',
        sourceUrl: '',
        applyLink: '',
        officialPdfUrl: '',
        importantDates: [],
        timeline: []
    });

    useEffect(() => {
        if (isEdit) {
            fetch(`${API_URL}/jobs/${id}`)
                .then(res => res.json())
                .then(data => setFormData(data))
                .catch(err => console.error(err));
        }
    }, [id, isEdit]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEdit ? `${API_URL}/jobs/${id}` : `${API_URL}/jobs`;
        const method = isEdit ? 'PUT' : 'POST';

        // Fix dates for API
        const payload = { ...formData };
        if (!payload.lastDate) delete payload.lastDate;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert('Job Saved!');
                router.push('/admin/jobs');
            } else {
                alert('Error saving job');
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <Navbar />
            <div className="pt-24 px-4 max-w-screen-lg mx-auto">
                 <h1 className="text-3xl font-bold mb-6">{isEdit ? 'Edit Job' : 'Create New Job'}</h1>
                 <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input required className="mt-1 w-full border rounded p-2" value={formData.title} onChange={e => handleChange('title', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Organization</label>
                            <input required className="mt-1 w-full border rounded p-2" value={formData.organization} onChange={e => handleChange('organization', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Track</label>
                            <select className="mt-1 w-full border rounded p-2" value={formData.examTrack} onChange={e => handleChange('examTrack', e.target.value)}>
                                {['SSC', 'Banking', 'Railways', 'State', 'Defence', 'PSU', 'Teaching', 'UPSC'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">State</label>
                             <select className="mt-1 w-full border rounded p-2" value={formData.state || ''} onChange={e => handleChange('state', e.target.value)}>
                                <option value="">None (Central)</option>
                                <option value="Central">Central</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Delhi">Delhi</option>
                                {/* Add more */}
                            </select>
                        </div>
                    </div>

                    {/* Brilliant Style Fields */}
                    <div className="space-y-4 border-t pt-4">
                        <h3 className="text-lg font-bold text-blue-600">Content Fields (Markdown Supported)</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Short Summary (Hook)</label>
                            <textarea className="mt-1 w-full border rounded p-2 h-20" value={formData.summaryShort || ''} onChange={e => handleChange('summaryShort', e.target.value)} placeholder="1-2 lines summarizing why this job is great." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Why This Job Matters</label>
                            <textarea className="mt-1 w-full border rounded p-2 h-24" value={formData.whyThisJobMatters || ''} onChange={e => handleChange('whyThisJobMatters', e.target.value)} placeholder="Explain the impact and prestige." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Key Highlights (Bullets)</label>
                            <textarea className="mt-1 w-full border rounded p-2 h-32 font-mono text-sm" value={formData.keyHighlights || ''} onChange={e => handleChange('keyHighlights', e.target.value)} placeholder="- Salary: ...&#10;- Perks: ..." />
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-gray-700">Eligibility Notes</label>
                            <textarea className="mt-1 w-full border rounded p-2 h-32 font-mono text-sm" value={formData.eligibilityNotes || ''} onChange={e => handleChange('eligibilityNotes', e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Exam Pattern Notes</label>
                            <textarea className="mt-1 w-full border rounded p-2 h-32 font-mono text-sm" value={formData.examPatternNotes || ''} onChange={e => handleChange('examPatternNotes', e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prep Tips</label>
                            <textarea className="mt-1 w-full border rounded p-2 h-32 font-mono text-sm" value={formData.prepTips || ''} onChange={e => handleChange('prepTips', e.target.value)} />
                        </div>
                    </div>

                    {/* Links & Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Apply Link</label>
                            <input className="mt-1 w-full border rounded p-2" value={formData.applyLink || ''} onChange={e => handleChange('applyLink', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Official Notification URL</label>
                            <input className="mt-1 w-full border rounded p-2" value={formData.officialPdfUrl || ''} onChange={e => handleChange('officialPdfUrl', e.target.value)} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Source URL</label>
                            <input className="mt-1 w-full border rounded p-2" value={formData.sourceUrl || ''} onChange={e => handleChange('sourceUrl', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Date</label>
                            <input type="date" className="mt-1 w-full border rounded p-2" value={formData.lastDate ? new Date(formData.lastDate).toISOString().split('T')[0] : ''} onChange={e => handleChange('lastDate', e.target.value)} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                         <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                         <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">Save Job</button>
                    </div>
                 </form>
            </div>
        </div>
    );
}
