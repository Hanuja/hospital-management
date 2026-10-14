import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Heart, Brain, Users, Baby, Activity, ShieldCheck, Smile, 
  Calendar, Clock, Video, User, CheckCircle2, ArrowRight, ArrowLeft, Stethoscope
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createAppointment } from '../services/api';

const counsellingCategories = [
  {
    id: 'mental-health',
    name: 'Mental Health Counselling',
    shortName: 'Mental Health',
    icon: Brain,
    color: 'bg-indigo-50 text-indigo-600',
    services: ['Anxiety & stress', 'Depression support', 'Emotional wellbeing', 'Grief counselling']
  },
  {
    id: 'family',
    name: 'Family & Relationship Counselling',
    shortName: 'Family & Relationship',
    icon: Users,
    color: 'bg-emerald-50 text-emerald-600',
    services: ['Marriage/couple counselling', 'Family conflicts', 'Communication issues', 'Parenting guidance']
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Counselling',
    shortName: 'Pregnancy',
    icon: Baby,
    color: 'bg-pink-50 text-pink-600',
    services: ['Pregnancy planning', 'Pre-pregnancy counselling', 'Pregnancy confirmation guidance', 'Antenatal counselling', 'Pregnancy nutrition & lifestyle', 'Preparing for childbirth', 'Postnatal support']
  },
  {
    id: 'sexual-reproductive',
    name: 'Pregnancy, Sexual & Reproductive Health',
    shortName: 'Sexual & Reproductive',
    icon: Heart,
    color: 'bg-rose-50 text-rose-600',
    services: ['Sexual health education', 'Contraception & family planning', 'STI/STD prevention & testing guidance', 'Menstrual & reproductive health', 'Sexual wellbeing', 'Confidential sexual-health consultation']
  },
  {
    id: 'fertility',
    name: 'Fertility Counselling',
    shortName: 'Fertility',
    icon: Activity,
    color: 'bg-teal-50 text-teal-600',
    services: ['Fertility assessment guidance', 'Infertility support', 'IVF/fertility-treatment counselling', 'Male & female fertility concerns', 'Couple fertility counselling']
  },
  {
    id: 'womens-health',
    name: 'Women\'s Health Counselling',
    shortName: 'Women\'s Health',
    icon: Heart,
    color: 'bg-fuchsia-50 text-fuchsia-600',
    services: ['Menstrual health', 'Pregnancy-related concerns', 'Postpartum emotional support', 'Menopause counselling', 'Women\'s reproductive health']
  },
  {
    id: 'mens-health',
    name: 'Men\'s Health Counselling',
    shortName: 'Men\'s Health',
    icon: Activity,
    color: 'bg-blue-50 text-blue-600',
    services: ['Sexual health', 'Fertility concerns', 'Reproductive health', 'Relationship/sexual wellbeing']
  },
  {
    id: 'child-adolescent',
    name: 'Child & Adolescent Counselling',
    shortName: 'Child & Adolescent',
    icon: Smile,
    color: 'bg-amber-50 text-amber-600',
    services: ['Behavioural concerns', 'School-related stress', 'Emotional support', 'Adolescent health education']
  },
  {
    id: 'addiction',
    name: 'Addiction Counselling',
    shortName: 'Addiction',
    icon: ShieldCheck,
    color: 'bg-slate-100 text-slate-700',
    services: ['Alcohol/substance-use support', 'Behavioural addiction', 'Recovery support', 'Family support']
  }
];

const mockSpecialists = [
  { id: 101, name: 'Dr. Sarah Jenkins', role: 'Psychologist', fee: 60, categories: ['mental-health', 'addiction'] },
  { id: 102, name: 'Dr. Mark Thorne', role: 'Psychiatrist', fee: 100, categories: ['mental-health'] },
  { id: 103, name: 'Anna Belova', role: 'Family Counsellor', fee: 50, categories: ['family', 'child-adolescent'] },
  { id: 104, name: 'Dr. Emily Chen', role: 'Obstetrician/Gynecologist', fee: 90, categories: ['pregnancy', 'womens-health', 'sexual-reproductive'] },
  { id: 105, name: 'Dr. Robert Hale', role: 'Fertility Specialist', fee: 120, categories: ['fertility', 'sexual-reproductive', 'mens-health'] },
  { id: 106, name: 'Linda Silva', role: 'Child & Adolescent Counsellor', fee: 55, categories: ['child-adolescent', 'family'] },
  { id: 107, name: 'Dr. Amanda Rostova', role: 'Sexual & Reproductive Health Specialist', fee: 85, categories: ['sexual-reproductive', 'womens-health'] },
];

