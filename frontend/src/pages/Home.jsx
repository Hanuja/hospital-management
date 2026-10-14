import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Calendar, UserCheck, ShieldAlert, Award, Activity, Heart, ArrowRight, Star, Clock, CheckCircle2, ChevronRight, Stethoscope, Microscope, Pill, Building, Users } from 'lucide-react';
import { getDoctors, getDepartments, getPackages, getTestimonials } from '../services/api';
import DoctorModal from '../components/DoctorModal';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const docs = await getDoctors();
      const depts = await getDepartments();
      const pkgs = await getPackages();
      const tests = await getTestimonials();
      setDoctors(docs.slice(0, 4));
      setDepartments(depts.slice(0, 8));
      setPackages(pkgs.slice(0, 3));
      setTestimonials(tests);
    };
    loadData();
  }, []);

  const stats = [
    { label: t('home.stat_years'), value: '25+', icon: Award },
    { label: t('home.stat_doctors'), value: '150+', icon: UserCheck },
    { label: t('home.stat_departments'), value: '30+', icon: Activity },
    { label: t('home.stat_patients'), value: '100K+', icon: Users },
  ];

  const quickServices = [
    { title: t('home.qs_emergency_title'), desc: t('home.qs_emergency_desc'), icon: ShieldAlert, color: 'bg-red-50 text-red-600 border-red-200', link: '/services' },
    { title: t('home.qs_find_title'), desc: t('home.qs_find_desc'), icon: Stethoscope, color: 'bg-blue-50 text-[#0F4C81] border-blue-200', link: '/doctors' },
    { title: t('home.qs_book_title'), desc: t('home.qs_book_desc'), icon: Calendar, color: 'bg-teal-50 text-[#16A3A8] border-teal-200', link: '/appointment' },
    { title: t('home.qs_health_title'), desc: t('home.qs_health_desc'), icon: Activity, color: 'bg-emerald-50 text-[#22C55E] border-emerald-200', link: '/health-packages' },
    { title: t('home.qs_lab_title'), desc: t('home.qs_lab_desc'), icon: Microscope, color: 'bg-purple-50 text-purple-600 border-purple-200', link: '/services' },
    { title: t('home.qs_pharmacy_title'), desc: t('home.qs_pharmacy_desc'), icon: Pill, color: 'bg-amber-50 text-amber-600 border-amber-200', link: '/services' },
  ];

  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#EFF6FF] via-white to-[#F8FAFC] pt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#F0FDFA] border border-[#16A3A8]/30 px-4 py-2 rounded-full text-[#16A3A8] text-xs font-extrabold uppercase tracking-wider">
                <ShieldAlert size={16} /> {t('home.hero_tag')}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight font-poppins">
                {t('home.hero_title_1')} <br />
                <span className="text-[#0F4C81]">{t('home.hero_title_2')}</span> <span className="text-[#16A3A8]">{t('home.hero_title_3')}</span>
              </h1>

              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                {t('home.hero_desc')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/appointment" className="btn-primary py-4 px-8 text-base">
                  <Calendar size={20} />
                  {t('home.btn_book')}
                </Link>
                <Link to="/doctors" className="btn-secondary py-4 px-8 text-base">
                  <Stethoscope size={20} />
                  {t('home.btn_explore')}
                </Link>
              </div>

              {/* Emergency Highlight Card */}
              <div className="pt-4">
                <div className="bg-white border-2 border-red-100 shadow-soft p-5 rounded-2xl flex items-center justify-between gap-4 max-w-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold shadow-md animate-pulse">
                      <Phone size={24} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">{t('home.emergency_care')}</span>
                      <a href="tel:+94112345678" className="text-xl font-extrabold text-[#0F172A] hover:text-[#0F4C81] transition-colors">
                        +94 11 234 5678
                      </a>
                    </div>
                  </div>
                  <a href="tel:+94119999999" className="text-xs font-bold text-red-600 underline">{t('home.direct_hotline')}</a>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Visual Banner */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://i.pinimg.com/1200x/e3/bf/a4/e3bfa43b8709a3a2ae9f054414d3fd85.jpg"
                  alt="MediCare Plus Modern Healthcare"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22C55E] text-white rounded-full flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">{t('home.jci_title')}</h4>
                      <p className="text-xs text-slate-500">{t('home.jci_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICE CARDS */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-[#16A3A8] uppercase tracking-widest">{t('home.rapid_access')}</span>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">{t('home.core_services')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.title}
                whileHover={{ y: -5 }}
                className="card-premium flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${srv.color}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">{srv.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-6">
                  <Link to={srv.link} className="text-[#0F4C81] font-bold text-sm hover:text-[#16A3A8] inline-flex items-center gap-2 group">
                    {t('home.explore_service')} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. ABOUT HOSPITAL & STATS COUNTER */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('home.medical_excellence_tag')}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">
                {t('home.hospital_title')}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {t('home.hospital_desc')}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#22C55E]" size={20} />
                  <span className="text-sm font-semibold text-slate-700">{t('home.feat_ambulance')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#22C55E]" size={20} />
                  <span className="text-sm font-semibold text-slate-700">{t('home.feat_robotic')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#22C55E]" size={20} />
                  <span className="text-sm font-semibold text-slate-700">{t('home.feat_insurance')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#22C55E]" size={20} />
                  <span className="text-sm font-semibold text-slate-700">{t('home.feat_iso')}</span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/about" className="btn-primary inline-flex py-3 px-6 text-sm">
                  {t('home.btn_read_history')}
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((st) => {
                const Icon = st.icon;
                return (
                  <div key={st.label} className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-2xl text-center space-y-2 hover:border-[#16A3A8] transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl mx-auto flex items-center justify-center text-[#0F4C81] shadow-sm">
                      <Icon size={24} />
                    </div>
                    <div className="text-3xl font-extrabold text-[#0F172A] font-poppins">{st.value}</div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{st.label}</div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. MEDICAL EXCELLENCE — SPECIALIZED CLINICAL DEPARTMENTS */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#16A3A8] uppercase tracking-widest">{t('home.med_excellence')}</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">{t('home.specialized_dept')}</h2>
          </div>
          <Link to="/departments" className="btn-secondary py-2.5 px-5 text-sm">
            {t('home.view_all_dept')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="card-premium p-5 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="h-44 rounded-xl overflow-hidden relative shadow-sm">
                  <img 
                    src={dept.image} 
                    alt={dept.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-[#0F4C81] shadow-md">
                    {dept.name}
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{dept.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-semibold text-[#16A3A8]">{t('home.expert_consultants')}</span>
                <Link to={`/departments`} className="text-xs font-bold text-[#0F4C81] hover:underline flex items-center gap-1">
                  {t('home.book_dept')} <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED DOCTORS */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('home.board_certified')}</span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{t('home.featured_doctors')}</h2>
            </div>
            <Link to="/doctors" className="btn-primary py-2.5 px-5 text-sm">
              {t('home.search_doctors')}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
                <div>
                  <div className="h-56 overflow-hidden relative cursor-pointer" onClick={() => setSelectedDoctor(doc)}>
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 flex items-center gap-1 shadow-sm">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {doc.rating}
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold text-[#16A3A8] uppercase tracking-wider block">{doc.department_name || doc.specialization}</span>
                    <h3 className="text-lg font-bold text-[#0F172A] hover:text-[#0F4C81] cursor-pointer" onClick={() => setSelectedDoctor(doc)}>
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500">{doc.qualification}</p>
                    <p className="text-xs text-slate-600 font-medium">{t('home.fee')} <strong className="text-[#22C55E]">${doc.consultation_fee}</strong> | {doc.experience} {t('home.yrs_exp')}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="w-full py-2 px-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-white transition-colors"
                  >
                    {t('home.view_profile')}
                  </button>
                  <button
                    onClick={() => navigate(`/appointment?doctor_id=${doc.id}`)}
                    className="w-full py-2 px-2 text-xs font-semibold rounded-lg bg-[#0F4C81] text-white hover:bg-[#0A3860] transition-colors"
                  >
                    {t('home.book_now')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HEALTH PACKAGES */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest">{t('home.preventive_health')}</span>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">{t('home.health_packages')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="card-premium flex flex-col justify-between border-t-4 border-t-[#0F4C81]">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-50 text-[#0F4C81] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {t('home.age_group')} {pkg.age_group}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{t('home.starting_from')}</span>
                    <span className="text-2xl font-extrabold text-[#0F4C81] font-poppins">${pkg.price}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A]">{pkg.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pkg.description}</p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <p className="font-bold text-slate-700">{t('home.includes_tests')}</p>
                  <p className="text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl">{pkg.tests}</p>
                </div>
              </div>

              <div className="pt-6">
                <Link to={`/appointment?package_id=${pkg.id}`} className="btn-primary w-full text-sm text-center justify-center">
                  {t('home.book_package')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PATIENT TESTIMONIALS */}
      <section className="bg-[#0F4C81] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#16A3A8] uppercase tracking-widest">{t('home.verified_reviews')}</span>
            <h2 className="text-3xl font-extrabold text-white">{t('home.what_patients_say')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col justify-between text-slate-100">
                <div className="space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed italic">"{t.testimonial}"</p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-4">
                  <img src={t.patient_photo} alt={t.patient_name} className="w-10 h-10 rounded-full object-cover border-2 border-[#16A3A8]" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.patient_name}</h4>
                    <p className="text-[11px] text-slate-300">{t.treatment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] rounded-3xl p-10 md:p-14 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">{t('home.health_priority')}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-poppins">{t('home.ready_to_consult')}</h2>
            <p className="text-blue-100 text-sm">{t('home.schedule_desc')}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/appointment" className="bg-white text-[#0F4C81] hover:bg-slate-100 font-bold px-8 py-4 rounded-xl shadow-lg transition-colors text-sm">
              {t('home.btn_book')}
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-colors text-sm">
              {t('home.contact_us')}
            </Link>
          </div>
        </div>
      </section>

      {/* Doctor Quick View Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />

    </div>
  );
};

export default Home;
