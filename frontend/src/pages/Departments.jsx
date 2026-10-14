import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Brain, Bone, Baby, Activity, Eye, Stethoscope,
  Search, Filter, Clock, Users, ShieldCheck, CheckCircle2, ChevronRight, Calendar, Download
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getDoctors } from '../services/api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Departments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      const docs = await getDoctors();
      setDoctorsList(docs);
    };
    loadDoctors();
  }, []);

  const departments = [
    { 
      id: 1, name: 'Cardiology', icon: Heart, category: 'Medical',
      image: 'https://i.pinimg.com/1200x/27/7f/89/277f89c8acebda4c270a4affabc1267f.jpg',
      desc: 'Advanced heart care, diagnostics, angioplasty, and cardiac rehabilitation.',
      head: 'Dr. Aris Thorne', exp: '18+ Years',
      services: ['ECG & ECHO', 'Heart Bypass', 'Angioplasty'],
      hours: 'Mon-Sat: 8 AM - 8 PM', emergency: true
    },
    { 
      id: 2, name: 'Neurology', icon: Brain, category: 'Surgical',
      image: 'https://i.pinimg.com/1200x/3d/2c/2f/3d2c2f95717b0680947def58a8aec95a.jpg',
      desc: 'Expert care for brain, spinal cord, and nervous system disorders.',
      head: 'Dr. Elena Rostova', exp: '14+ Years',
      services: ['Brain Surgery', 'Stroke Rehab', 'Neuro Diagnostics'],
      hours: 'Mon-Fri: 9 AM - 6 PM', emergency: true
    },
    { 
      id: 3, name: 'Orthopedics', icon: Bone, category: 'Surgical',
      image: 'https://i.pinimg.com/1200x/4e/d6/f6/4ed6f6c314361673eb16fe1aad86b3d7.jpg',
      desc: 'Comprehensive bone, joint replacements, and spine treatments.',
      head: 'Dr. Marcus Vance', exp: '16+ Years',
      services: ['Joint Replacement', 'Spine Surgery', 'Physiotherapy'],
      hours: 'Mon-Sat: 8 AM - 6 PM', emergency: false
    },
    { 
      id: 4, name: 'Pediatrics', icon: Baby, category: 'Medical',
      image: 'https://i.pinimg.com/736x/e7/be/b9/e7beb9b51953f5f17d7b8e174610a527.jpg',
      desc: 'Specialized, compassionate healthcare and neonatal care for children.',
      head: 'Dr. Sophia Chen', exp: '12+ Years',
      services: ['Vaccinations', 'Child Nutrition', 'Pediatric ICU'],
      hours: 'Mon-Sun: 9 AM - 8 PM', emergency: true
    },
    { 
      id: 5, name: 'Gynecology', icon: Activity, category: 'Specialty',
      image: 'https://i.pinimg.com/1200x/36/26/89/36268912b7ce777e1826a248129c4442.jpg',
      desc: 'Comprehensive healthcare for women, maternity care, and IVF.',
      head: 'Dr. Sarah Al-Mansoor', exp: '15+ Years',
      services: ['Maternity Care', 'IVF Treatment', 'Women Wellness'],
      hours: 'Mon-Sat: 9 AM - 7 PM', emergency: true
    },
    { 
      id: 6, name: 'Dental Care', icon: Stethoscope, category: 'Specialty',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      desc: 'Advanced cosmetic dental treatments, implants, and oral surgeries.',
      head: 'Dr. Hannah Wright', exp: '11+ Years',
      services: ['Root Canal', 'Implants', 'Teeth Whitening'],
      hours: 'Mon-Sat: 10 AM - 6 PM', emergency: false
    },
    { 
      id: 7, name: 'Eye Care', icon: Eye, category: 'Specialty',
      image: 'https://i.pinimg.com/1200x/42/ba/41/42ba41db91cfd6c7f95997fc2c3e87ff.jpg',
      desc: 'Vision correction, LASIK, cataract, and comprehensive eye treatments.',
      head: 'Dr. Anita Desai', exp: '14+ Years',
      services: ['LASIK Surgery', 'Cataract', 'Glaucoma Care'],
      hours: 'Mon-Sat: 9 AM - 5 PM', emergency: false
    },
    { 
      id: 8, name: 'ENT', icon: Stethoscope, category: 'Medical',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      desc: 'Specialized ear, nose, hearing tests, and throat treatments.',
      head: 'Dr. Thomas Clark', exp: '11+ Years',
      services: ['Hearing Tests', 'Sinus Surgery', 'Throat Care'],
      hours: 'Mon-Fri: 9 AM - 6 PM', emergency: false
    },
    { 
      id: 9, name: 'Oncology', icon: Activity, category: 'Diagnostic',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      desc: 'Advanced cancer diagnosis, chemotherapy, and tumor radiation care.',
      head: 'Dr. Julian Sterling', exp: '20+ Years',
      services: ['Chemotherapy', 'Radiation', 'Tumor Removal'],
      hours: 'Mon-Fri: 8 AM - 5 PM', emergency: true
    },
    { 
      id: 10, name: 'Emergency', icon: Activity, category: 'Emergency',
      image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
      desc: '24/7 critical trauma care and rapid mobile ICU ambulance response.',
      head: 'Dr. David Miller', exp: '22+ Years',
      services: ['Trauma Care', 'ACLS Ambulance', 'Critical ICU'],
      hours: '24 Hours / 7 Days', emergency: true
    }
  ];

  const categories = ['All', 'Medical', 'Surgical', 'Diagnostic', 'Emergency', 'Specialty'];

  const consultationTypes = [
    { key: 'General Consultation', price: 50, features: ['Doctor Consultation', 'Basic Health Assessment', 'Medical Advice'] },
    { key: 'Specialist Consultation', price: 100, features: ['Specialist Doctor Consultation', 'Detailed Medical Evaluation', 'Treatment Recommendation'] },
    { key: 'Premium Consultation', price: 150, features: ['Senior Specialist Consultation', 'Advanced Health Review', 'Follow-up Support'] },
  ];

  const departmentFees = {
    Cardiology: 100,
    Neurology: 120,
    Orthopedics: 90,
    Oncology: 150,
    Pediatrics: 70,
    Gynecology: 100,
    'Eye Care': 80,
    'Dental Care': 60,
  };

  const paymentMethodsByCategory = {
    'Online Payment': ['Credit Card', 'Debit Card', 'Online Banking', 'Mobile Payment'],
    'Insurance Payment': ['Insurance Provider', 'Policy Number', 'Claim Verification'],
    'Pay At Hospital': ['Cash Payment', 'Card Payment at Counter'],
  };

  const filteredDepts = departments.filter(dept => 
    (filter === 'All' || dept.category === filter) &&
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState('Specialist Consultation');
  const [paymentCategory, setPaymentCategory] = useState('Online Payment');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodsByCategory['Online Payment'][0]);
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientName, setPatientName] = useState('');

  const serviceCharge = 5;
  const selectedConsultationFee = consultationTypes.find((item) => item.key === selectedConsultation)?.price || 0;
  const totalPay = selectedConsultationFee + serviceCharge;
  const selectedDoctor = selectedDepartment?.head || 'Dr. Aris Thorne';
  const selectedService = selectedDepartment ? `${selectedDepartment.name} Consultation` : 'Department Consultation';

  const handleSelectDepartment = (dept) => {
    setSelectedDepartment(dept);
    setTimeout(() => {
      const section = document.getElementById('department-payment-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientEmail) {
      toast.error('Please provide patient name and email to confirm payment.');
      return;
    }

    // Build invoice text
    const invoiceText = `MEDICARE PLUS HOSPITAL INVOICE\n\nDepartment: ${selectedDepartment.name}\nDoctor: ${selectedDoctor}\nAppointment Type: ${selectedConsultation}\nDate: ${appointmentDate || '15 August 2026'}\nTime: ${appointmentTime || '10:30 AM'}\nConsultation Fee: $${selectedConsultationFee}\nService Charge: $${serviceCharge}\nTotal Amount: $${totalPay}\n\nPatient Name: ${patientName}\nEmail: ${patientEmail}\nPayment Method: ${paymentMethod}\nStatus: Confirmed & Paid\n`;

    // Trigger invoice download
    const blob = new Blob([invoiceText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDepartment.name.replace(/\s+/g, '_')}_appointment_invoice.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast.success('Payment confirmed — invoice downloaded and confirmation sent.');

    // Redirect to receipt / payment confirmation page
    navigate(`/payment?appointment_id=${selectedDepartment.id * 100 + 1}`);

    // Reset selection
    setSelectedDepartment(null);
    setPatientName('');
    setPatientEmail('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* 1. Hero Section */}
      <section className="bg-[#0F172A] text-white py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0F4C81] rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#16A3A8] rounded-full blur-[100px] opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-poppins font-bold"
          >
            {t('departments.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            {t('departments.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* 2. Search & Filter Section */}
      <section className="py-8 container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between border border-slate-100">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder={t('departments.searchPlaceholder')} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#16A3A8] focus:outline-none bg-slate-50 text-sm"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Filter className="text-gray-400 mr-2 hidden md:block" size={20} />
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat ? 'bg-[#0F4C81] text-white shadow-md' : 'bg-slate-100 text-gray-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Departments List / Cards */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepts.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div 
                key={dept.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[22px] border border-slate-200 shadow-soft overflow-hidden hover:shadow-2xl transition-all flex flex-col group"
              >
                {/* Department High-Res Image Header */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={dept.image} 
                    alt={dept.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white flex justify-between items-end">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-[#16A3A8] text-[10px] font-extrabold uppercase rounded-full tracking-wider mb-1">
                        {dept.category}
                      </span>
                      <h3 className="text-2xl font-poppins font-bold text-white">{dept.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/90 text-[#0F4C81] flex items-center justify-center shrink-0 shadow-md">
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col gap-4">
                  <p className="text-gray-600 text-xs leading-relaxed">{dept.desc}</p>
                  
                  {(() => {
                    const deptDocs = doctorsList.filter(d => 
                      (d.department_name && d.department_name.toLowerCase() === dept.name.toLowerCase()) || 
                      String(d.department_id) === String(dept.id)
                    );
                    const headName = deptDocs[0] ? deptDocs[0].name : dept.head;
                    const headExp = deptDocs[0] ? `${deptDocs[0].experience}+ Yrs` : dept.exp;

                    return (
                      <div className="bg-slate-50 rounded-xl p-4 text-xs flex flex-col gap-2.5 border border-slate-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-[#0F4C81]" />
                            <span className="font-semibold text-[#0F172A]">{headName}</span>
                            <span className="text-gray-500">({headExp})</span>
                          </div>
                          {deptDocs.length > 0 && (
                            <span className="bg-[#16A3A8]/10 text-[#16A3A8] px-2 py-0.5 rounded-full font-bold text-[10px]">
                              {deptDocs.length} Specialist{deptDocs.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="flex items-start gap-2">
                          <ShieldCheck size={16} className="text-[#22C55E] shrink-0 mt-0.5" />
                          <div className="text-gray-600 font-medium">{dept.services.join(' • ')}</div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  <div className="flex items-center justify-between text-xs mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-slate-500 font-medium">
                      <Clock size={14} className="text-[#16A3A8]" />
                      <span>{dept.hours}</span>
                    </div>
                    {dept.emergency && (
                      <div className="flex items-center gap-1 text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                        <Activity size={14} />
                        <span>24/7 Emergency</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex gap-2">
                  <button 
                    onClick={() => handleSelectDepartment(dept)} 
                    className="btn-primary py-2.5 w-full text-xs justify-center"
                  >
                    <Calendar size={14} /> {t('departments.selectAndConsult')} (${departmentFees[dept.name] || 100})
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {filteredDepts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <h3 className="text-2xl font-poppins text-gray-400">{t('departments.noDepartmentsFound')}</h3>
            <button onClick={() => { setSearch(''); setFilter('All'); }} className="btn-primary py-2 px-6 text-xs inline-flex">
              {t('departments.resetFilters')}
            </button>
          </div>
        )}
      </section>

      {/* 4. Interactive Selected Department Payment & Booking Section */}
      {selectedDepartment && (
        <section id="department-payment-section" className="py-12 container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr]">
            <div className="space-y-6">
              
              {/* Selected Department Card Header */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft space-y-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={selectedDepartment.image} 
                    alt={selectedDepartment.name} 
                    className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#16A3A8] font-bold">{t('departments.selectedClinicalDepartment')}</p>
                    <h2 className="text-3xl font-poppins font-bold text-[#0F172A] mt-1">{selectedDepartment.name} {t('departments.wing')}</h2>
                    <p className="mt-2 text-xs text-gray-600">{t('departments.headSpecialist')} <span className="font-bold text-[#0F4C81]">{selectedDoctor}</span></p>
                    <p className="text-xs text-gray-500">{t('departments.service')} <span className="font-semibold text-[#0F172A]">{selectedService}</span></p>
                  </div>
                </div>
              </div>

              {/* Consultation Charges */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft space-y-6">
                <h3 className="text-xl font-bold text-[#0F172A]">{t('departments.consultationTierPackages')}</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {consultationTypes.map((item) => (
                    <div 
                      key={item.key} 
                      className={`rounded-2xl border p-5 transition-all ${selectedConsultation === item.key ? 'border-[#0F4C81] bg-blue-50/60 shadow-md' : 'border-slate-200 bg-slate-50'}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500">{item.key}</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A] font-poppins">${item.price}</p>
                        </div>
                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${selectedConsultation === item.key ? 'bg-[#0F4C81] text-white' : 'bg-slate-200 text-slate-500'}`}>✓</span>
                      </div>
                      <ul className="mt-4 space-y-1.5 text-xs text-gray-600">
                        {item.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-1.5">
                            <span className="mt-0.5 text-[#16A3A8] font-bold">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => setSelectedConsultation(item.key)}
                        className={`mt-4 w-full rounded-xl py-2.5 text-xs font-bold transition ${selectedConsultation === item.key ? 'bg-[#0F4C81] text-white' : 'bg-white text-[#0F172A] border border-gray-300 hover:border-[#0F4C81]'}`}
                      >
                        {selectedConsultation === item.key ? t('departments.selected') : t('departments.choosePackage')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Standard Rates */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft space-y-4">
                <h3 className="text-xl font-bold text-[#0F172A]">{t('departments.departmentConsultationStandardSchedule')}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                        <th className="py-2.5">{t('departments.department')}</th>
                        <th className="py-2.5 text-right">{t('departments.standardConsultationFee')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(departmentFees).map(([dept, fee]) => (
                        <tr key={dept} className="hover:bg-slate-50">
                          <td className="py-3 font-semibold text-[#0F172A]">{dept}</td>
                          <td className="py-3 text-right font-bold text-[#22C55E]">${fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column: Checkout & Payment Form */}
            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft space-y-6">
                <h3 className="text-xl font-bold text-[#0F172A]">{t('departments.instantBookingPayment')}</h3>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.paymentCategory')}</label>
                    <select
                      value={paymentCategory}
                      onChange={(e) => {
                        const category = e.target.value;
                        setPaymentCategory(category);
                        setPaymentMethod(paymentMethodsByCategory[category][0]);
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 focus:outline-none focus:border-[#0F4C81] text-sm"
                    >
                      {Object.keys(paymentMethodsByCategory).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.paymentMethod')}</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 focus:outline-none focus:border-[#0F4C81] text-sm"
                    >
                      {paymentMethodsByCategory[paymentCategory].map((method) => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>

                  {paymentCategory === 'Insurance Payment' && (
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.insuranceProvider')}</label>
                        <input
                          value={insuranceProvider}
                          onChange={(e) => setInsuranceProvider(e.target.value)}
                          type="text"
                          placeholder="e.g. Cigna / Allianz"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus:outline-none focus:border-[#0F4C81]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.policyNumber')}</label>
                        <input
                          value={policyNumber}
                          onChange={(e) => setPolicyNumber(e.target.value)}
                          type="text"
                          placeholder="Policy ID #12345"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus:outline-none focus:border-[#0F4C81]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.appointmentDate')}</label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus:outline-none focus:border-[#0F4C81]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.appointmentTime')}</label>
                      <input
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus:outline-none focus:border-[#0F4C81]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.patientName')}</label>
                      <input
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        type="text"
                        placeholder="John Silva"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus:outline-none focus:border-[#0F4C81]"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-bold text-slate-700 uppercase">{t('departments.patientEmail')}</label>
                      <input
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        type="email"
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 focus:outline-none focus:border-[#0F4C81]"
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                    <h4 className="font-bold text-[#0F172A] text-sm border-b pb-2">{t('departments.paymentBreakdown')}</h4>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between"><span>{t('departments.department')}:</span><span className="font-bold text-[#0F172A]">{selectedDepartment.name}</span></div>
                      <div className="flex justify-between"><span>{t('departments.headSpecialist')}</span><span className="font-semibold">{selectedDoctor}</span></div>
                      <div className="flex justify-between"><span>{t('departments.tier')}</span><span className="font-semibold">{selectedConsultation}</span></div>
                      <div className="flex justify-between"><span>{t('departments.consultationFee')}</span><span>${selectedConsultationFee}</span></div>
                      <div className="flex justify-between"><span>{t('departments.hospitalAdminFee')}</span><span>${serviceCharge}</span></div>
                      <div className="flex justify-between text-base font-extrabold text-[#22C55E] pt-2 border-t border-slate-200">
                        <span>{t('departments.totalDue')}</span><span>${totalPay}</span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn-accent w-full py-3.5 text-sm font-bold justify-center shadow-lg">
                    <Download size={16} /> {t('departments.confirmDownloadInvoice')} (${totalPay})
                  </button>
                </form>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft space-y-3">
                <h3 className="font-bold text-[#0F172A] text-sm">{t('departments.securityGuarantee')}</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {['256-Bit SSL Encrypted Payment', 'Instant Digital PDF Invoice', 'Cashless Claim Verification Support'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#22C55E] flex items-center justify-center font-bold text-[10px]">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 5. Why Choose Us */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-poppins font-bold text-[#0F172A]">{t('departments.whyChooseUs')}</h2>
            <p className="text-gray-600 text-sm">{t('departments.whyChooseUsSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Experienced Doctors", icon: Users, desc: "150+ board-certified medical specialists." },
              { title: "Modern Equipment", icon: Activity, desc: "3D Cath Lab & robotic surgery suites." },
              { title: "Quality Patient Care", icon: Heart, desc: "Compassionate and personalized care." },
              { title: "24/7 Emergency Service", icon: ShieldCheck, desc: "Immediate trauma response unit." }
            ].map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-[#0F4C81] hover:text-white transition-all duration-300 group shadow-sm"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:text-[#16A3A8] text-[#0F4C81] transition-colors">
                    <FeatureIcon size={28} />
                  </div>
                  <h3 className="text-lg font-bold font-poppins mb-1">{feature.title}</h3>
                  <p className="text-gray-500 group-hover:text-slate-200 text-xs">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Book Appointment CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white text-center">
        <div className="container mx-auto px-4 space-y-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-poppins font-extrabold">{t('departments.needConsultation')}</h2>
          <p className="text-blue-100 text-sm max-w-xl mx-auto">
            {t('departments.scheduleVisit')}
          </p>
          <Link to="/appointment" className="btn-secondary inline-flex py-3.5 px-8 text-base bg-white text-[#0F4C81] hover:bg-slate-100 font-bold border-none shadow-xl">
            {t('departments.bookAppointmentNow')}
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Departments;