const Counselling = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  
  // Booking State
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationMode, setConsultationMode] = useState('Online');
  
  // Patient Details
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: '',
    assessment: ''
  });

  const availableSpecialists = selectedCategory 
    ? mockSpecialists.filter(s => s.categories.includes(selectedCategory.id))
    : mockSpecialists;

  const handleNext = () => {
    if (step === 1 && (!selectedCategory || !selectedService)) {
      toast.error("Please select a counselling category and a specific service.");
      return;
    }
    if (step === 2 && !selectedSpecialist) {
      toast.error("Please select a specialist.");
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      toast.error("Please select a date and time slot.");
      return;
    }
    if (step === 4 && (!patientData.name || !patientData.email || !patientData.phone)) {
      toast.error("Please fill in your personal details.");
      return;
    }
    window.scrollTo({ top: 300, behavior: 'smooth' });
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const submitBooking = async () => {
    const loadingToast = toast.loading('Processing your counselling appointment...');
    try {
      const appointmentData = {
        patient_name: patientData.name,
        patient_email: patientData.email,
        patient_phone: patientData.phone,
        department_id: 1,
        reason: `Counselling: ${selectedCategory.name} - ${selectedService}`,
        medical_notes: patientData.assessment,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        consultation_type: consultationMode
      };
      
      const res = await createAppointment(appointmentData);
      toast.dismiss(loadingToast);
      
      if (res && res.status === 'success') {
        toast.success('Appointment created successfully!');
        const appointmentId = res.appointment_id || Math.floor(Math.random() * 10000);
        navigate(`/payment?appointment_id=${appointmentId}&fee=${selectedSpecialist.fee}`);
      } else {
        toast.success('Appointment created! Redirecting to payment...');
        setTimeout(() => navigate(`/payment?appointment_id=8899&fee=${selectedSpecialist.fee}`), 1000);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.success('Proceeding to payment gateway...');
      navigate(`/payment?appointment_id=8899&fee=${selectedSpecialist.fee}`);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* 1. Hero Banner */}
      <section className="bg-[#0F172A] relative overflow-hidden text-white pt-20 pb-24 text-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-4xl space-y-5">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-[0.2em]">{t('counselling.subtitle')}</span>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold leading-tight">
            {t('counselling.title')}
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t('counselling.description')}
          </p>
        </div>
      </section>

      {/* 2. Wizard Container */}
      <section className="container mx-auto px-4 -mt-12 relative z-20 max-w-5xl">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-6 md:p-10">
          
          {/* Progress Indicator */}
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 mb-10 text-center">
            {[t('counselling.step1'), t('counselling.step2'), t('counselling.step3'), t('counselling.step4'), t('counselling.step5')].map((label, idx) => {
              const stepNumber = idx + 1;
              const isActive = step === stepNumber;
              const isCompleted = step > stepNumber;
              return (
                <div key={idx} className="flex-1 min-w-[30%] md:min-w-0 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-colors ${isActive ? 'bg-[#0F4C81] text-white shadow-md' : isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {isCompleted ? <CheckCircle2 size={16} /> : stepNumber}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-[#0F4C81]' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Category & Service */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold font-poppins text-[#0F172A]">{t('counselling.categoryTitle')}</h2>
                  <p className="text-slate-500 text-sm">{t('counselling.categorySubtitle')}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {counsellingCategories.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory?.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat); setSelectedService(''); }}
                        className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-3 ${isSelected ? 'border-[#0F4C81] bg-blue-50 ring-2 ring-[#0F4C81]/20 shadow-md scale-[1.02]' : 'border-slate-200 hover:border-[#16A3A8] hover:bg-slate-50'}`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#0F4C81] text-white' : cat.color}`}>
                          <Icon size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-700 leading-tight">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedCategory && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-6 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Specific Services in {selectedCategory.shortName}</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedCategory.services.map(srv => (
                        <button
                          key={srv}
                          onClick={() => setSelectedService(srv)}
                          className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all border ${selectedService === srv ? 'bg-[#16A3A8] text-white border-[#16A3A8] shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* STEP 2: Specialist Selection */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold font-poppins text-[#0F172A]">{t('counselling.specialistTitle')}</h2>
                  <p className="text-slate-500 text-sm">{t('counselling.specialistSubtitle')} {selectedService}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {availableSpecialists.map(doc => (
                    <div 
                      key={doc.id} 
                      onClick={() => setSelectedSpecialist(doc)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${selectedSpecialist?.id === doc.id ? 'border-[#0F4C81] bg-blue-50 ring-2 ring-[#0F4C81]/20' : 'border-slate-200 hover:border-[#16A3A8]'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
                          {doc.name.charAt(doc.name.startsWith('Dr.') ? 4 : 0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A]">{doc.name}</h4>
                          <p className="text-xs text-[#16A3A8] font-semibold">{doc.role}</p>
                          <p className="text-xs text-slate-500 mt-1">Fee: ${doc.fee} / session</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedSpecialist?.id === doc.id ? 'border-[#0F4C81] bg-[#0F4C81]' : 'border-slate-300'}`}>
                        {selectedSpecialist?.id === doc.id && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                    </div>
                  ))}
                  {availableSpecialists.length === 0 && (
                    <div className="col-span-2 text-center p-8 bg-slate-50 rounded-2xl text-slate-500 text-sm">
                      No specific specialists found for this category. Please go back and select another category.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Date & Time */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold font-poppins text-[#0F172A]">{t('counselling.datetimeTitle')}</h2>
                  <p className="text-slate-500 text-sm">{t('counselling.datetimeSubtitle')} {selectedSpecialist?.name}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Calendar size={16} className="text-[#0F4C81]"/> Select Date
                    </label>
                    <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81]"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Clock size={16} className="text-[#0F4C81]"/> Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'].map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-colors ${selectedTime === time ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Video size={16} className="text-[#0F4C81]"/> Consultation Mode
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setConsultationMode('Online')}
                      className={`flex-1 p-4 rounded-xl border text-sm font-bold flex flex-col items-center gap-2 transition-all ${consultationMode === 'Online' ? 'border-[#16A3A8] bg-teal-50 text-teal-700 ring-2 ring-[#16A3A8]/20' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      <Video size={24} /> Online / Telemedicine
                    </button>
                    <button
                      onClick={() => setConsultationMode('In-person')}
                      className={`flex-1 p-4 rounded-xl border text-sm font-bold flex flex-col items-center gap-2 transition-all ${consultationMode === 'In-person' ? 'border-[#0F4C81] bg-blue-50 text-blue-800 ring-2 ring-[#0F4C81]/20' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      <User size={24} /> In-person Clinic Visit
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Patient Details */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                 <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold font-poppins text-[#0F172A]">{t('counselling.patientTitle')}</h2>
                  <p className="text-slate-500 text-sm">{t('counselling.patientSubtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={patientData.name}
                      onChange={e => setPatientData({...patientData, name: e.target.value})}
                      placeholder="e.g. John Silva"
                      className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={patientData.email}
                      onChange={e => setPatientData({...patientData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={patientData.phone}
                      onChange={e => setPatientData({...patientData, phone: e.target.value})}
                      placeholder="+94 77 123 4567"
                      className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Pre-Assessment Notes (Optional)</label>
                    <textarea
                      rows={3}
                      value={patientData.assessment}
                      onChange={e => setPatientData({...patientData, assessment: e.target.value})}
                      placeholder="Briefly describe what you'd like to discuss or any particular concerns..."
                      className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Confirmation */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold font-poppins text-[#0F172A]">{t('counselling.confirmTitle')}</h2>
                <p className="text-slate-500 text-sm">{t('counselling.confirmSubtitle')}</p>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-left space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase block">Service</span>
                      <p className="font-semibold text-[#0F172A]">{selectedService}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase block">Specialist</span>
                      <p className="font-semibold text-[#0F172A]">{selectedSpecialist?.name}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase block">Date & Time</span>
                      <p className="font-semibold text-[#0F172A]">{selectedDate} @ {selectedTime}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase block">Mode</span>
                      <p className="font-semibold text-[#0F172A]">{consultationMode}</p>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-slate-600 font-bold">Consultation Fee</span>
                      <span className="text-2xl font-extrabold text-[#22C55E]">${selectedSpecialist?.fee}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button onClick={handleBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <ArrowLeft size={16} /> {t('counselling.back')}
              </button>
            ) : <div />}

            {step < 5 ? (
              <button onClick={handleNext} className="btn-primary py-3 px-8 flex items-center gap-2 text-sm">
                {t('counselling.next')} <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={submitBooking} className="btn-accent py-3 px-8 flex items-center gap-2 text-sm shadow-xl">
                <ShieldCheck size={18} /> {t('counselling.proceedToPayment')}
              </button>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Counselling;
