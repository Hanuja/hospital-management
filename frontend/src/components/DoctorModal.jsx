import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, Clock, DollarSign, Award, CheckCircle, ShieldCheck, Heart, Share2, Download, Phone, MapPin, Users, Activity, MessageSquare, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DoctorModal = ({ doctor, isOpen, onClose }) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [consultationMode, setConsultationMode] = useState('In-person');

  useEffect(() => {
    if (doctor) {
      const savedFavs = JSON.parse(localStorage.getItem('medicare_fav_doctors') || '[]');
      setIsFavorite(savedFavs.includes(doctor.id));
    }
  }, [doctor]);

  if (!isOpen || !doctor) return null;

  const toggleFavorite = () => {
    const savedFavs = JSON.parse(localStorage.getItem('medicare_fav_doctors') || '[]');
    let updated;
    if (isFavorite) {
      updated = savedFavs.filter(id => id !== doctor.id);
      toast.success(`${doctor.name} removed from your favorites.`);
    } else {
      updated = [...savedFavs, doctor.id];
      toast.success(`${doctor.name} added to your favorite doctors!`);
    }
    localStorage.setItem('medicare_fav_doctors', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    const url = window.location.origin + `/doctors?id=${doctor.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success('Doctor profile link copied to clipboard!');
    } else {
      toast.success('Profile link: ' + url);
    }
  };

  const handleDownloadProfile = () => {
    const text = `MEDICARE PLUS — DOCTOR CONSULTANT PROFILE\n\nDoctor Name: ${doctor.name}\nQualifications: ${doctor.qualification}\nSpecialization: ${doctor.specialization}\nDepartment: ${doctor.department_name || 'Medical Department'}\nExperience: ${doctor.experience || 15} Years\nRating: ${doctor.rating || 4.9} / 5.0 ⭐ (Verified Consultant)\nConsultation Fee: $${doctor.consultation_fee || 75.00} (LKR 7,500)\nAvailability: ${doctor.availability || 'Mon - Fri, 8:00 AM - 4:00 PM'}\n\nBIOGRAPHY:\n${doctor.bio || 'Senior medical consultant committed to patient-first holistic treatment and clinical precision.'}\n\nWEEKLY SCHEDULE:\nMonday: 09:00 - 13:00 (Available)\nTuesday: 14:00 - 18:00 (Available)\nWednesday: Special Surgery Day\nThursday: 09:00 - 13:00 (Available)\nFriday: 14:00 - 17:00 (Limited)\n\nCONTACT & HOSPITAL LOCATION:\nMediCare Plus Specialist Wing, 3rd Floor, Colombo Campus\nHotline: +94 11 234 5678 | Emergency: +94 11 999 9999\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doctor.name.replace(/\s+/g, '_')}_Profile.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast.success(`${doctor.name} profile downloaded!`);
  };

  const handleBookWithSlot = () => {
    onClose();
    navigate(`/appointment?doctor_id=${doctor.id}&date=${selectedDate}&time=${selectedSlot}&mode=${consultationMode}`);
  };

  const availableSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

  const doctorServices = [
    `${doctor.specialization || 'Clinical'} Consultation`,
    'ECG & Diagnostic Evaluation',
    'Specialist Treatment Planning',
    'Post-Operative Recovery Checkup',
    'Preventive Wellness Screening'
  ];

  const weeklySchedule = [
    { day: 'Monday', time: '09:00 AM – 01:00 PM', status: 'Available', color: 'text-emerald-600 bg-emerald-50' },
    { day: 'Tuesday', time: '02:00 PM – 06:00 PM', status: 'Available', color: 'text-emerald-600 bg-emerald-50' },
    { day: 'Wednesday', time: 'Surgery / OT Day', status: 'Unavailable', color: 'text-red-500 bg-red-50' },
    { day: 'Thursday', time: '09:00 AM – 01:00 PM', status: 'Available', color: 'text-emerald-600 bg-emerald-50' },
    { day: 'Friday', time: '02:00 PM – 05:00 PM', status: 'Limited', color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-100 my-4 max-h-[92vh] flex flex-col relative"
        >
          {/* Top Header Bar */}
          <div className="bg-[#0F4C81] text-white p-6 relative flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold border border-white/30">
                <ShieldCheck className="text-[#16A3A8]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins">{doctor.name}</h3>
                <p className="text-blue-100 text-xs">{doctor.qualification} — {doctor.department_name || 'Medical Department'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                title="Add to Favorites"
              >
                <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Share Profile"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-grow text-xs text-slate-600 leading-relaxed">
            
            {/* Doctor Profile Banner Header */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-36 h-36 md:w-44 md:h-44 rounded-2xl object-cover shadow-lg border-4 border-white shrink-0"
              />

              <div className="space-y-3 flex-grow text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 font-extrabold px-3 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" /> {doctor.rating || 4.9} / 5.0 Rating
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-0.5 rounded-full text-xs flex items-center gap-1">
                    🟢 Available Today
                  </span>
                  <span className="bg-blue-100 text-[#0F4C81] font-bold px-3 py-0.5 rounded-full text-xs">
                    🔵 Telemedicine Active
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] font-poppins">{doctor.name}</h2>
                <p className="text-[#16A3A8] font-bold text-sm">{doctor.specialization} Consultant</p>

                {/* 4 Mini Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-lg font-extrabold text-[#0F4C81] font-poppins">{doctor.experience || 15}+ Yrs</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Experience</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-lg font-extrabold text-[#16A3A8] font-poppins">8,500+</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Patients</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-lg font-extrabold text-amber-600 font-poppins">{doctor.rating || 4.9} ⭐</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Rating</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-lg font-extrabold text-[#22C55E] font-poppins">2,000+</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Treatments</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography & Tagged Areas of Expertise */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#0F4C81] pl-3">About {doctor.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{doctor.bio || 'Senior medical consultant committed to patient-first holistic care, minimally invasive surgical procedures, and clinical research excellence.'}</p>

              <div className="pt-2 space-y-2">
                <span className="font-bold text-slate-700 block text-xs">Areas of Expertise:</span>
                <div className="flex flex-wrap gap-2">
                  {['Cardiology', 'Heart Failure Management', 'Interventional Procedures', 'Preventive Cardiology', 'Hypertension & Lipid Control'].map((tag) => (
                    <span key={tag} className="bg-blue-50 text-[#0F4C81] border border-blue-100 px-3 py-1 rounded-xl text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Slot Selection Box */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Calendar size={18} className="text-[#0F4C81]" /> Select Date & Available Consultation Slot
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Choose Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#0F4C81]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">Available Time Slots</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${selectedSlot === slot ? 'bg-[#0F4C81] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 text-xs border-t border-slate-200">
                <span className="text-slate-500">Selected: <strong>{selectedDate} at {selectedSlot}</strong></span>
                <button
                  onClick={handleBookWithSlot}
                  className="btn-primary py-2 px-5 text-xs font-bold"
                >
                  Continue Booking →
                </button>
              </div>
            </div>

            {/* Weekly Schedule Table */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#16A3A8] pl-3">Weekly Consultation Schedule</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase border-b">
                    <tr>
                      <th className="p-3">Day</th>
                      <th className="p-3">Consultation Hours</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {weeklySchedule.map((row) => (
                      <tr key={row.day} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#0F172A]">{row.day}</td>
                        <td className="p-3 text-slate-600">{row.time}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${row.color}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Doctor's Provided Clinical Services */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#22C55E] pl-3">Clinical Services Provided</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {doctorServices.map((srv) => (
                  <div key={srv} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{srv}</span>
                    <button onClick={handleBookWithSlot} className="text-[#0F4C81] font-bold hover:underline flex items-center gap-0.5">
                      Book <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Reviews Snippet */}
            <div className="space-y-3 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-[#0F172A]">Patient Feedback & Reviews</h3>
                <span className="text-amber-600 font-bold text-xs">⭐ 4.9 / 5.0 (245 Patient Reviews)</span>
              </div>
              <div className="space-y-2 text-xs italic text-slate-600">
                <div className="p-3 bg-white rounded-xl border border-slate-100">
                  "Dr. {doctor.name} is extremely caring and took time to explain my cardiac reports clearly. Highly recommended specialist!"
                  <span className="block not-italic font-bold text-slate-800 mt-1">— Verified Patient</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Modal Bottom Action Bar */}
          <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 shrink-0">
            <div className="flex gap-2">
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${isFavorite ? 'bg-red-500 text-white border-red-500' : 'border-slate-300 text-slate-700 hover:bg-slate-200'}`}
              >
                <Heart size={16} className={isFavorite ? 'fill-current' : ''} /> {isFavorite ? 'Favorited' : 'Favorite'}
              </button>
              <button
                onClick={handleDownloadProfile}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download size={16} /> Download Profile
              </button>
            </div>

            <div className="flex gap-3">
              <a
                href="tel:+94112345678"
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Phone size={16} /> Call Hospital
              </a>
              <button
                onClick={handleBookWithSlot}
                className="btn-primary py-2.5 px-6 text-xs justify-center"
              >
                <Calendar size={16} /> Book Appointment (${doctor.consultation_fee || 75})
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DoctorModal;
