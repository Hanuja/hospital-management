import React, { useState } from 'react';
import { Briefcase, MapPin, Award, CheckCircle2, Upload, X, Send } from 'lucide-react';
import { submitJobApplication } from '../services/api';
import toast from 'react-hot-toast';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    cover_letter: '',
    resume_file: null
  });

  const jobs = [
    { id: 1, department: 'Cardiology', title: 'Senior Consultant Cardiologist', type: 'Full-Time', exp: '10+ Years', salary: '$8,000 - $12,000', desc: 'Lead complex cardiac catheterization surgeries and mentor fellow doctors.' },
    { id: 2, department: 'Nursing', title: 'ICU Staff Nurse (Day/Night Shift)', type: 'Full-Time', exp: '3+ Years', salary: '$1,200 - $1,800', desc: 'Provide 1:1 bedside critical care and ventilator monitoring in adult ICU.' },
    { id: 3, department: 'Pharmacy', title: 'Registered Hospital Pharmacist', type: 'Full-Time', exp: '2+ Years', salary: '$1,000 - $1,500', desc: 'Manage inpatient prescription dispensing, drug safety, and inventory control.' },
    { id: 4, department: 'Laboratory', title: 'Medical Laboratory Technologist (MLT)', type: 'Full-Time', exp: '2+ Years', salary: '$900 - $1,300', desc: 'Perform automated blood biochemistry, hematology, and microbiological testing.' },
    { id: 5, department: 'Front Desk', title: 'Healthcare Receptionist & Coordinator', type: 'Full-Time', exp: '1+ Year', salary: '$700 - $1,000', desc: 'Greet patients, schedule appointments, and manage reception desk operations.' },
    { id: 6, department: 'IT Systems', title: 'Full-Stack Software Developer', type: 'Full-Time', exp: '3+ Years', salary: '$1,500 - $2,500', desc: 'Maintain MediCare Plus digital healthcare web platform, EHR, and booking APIs.' },
    { id: 7, department: 'Human Resources', title: 'HR Executive & Recruiter', type: 'Full-Time', exp: '3+ Years', salary: '$1,100 - $1,600', desc: 'Lead medical staff recruitment, onboarding, and employee welfare programs.' },
  ];

  const handleApply = async (e) => {
    e.preventDefault();
    if (!appForm.name || !appForm.email || !appForm.phone) {
      toast.error('Please complete all required contact fields.');
      return;
    }
    const loadingToast = toast.loading('Submitting job application...');
    try {
      await submitJobApplication({
        career_id: selectedJob.id,
        ...appForm
      });
      toast.dismiss(loadingToast);
      toast.success('Application submitted successfully! Our HR team will contact you.');
      setSelectedJob(null);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Failed to submit application.');
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">MediCare Plus Talent Recruitment</span>
          <h1 className="text-4xl font-extrabold font-poppins">Build Your Career With MediCare Plus</h1>
          <p className="text-blue-100 text-sm">Join a team of compassionate medical professionals driving clinical innovation and healthcare excellence.</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-soft space-y-6">
          <h2 className="text-2xl font-bold text-[#0F172A] border-l-4 border-[#0F4C81] pl-3">Why Work With MediCare Plus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-[#0F4C81]">Continuous Training & Fellowships</h3>
              <p className="text-xs text-slate-600">Access sponsored international medical training and research publication support.</p>
            </div>
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-[#16A3A8]">Competitive Salary & Benefits</h3>
              <p className="text-xs text-slate-600">Enjoy medical insurance for your family, housing allowances, and performance bonuses.</p>
            </div>
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-[#22C55E]">Modern Smart Work Environment</h3>
              <p className="text-xs text-slate-600">Work with state-of-the-art robotic suites, digital EHR systems, and supportive team leaders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="container mx-auto px-4 space-y-6">
        <h2 className="text-2xl font-bold text-[#0F172A]">Current Job Openings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="card-premium space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-50 text-[#0F4C81] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {job.department}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{job.type}</span>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A]">{job.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{job.desc}</p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Req Exp: <strong>{job.exp}</strong></span>
                  <span>Salary: <strong className="text-[#22C55E]">{job.salary}</strong></span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="btn-primary w-full text-xs justify-center py-3"
                >
                  Apply Now for Position
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-6 relative border border-slate-100 my-8">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Job Application</h3>
                <p className="text-xs text-[#16A3A8] font-semibold">{selectedJob.title} — {selectedJob.department}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-1 rounded-full hover:bg-slate-100">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  value={appForm.name}
                  onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                  placeholder="e.g. John Silva"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={appForm.email}
                    onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={appForm.phone}
                    onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                    placeholder="+94 77 123 4567"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Highest Qualification</label>
                  <input
                    type="text"
                    value={appForm.qualification}
                    onChange={(e) => setAppForm({ ...appForm, qualification: e.target.value })}
                    placeholder="B.Sc / Diploma / MD"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Years of Experience</label>
                  <input
                    type="text"
                    value={appForm.experience}
                    onChange={(e) => setAppForm({ ...appForm, experience: e.target.value })}
                    placeholder="e.g. 4 Years"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Cover Letter Summary</label>
                <textarea
                  rows={3}
                  value={appForm.cover_letter}
                  onChange={(e) => setAppForm({ ...appForm, cover_letter: e.target.value })}
                  placeholder="Brief statement highlighting your relevant experience..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Upload CV / Resume (PDF)</label>
                <div className="border-2 border-dashed border-slate-200 p-4 rounded-xl text-center bg-slate-50">
                  <Upload size={24} className="mx-auto text-slate-400 mb-1" />
                  <span className="text-xs text-slate-600 font-semibold block">Click to upload your resume file</span>
                  <span className="text-[10px] text-slate-400">PDF or DOCX up to 5MB</span>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-sm justify-center">
                <Send size={16} /> Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Careers;
