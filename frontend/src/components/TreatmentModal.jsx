import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Brain, Bone, Baby, Eye, Activity, ShieldCheck, Sparkles, Stethoscope, Phone, Clock, Calendar, CheckCircle2, Download, Share2, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TreatmentModal = ({ treatment, isOpen, onClose, doctors = [] }) => {
  const navigate = useNavigate();

  if (!isOpen || !treatment) return null;

  // Icon component handling safely
  const SelectedIcon = treatment.icon || Heart;

  const handleBook = () => {
    onClose();
    navigate(`/appointment?service=${encodeURIComponent(treatment.title)}&department=${encodeURIComponent(treatment.title)}`);
  };

  const handleShare = () => {
    const link = window.location.origin + `/treatments?title=${encodeURIComponent(treatment.title)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      toast.success('Treatment link copied to clipboard!');
    } else {
      toast.success('Share link: ' + link);
    }
  };

  const handleDownloadBrochure = () => {
    const textContent = `MEDICARE PLUS HOSPITAL — TREATMENT CLINICAL BROCHURE\n\nTreatment Title: ${treatment.title}\nSubtitle: ${treatment.subtitle || 'Specialized Medical Care'}\nRating: 4.9 / 5.0 ⭐ (Verified Clinical Care)\n\nOVERVIEW:\n${treatment.description}\n\nTREATMENT INCLUDES:\n${(treatment.services || []).map(s => '• ' + s).join('\n')}\n\nKEY PATIENT BENEFITS:\n${(treatment.benefits || []).map(b => '• ' + b).join('\n')}\n\nRECOVERY & POST-CARE:\n${treatment.recovery}\n\nTREATMENT JOURNEY:\n1. Consultation -> 2. Diagnosis -> 3. Treatment Planning -> 4. Treatment -> 5. Recovery -> 6. Follow-up Care\n\nCONTACT & APPOINTMENT:\nMediCare Plus Hotline: +94 11 234 5678 | Emergency: +94 11 999 9999\nWebsite: http://localhost:5173\n`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${treatment.title.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast.success(`${treatment.title} clinical brochure downloaded!`);
  };

  const attendingDoctors = doctors.length > 0 ? doctors.slice(0, 2) : [
    { id: 1, name: 'Dr. Aris Thorne', specialization: treatment.title + ' Specialist', experience: '18 Yrs', rating: 4.95, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Dr. Elena Rostova', specialization: 'Consultant Specialist', experience: '14 Yrs', rating: 4.92, image: 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-100 my-6 max-h-[90vh] flex flex-col relative"
        >
          {/* Header Banner */}
          <div className="relative h-64 md:h-72 overflow-hidden shrink-0">
            <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />

            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
                title="Share Treatment"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#16A3A8] text-white px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  Specialized Treatment
                </span>
                <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-bold">
                  ⭐ 4.9 / 5.0 Rating
                </span>
                <span className="bg-emerald-600 text-white px-3 py-0.5 rounded-full text-xs font-bold">
                  🟢 24/7 Support Available
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0">
                  <SelectedIcon size={26} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-poppins">{treatment.title}</h2>
                  <p className="text-xs text-teal-200 font-semibold">{treatment.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-grow text-xs leading-relaxed text-slate-600">
            
            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#0F4C81] pl-3">Treatment Overview</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{treatment.description}</p>
            </div>

            {/* Treatment Includes & Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#0F4C81]" /> Key Medical Procedures Included
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {treatment.services && treatment.services.map((srv) => (
                    <li key={srv} className="flex items-start gap-2">
                      <span className="text-[#16A3A8] font-bold mt-0.5">✓</span>
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <Sparkles size={18} className="text-[#16A3A8]" /> Patient Benefits & Advantages
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {treatment.benefits && treatment.benefits.map((bnf) => (
                    <li key={bnf} className="flex items-start gap-2">
                      <span className="text-[#22C55E] font-bold mt-0.5">✓</span>
                      <span>{bnf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Treatment Journey Workflow */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-base font-bold text-[#0F172A]">Standard Treatment Journey Workflow</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-[11px] font-bold text-slate-700">
                <div className="p-3 bg-white rounded-xl border shadow-sm">1. Consultation</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">2. Diagnosis</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">3. Treatment Plan</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">4. Procedure</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">5. Recovery</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">6. Follow-up</div>
              </div>
            </div>

            {/* Recovery Timeline Box */}
            <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
              <h4 className="text-sm font-bold text-[#0F4C81] flex items-center gap-2">
                <Clock size={16} /> Recovery & Post-Procedure Care
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">{treatment.recovery}</p>
            </div>

            {/* Recommended Specialists */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#22C55E] pl-3">Attending Senior Specialists</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attendingDoctors.map((doc) => (
                  <div key={doc.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border" />
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-sm">{doc.name}</h4>
                        <p className="text-[11px] text-[#16A3A8]">{doc.specialization}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { onClose(); navigate(`/doctors?id=${doc.id}`); }}
                      className="py-1.5 px-3 rounded-lg bg-[#0F4C81] text-white text-xs font-semibold hover:bg-[#0A3860]"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadBrochure}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download size={16} /> Download Brochure
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleBook}
                className="btn-primary py-2.5 px-6 text-xs justify-center"
              >
                <Calendar size={16} /> Book Treatment Appointment
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TreatmentModal;
