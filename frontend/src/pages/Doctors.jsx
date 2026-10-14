import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Star, Calendar, Award, DollarSign, Clock, ShieldCheck, Stethoscope } from 'lucide-react';
import { getDoctors, getDepartments } from '../services/api';
import DoctorModal from '../components/DoctorModal';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedExp, setSelectedExp] = useState('All');
  const [activeDoctor, setActiveDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docs = await getDoctors();
      const depts = await getDepartments();
      setDoctors(docs);
      setDepartments(depts);
    };
    fetchData();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const matchSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.department_name && doc.department_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchDept = selectedDept === 'All' || doc.department_name === selectedDept || doc.department_id === parseInt(selectedDept);
    const matchGender = selectedGender === 'All' || doc.gender === selectedGender;
    const matchExp =
      selectedExp === 'All' ||
      (selectedExp === '10+' && doc.experience >= 10) ||
      (selectedExp === '15+' && doc.experience >= 15);

    return matchSearch && matchDept && matchGender && matchExp;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">{t('doctors.team')}</span>
          <h1 className="text-4xl font-extrabold font-poppins">{t('doctors.title')}</h1>
          <p className="text-blue-100 text-sm">{t('doctors.description')}</p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={t('doctors.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm"
              />
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full py-3 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm bg-white"
              >
                <option value="All">{t('doctors.all_departments')}</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="w-full py-3 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm bg-white"
              >
                <option value="All">{t('doctors.all_experience')}</option>
                <option value="10+">{t('doctors.exp_10_plus')}</option>
                <option value="15+">{t('doctors.exp_15_plus')}</option>
              </select>
            </div>

          </div>

          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>{t('doctors.showing')} <strong>{filteredDoctors.length}</strong> {t('doctors.available_doctors')}</span>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-700">{t('doctors.filter_gender')}</span>
              <button
                onClick={() => setSelectedGender('All')}
                className={`px-3 py-1 rounded-full border transition-colors ${selectedGender === 'All' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
              >
                {t('doctors.gender_all')}
              </button>
              <button
                onClick={() => setSelectedGender('Male')}
                className={`px-3 py-1 rounded-full border transition-colors ${selectedGender === 'Male' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
              >
                {t('doctors.gender_male')}
              </button>
              <button
                onClick={() => setSelectedGender('Female')}
                className={`px-3 py-1 rounded-full border transition-colors ${selectedGender === 'Female' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
              >
                {t('doctors.gender_female')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Cards Directory Grid */}
      <section className="container mx-auto px-4">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <Stethoscope size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-bold text-slate-700">{t('doctors.no_match')}</h3>
            <p className="text-slate-500 text-sm">{t('doctors.reset_hint')}</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDept('All'); setSelectedGender('All'); setSelectedExp('All'); }}
              className="btn-primary py-2.5 px-6 text-xs inline-flex"
            >
              {t('doctors.reset_filters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
                
                <div>
                  <div className="h-64 overflow-hidden relative cursor-pointer group" onClick={() => setActiveDoctor(doc)}>
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-800 flex items-center gap-1 shadow-md">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {doc.rating}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#0F4C81]/90 text-white px-3 py-1 rounded-lg text-xs font-bold">
                      {doc.department_name || t('doctors.specialist')}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-[#0F172A] hover:text-[#0F4C81] cursor-pointer" onClick={() => setActiveDoctor(doc)}>
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#16A3A8]">{doc.qualification}</p>
                    <p className="text-xs text-slate-500">{doc.specialization}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5 text-slate-700">
                        <Award size={14} className="text-[#0F4C81]" />
                        <span><strong>{doc.experience}</strong> {t('doctors.yrs_exp')}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5 text-slate-700">
                        <DollarSign size={14} className="text-[#22C55E]" />
                        <span>{t('doctors.fee')}: <strong>${doc.consultation_fee}</strong></span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                      <Clock size={14} className="text-[#16A3A8]" />
                      <span>{doc.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveDoctor(doc)}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-white text-xs font-bold transition-colors"
                  >
                    {t('doctors.view_profile')}
                  </button>
                  <button
                    onClick={() => navigate(`/appointment?doctor_id=${doc.id}`)}
                    className="btn-primary py-2.5 px-3 text-xs justify-center"
                  >
                    <Calendar size={14} /> {t('doctors.book_appt')}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Doctor Quick View Modal */}
      <DoctorModal
        doctor={activeDoctor}
        isOpen={!!activeDoctor}
        onClose={() => setActiveDoctor(null)}
      />

    </div>
  );
};

export default Doctors;
