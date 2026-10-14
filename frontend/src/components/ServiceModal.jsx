import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, Clock, MapPin, ShieldCheck, Download, Award, CheckCircle2, Stethoscope, ArrowRight, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InsuranceModal from './InsuranceModal';
import toast from 'react-hot-toast';

const ServiceModal = ({ service, isOpen, onClose, doctors = [] }) => {
  const navigate = useNavigate();
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

  if (!isOpen || !service) return null;

  const handleBookService = () => {
    onClose();
    navigate(`/appointment?service=${encodeURIComponent(service.title)}&department=${encodeURIComponent(service.department || 'General Care')}`);
  };

  const handleDownloadBrochure = () => {
    const textContent = `MEDICARE PLUS HOSPITAL — CLINICAL SERVICE BROCHURE\n\nService Name: ${service.title}\nCategory: ${service.category || 'Clinical Care'}\nRating: ${service.rating || '4.9'} / 5.0 ⭐ (${service.reviews || 245} Reviews)\nAvailability: ${service.availability || '24/7 Available'}\nLocation: ${service.location || 'Main Hospital Wing'}\nStarting Price: ${service.startingPrice || 'LKR 5,000 / $50'}\nEmergency Status: ${service.isEmergency ? '24/7 Active Emergency Response' : 'Scheduled Consultation'}\n\nOVERVIEW:\n${service.desc || 'Comprehensive clinical medical service equipped with modern diagnostic suites.'}\n\nWHEN TO SEEK CARE:\n• Symptoms requiring specialist evaluation\n• Routine preventive health screening\n• Post-operative recovery and rehabilitation\n\nSERVICE PROCESS:\n1. Book Appointment -> 2. Initial Consultation -> 3. Diagnostic Assessment -> 4. Specialist Evaluation -> 5. Treatment -> 6. Follow-up Care\n\nCONTACT INFORMATION:\nMediCare Plus Hotline: +94 11 234 5678 | Emergency: +94 11 999 9999\nEmail: info@medicareplus.com | Web: http://localhost:5173\n`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${service.title.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast.success(`${service.title} brochure downloaded successfully!`);
  };

  const ServiceIcon = service.icon || Stethoscope;

  const relevantDoctors = doctors.length > 0 ? doctors.slice(0, 3) : [
    { id: 1, name: 'Dr. Aris Thorne', specialization: 'Interventional Cardiology', experience: '18 Yrs', rating: 4.95, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Dr. Elena Rostova', specialization: 'Brain & Spine Surgery', experience: '14 Yrs', rating: 4.92, image: 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80' },
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
          {/* Header Bar */}
          <div className="relative h-64 md:h-72 overflow-hidden shrink-0">
            <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
            >
              <X size={22} />
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#16A3A8] text-white px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {service.category || 'Medical Service'}
                </span>
                <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1">
                  <Star size={12} className="fill-current" /> {service.rating || '4.9'} ({service.reviews || 245} Reviews)
                </span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1 ${service.isEmergency ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 text-white'}`}>
                  {service.isEmergency ? '🚨 24/7 Available' : '🟢 Available Today'}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shrink-0">
                  <ServiceIcon size={26} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-poppins">{service.title}</h2>
                  <p className="text-xs text-blue-100 font-medium">MediCare Plus Department of {service.department || 'Clinical Medicine'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-grow text-xs leading-relaxed text-slate-600">
            
            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#0F4C81] pl-3">Clinical Overview & Patient Scope</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-[#0F4C81] block text-xs">Who Needs This Service?</span>
                  <p className="text-slate-500">Patients experiencing acute symptoms, requiring routine diagnostic evaluations, or seeking expert multi-disciplinary medical care.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-[#16A3A8] block text-xs">Key Patient Benefits</span>
                  <p className="text-slate-500">Rapid treatment intervention, ISO certified diagnostic accuracy, state-of-the-art medical technology, and 24/7 care support.</p>
                </div>
              </div>
            </div>

            {/* Service Information Table */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#16A3A8] pl-3">Service Details & Facilities</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-700 w-1/3">Service Availability</td>
                      <td className="p-3 font-semibold text-[#0F4C81]">{service.availability || '24 Hours / 7 Days'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">Location</td>
                      <td className="p-3">{service.location || 'MediCare Plus Main Wing, Colombo'}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-700">Starting Fee / Price</td>
                      <td className="p-3 font-bold text-[#22C55E]">{service.startingPrice || 'LKR 5,000 / $50'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">Emergency Readiness</td>
                      <td className="p-3">{service.isEmergency ? 'Yes (24/7 Mobile ICU & Trauma Team)' : 'Scheduled / OPD Basis'}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-700">Appointment Status</td>
                      <td className="p-3">Walk-ins Allowed for Emergency; Online Booking Preferred</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">Insurance Coverage</td>
                      <td className="p-3 font-semibold text-[#22C55E]">Accepted (Direct Cashless Claims Active)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Feature Chips */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A]">Core Highlights & Capabilities</h3>
              <div className="flex flex-wrap gap-2">
                {['Advanced Medical Equipment', 'Board-Certified Doctors', 'Modern ICU & Suites', '24/7 Dedicated Support', 'Fast Digital Reports', 'Patient Assistance Desk'].map((chip) => (
                  <span key={chip} className="bg-blue-50 border border-blue-100 text-[#0F4C81] font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#22C55E]" /> {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Treatment / Service Process Diagram */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-base font-bold text-[#0F172A]">Patient Treatment & Service Workflow</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-[11px] font-bold text-slate-700">
                <div className="p-3 bg-white rounded-xl border shadow-sm">1. Book Appt</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">2. Consultation</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">3. Diagnostics</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">4. Evaluation</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">5. Treatment</div>
                <div className="p-3 bg-white rounded-xl border shadow-sm">6. Follow-up</div>
              </div>
            </div>

            {/* Available Specialists */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#22C55E] pl-3">Attending Consultants & Specialists</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relevantDoctors.map((doc) => (
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

          {/* Modal Sticky Footer Actions */}
          <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 shrink-0">
            <div className="flex gap-2">
              <button
                onClick={() => setIsInsuranceModalOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <ShieldCheck size={16} className="text-[#16A3A8]" /> Check Insurance
              </button>
              <button
                onClick={handleDownloadBrochure}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download size={16} /> Download Brochure
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleBookService}
                className="btn-primary py-2.5 px-6 text-xs justify-center"
              >
                <Calendar size={16} /> Book This Service Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insurance Modal */}
      <InsuranceModal
        isOpen={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
        defaultService={service.title}
      />
    </AnimatePresence>
  );
};

export default ServiceModal;
