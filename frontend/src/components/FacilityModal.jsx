import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, Clock, MapPin, ShieldCheck, Download, Award, CheckCircle2, Users, Phone, Calendar, Baby, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const FacilityModal = ({ facility, isOpen, onClose, doctors = [] }) => {
  const navigate = useNavigate();

  if (!isOpen || !facility) return null;

  const SelectedIcon = facility.icon || Building;

  const handleBook = () => {
    onClose();
    navigate(`/appointment?department=${encodeURIComponent(facility.category || 'General Care')}`);
  };

  const handleDownloadBrochure = () => {
    const textContent = `MEDICARE PLUS HOSPITAL — FACILITY BROCHURE\n\nFacility Name: ${facility.title}\nCategory: ${facility.category || 'Hospital Infrastructure'}\nAvailability: ${facility.availability || '24/7 Active'}\nCapacity: ${facility.capacity || '40 Beds / Units'}\nLocation: ${facility.location || 'MediCare Plus Campus, Colombo'}\n\nOVERVIEW:\n${facility.desc || 'World-class hospital facility built for patient safety, hygiene, and clinical excellence.'}\n\nKEY FEATURES:\n${(facility.features || ['Continuous patient monitoring', 'Specialist medical support', '24/7 nursing care', 'Sanitized environment']).map(f => '• ' + f).join('\n')}\n\nACCESSIBILITY:\n${(facility.accessibility || ['Wheelchair Accessible', 'Elevator Access', 'Emergency Response Access']).map(a => '• ' + a).join('\n')}\n\nCONTACT INFORMATION:\nMediCare Plus Desk: +94 11 234 5678 | Emergency Hotline: +94 11 999 9999\nWebsite: http://localhost:5173\n`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${facility.title.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast.success(`${facility.title} facility brochure downloaded!`);
  };

  const attendingDoctors = doctors.length > 0 ? doctors.slice(0, 2) : [
    { id: 1, name: 'Dr. Aris Thorne', specialization: 'Head of Clinical Services', experience: '18 Yrs', rating: 4.95, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Dr. Elena Rostova', specialization: 'Senior Medical Director', experience: '14 Yrs', rating: 4.92, image: 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80' }
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
            <img src={facility.img || facility.image} alt={facility.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#16A3A8] text-white px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {facility.category || 'Hospital Infrastructure'}
                </span>
                <span className="bg-emerald-600 text-white px-3 py-0.5 rounded-full text-xs font-bold">
                  🟢 {facility.availability || '24/7 Available'}
                </span>
                <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-xs font-bold">
                  JCI Accredited
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0">
                  <SelectedIcon size={26} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-poppins">{facility.title}</h2>
                  <p className="text-xs text-blue-100 font-semibold">{facility.location || 'MediCare Plus Main Hospital Campus'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-grow text-xs leading-relaxed text-slate-600">
            
            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#0F4C81] pl-3">Facility Overview</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{facility.desc || facility.description}</p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-400 uppercase font-bold block">Capacity</span>
                <span className="text-lg font-extrabold text-[#0F4C81] font-poppins">{facility.capacity || '40 Beds'}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-400 uppercase font-bold block">Availability</span>
                <span className="text-lg font-extrabold text-[#16A3A8] font-poppins">{facility.availability || '24/7'}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-400 uppercase font-bold block">Specialists</span>
                <span className="text-lg font-extrabold text-[#22C55E] font-poppins">{facility.specialistCount || 12}+ Team</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-400 uppercase font-bold block">Equipment Level</span>
                <span className="text-lg font-extrabold text-amber-600 font-poppins">Advanced</span>
              </div>
            </div>

            {/* Features & Accessibility Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#0F4C81]" /> Key Features & Amenities
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(facility.features || [
                    'Continuous patient monitoring',
                    'Specialist medical team on-site',
                    '24/7 dedicated nursing staff',
                    'Sanitized & infection-controlled environment'
                  ]).map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <span className="text-[#16A3A8] font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#22C55E]" /> Accessibility & Comfort
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(facility.accessibility || [
                    'Wheelchair & Stretcher Accessible',
                    'Elevator Access',
                    'Emergency Access Ramp',
                    'Parent & Visitor Seating'
                  ]).map((acc) => (
                    <li key={acc} className="flex items-start gap-2">
                      <span className="text-[#22C55E] font-bold mt-0.5">✓</span>
                      <span>{acc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Connected Specialists */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#22C55E] pl-3">Attending Facility Medical Consultants</h3>
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
              <Download size={16} /> Download Facility Brochure
            </button>

            <div className="flex gap-3">
              <a
                href="tel:+94112345678"
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Phone size={16} /> Contact Desk
              </a>
              <button
                onClick={handleBook}
                className="btn-primary py-2.5 px-6 text-xs justify-center"
              >
                <Calendar size={16} /> Book Appointment
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FacilityModal;
