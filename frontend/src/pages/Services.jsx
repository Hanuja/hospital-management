import React, { useState, useEffect } from 'react';
import { Search, Filter, ShieldAlert, Activity, Heart, Microscope, Pill, Truck, Clock, CheckCircle2, Calendar, Star, MapPin, DollarSign, Stethoscope, Award, Download, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceModal from '../components/ServiceModal';
import InsuranceModal from '../components/InsuranceModal';
import { getDoctors } from '../services/api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilterTag, setSelectedFilterTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeService, setActiveService] = useState(null);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    fetchDocs();
  }, []);

  const categories = [
    { name: 'All', icon: Activity },
    { name: 'Emergency & Critical Care', icon: ShieldAlert },
    { name: 'Medical Consultation', icon: Stethoscope },
    { name: 'Diagnostics & Laboratory', icon: Microscope },
    { name: 'Pharmacy', icon: Pill },
    { name: 'Imaging & Radiology', icon: Activity },
    { name: 'Specialized Care', icon: Heart },
    { name: 'Maternity & Pediatrics', icon: Heart },
    { name: 'Rehabilitation', icon: Activity },
    { name: 'Home Healthcare', icon: Heart },
  ];

  const filterTags = [
    'All',
    'Emergency',
    'Diagnostics',
    'Surgery',
    'Pharmacy',
    'Specialist Care',
    'Rehabilitation',
    '24/7 Available',
    'Available Today',
    'Insurance Accepted'
  ];

  const servicesList = [
    {
      id: 1,
      title: '24/7 Emergency & Trauma Care',
      category: 'Emergency & Critical Care',
      department: 'Emergency Medicine',
      desc: 'Immediate medical attention for critical, trauma, cardiac, and emergency conditions.',
      icon: ShieldAlert,
      img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
      availability: '24/7 Available',
      status: 'Available 24/7',
      statusColor: 'bg-red-600 text-white animate-pulse',
      location: 'Emergency Trauma Unit, Ground Floor',
      startingPrice: 'LKR 5,000 / $50',
      isEmergency: true,
      specialistCount: 12,
      rating: 4.9,
      reviews: 310
    },
    {
      id: 2,
      title: 'Specialist Medical Consultation (OPD)',
      category: 'Medical Consultation',
      department: 'General Medicine',
      desc: 'Expert consultations across 30+ medical specialties with minimal waiting times.',
      icon: Stethoscope,
      img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      availability: 'Mon - Sat: 8:00 AM - 8:00 PM',
      status: 'Available Today',
      statusColor: 'bg-emerald-600 text-white',
      location: 'OPD Specialist Wing, 2nd Floor',
      startingPrice: 'LKR 7,500 / $75',
      isEmergency: false,
      specialistCount: 45,
      rating: 4.9,
      reviews: 245
    },
    {
      id: 3,
      title: 'Intensive Care Unit (ICU & CCU)',
      category: 'Emergency & Critical Care',
      department: 'Critical Care',
      desc: 'Advanced 24/7 bedside ventilator monitoring, isolation beds, and 1:1 nursing.',
      icon: Heart,
      img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      availability: '24/7 Dedicated Care',
      status: 'Available 24/7',
      statusColor: 'bg-red-600 text-white',
      location: 'ICU Wing, 4th Floor',
      startingPrice: 'Contact for Pricing',
      isEmergency: true,
      specialistCount: 15,
      rating: 4.95,
      reviews: 180
    },
    {
      id: 4,
      title: 'ISO Automated Pathology Laboratory',
      category: 'Diagnostics & Laboratory',
      department: 'Pathology',
      desc: 'ISO 9001 certified automated blood chemistry, hematology, and fast digital reports.',
      icon: Microscope,
      img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      availability: '24/7 Sample Collection',
      status: 'Available Today',
      statusColor: 'bg-emerald-600 text-white',
      location: 'Diagnostic Lab, 1st Floor',
      startingPrice: 'LKR 2,500 / $25',
      isEmergency: false,
      specialistCount: 20,
      rating: 4.88,
      reviews: 520
    },
    {
      id: 5,
      title: '24/7 Inpatient & OPD Pharmacy',
      category: 'Pharmacy',
      department: 'Pharmaceuticals',
      desc: 'Fully stocked genuine prescription pharmaceuticals, pediatric syrups, and oncology meds.',
      icon: Pill,
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      availability: '24 Hours Open',
      status: 'Available 24/7',
      statusColor: 'bg-emerald-600 text-white',
      location: 'Main Lobby & Hospital Entrance',
      startingPrice: 'Standard Prescription Rates',
      isEmergency: false,
      specialistCount: 8,
      rating: 4.92,
      reviews: 640
    },
    {
      id: 6,
      title: '3T MRI & 128-Slice CT Radiology',
      category: 'Imaging & Radiology',
      department: 'Radiology',
      desc: 'High-definition 3T MRI, 128-slice CT scan, color Doppler ultrasound, and digital X-ray.',
      icon: Activity,
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      availability: '24/7 Radiology Desk',
      status: 'Available Today',
      statusColor: 'bg-emerald-600 text-white',
      location: 'Imaging Centre, Basement 1',
      startingPrice: 'LKR 18,000 / $120',
      isEmergency: true,
      specialistCount: 10,
      rating: 4.93,
      reviews: 290
    },
    {
      id: 7,
      title: '24/7 Mobile ICU Ambulance',
      category: 'Emergency & Critical Care',
      department: 'Emergency Medicine',
      desc: 'High-speed emergency ambulances equipped with life-support, oxygen, and paramedics.',
      icon: Truck,
      img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
      availability: '24/7 Instant Dispatch',
      status: 'Available 24/7',
      statusColor: 'bg-red-600 text-white animate-pulse',
      location: 'Ambulance Bay',
      startingPrice: 'LKR 6,000 / $40',
      isEmergency: true,
      specialistCount: 14,
      rating: 4.98,
      reviews: 410
    },
    {
      id: 8,
      title: 'Comprehensive Cancer & Chemotherapy Care',
      category: 'Specialized Care',
      department: 'Oncology',
      desc: 'Linear accelerator radiation, day-care chemotherapy, and surgical oncology.',
      icon: Heart,
      img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      availability: 'Mon - Fri: 8:00 AM - 5:00 PM',
      status: 'Limited Availability',
      statusColor: 'bg-amber-600 text-white',
      location: 'Oncology Centre, 5th Floor',
      startingPrice: 'Contact for Pricing',
      isEmergency: false,
      specialistCount: 8,
      rating: 4.96,
      reviews: 195
    },
    {
      id: 9,
      title: 'Maternity Suites & Childbirth Care',
      category: 'Maternity & Pediatrics',
      department: 'Gynecology',
      desc: 'Painless labor suites, high-risk pregnancy monitoring, and luxury private recovery rooms.',
      icon: Heart,
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      availability: '24/7 Maternity Unit',
      status: 'Available 24/7',
      statusColor: 'bg-emerald-600 text-white',
      location: 'Maternity Wing, 3rd Floor',
      startingPrice: 'LKR 45,000 / $300',
      isEmergency: true,
      specialistCount: 12,
      rating: 4.97,
      reviews: 380
    },
    {
      id: 10,
      title: 'Post-Op Rehabilitation & Physiotherapy',
      category: 'Rehabilitation',
      department: 'Orthopedics',
      desc: 'Post-operative joint rehab, stroke recovery, electrotherapy, and sports injury care.',
      icon: Activity,
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      availability: 'Mon - Sat: 8:00 AM - 6:00 PM',
      status: 'Available Today',
      statusColor: 'bg-emerald-600 text-white',
      location: 'Rehab Centre, 2nd Floor',
      startingPrice: 'LKR 4,000 / $30',
      isEmergency: false,
      specialistCount: 6,
      rating: 4.89,
      reviews: 170
    },
    {
      id: 11,
      title: 'Home Healthcare & Nurse Visits',
      category: 'Home Healthcare',
      department: 'Patient Care',
      desc: 'Qualified nurses and lab technicians visiting elderly or bedridden patients at home.',
      icon: Heart,
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      availability: 'On-Demand Booking',
      status: 'Available Today',
      statusColor: 'bg-emerald-600 text-white',
      location: 'Mobile Care Unit',
      startingPrice: 'LKR 5,000 / $35',
      isEmergency: false,
      specialistCount: 15,
      rating: 4.91,
      reviews: 210
    }
  ];

  // Filtering Logic
  const filteredServices = servicesList.filter((srv) => {
    const matchCat = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchSearch = srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        srv.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        srv.desc.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchTag = true;
    if (selectedFilterTag === 'Emergency') matchTag = srv.isEmergency;
    if (selectedFilterTag === 'Diagnostics') matchTag = srv.category.includes('Diagnostics') || srv.category.includes('Imaging');
    if (selectedFilterTag === 'Pharmacy') matchTag = srv.category === 'Pharmacy';
    if (selectedFilterTag === '24/7 Available') matchTag = srv.availability.includes('24/7') || srv.availability.includes('24 Hours');
    if (selectedFilterTag === 'Available Today') matchTag = !srv.availability.includes('Limited');
    if (selectedFilterTag === 'Insurance Accepted') matchTag = true; // All services accept insurance

    return matchCat && matchSearch && matchTag;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">{t('services.platform')}</span>
          <h1 className="text-4xl font-extrabold font-poppins">{t('services.title')}</h1>
          <p className="text-blue-100 text-sm">{t('services.subtitle')}</p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setIsInsuranceModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl border border-white/30 text-xs font-bold backdrop-blur-md transition-colors flex items-center gap-2"
            >
              <ShieldCheck size={16} /> {t('services.checkInsurance')}
            </button>
          </div>
        </div>
      </section>

      {/* 1. Category Filter Tabs */}
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center border-b border-slate-200 pb-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                  isSelected ? 'bg-[#0F4C81] text-white scale-105 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Search & Tag Filters */}
      <section className="container mx-auto px-4 max-w-5xl space-y-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('services.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81] bg-slate-50"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-500">{t('services.filterByStatus')}</span>
            <div className="flex flex-wrap gap-1.5">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedFilterTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    selectedFilterTag === tag ? 'bg-[#16A3A8] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Advanced Service Cards Grid */}
      <section className="container mx-auto px-4">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <Stethoscope size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-bold text-slate-700">{t('services.noServicesFound')}</h3>
            <p className="text-xs text-slate-500">{t('services.noServicesSub')}</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedFilterTag('All'); }}
              className="btn-primary py-2 px-6 text-xs inline-flex"
            >
              {t('services.resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group border-t-4 border-t-[#0F4C81]"
                >
                  <div>
                    {/* Service Image Header */}
                    <div className="h-52 overflow-hidden relative cursor-pointer" onClick={() => setActiveService(srv)}>
                      <img src={srv.img} alt={srv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${srv.statusColor}`}>
                          {srv.status}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-800 flex items-center gap-1 shadow-md">
                        <Star size={12} className="fill-amber-400 text-amber-400" /> {srv.rating} ({srv.reviews})
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                            <Icon size={20} />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-teal-300 uppercase block">{srv.department}</span>
                            <h3 className="text-lg font-bold font-poppins leading-tight text-white">{srv.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 space-y-3 text-xs">
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">{srv.desc}</p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-slate-500">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-1">
                          <Clock size={14} className="text-[#16A3A8]" />
                          <span className="truncate">{srv.availability}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-1">
                          <DollarSign size={14} className="text-[#22C55E]" />
                          <span className="font-bold text-[#22C55E] truncate">{srv.startingPrice}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-[#0F4C81]" /> {srv.location}
                        </span>
                        <span className="font-bold text-[#0F4C81]">{srv.specialistCount} {t('services.specialists')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveService(srv)}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-white text-xs font-bold transition-colors"
                    >
                      {t('services.quickView')}
                    </button>
                    <button
                      onClick={() => navigate(`/appointment?service=${encodeURIComponent(srv.title)}&department=${encodeURIComponent(srv.department)}`)}
                      className="btn-primary py-2.5 px-3 text-xs justify-center font-bold"
                    >
                      {t('services.bookNow')}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Service Quick View Animated Modal */}
      <ServiceModal
        service={activeService}
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        doctors={doctors}
      />

      {/* Insurance Coverage Checker Modal */}
      <InsuranceModal
        isOpen={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
      />

    </div>
  );
};

export default Services;
