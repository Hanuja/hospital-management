import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Brain, Bone, Baby, Eye, Activity, ShieldCheck, Sparkles, Stethoscope, 
  Phone, X, Search, Filter, Clock, CheckCircle2, ChevronRight, Award, Users, ChevronDown, Download
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TreatmentModal from '../components/TreatmentModal';
import TreatmentCompareModal from '../components/TreatmentCompareModal';
import { getDoctors } from '../services/api';
import toast from 'react-hot-toast';

const treatmentsData = [
  {
    id: 1,
    title: 'Cardiology',
    subtitle: 'Heart Care & Vascular Surgery',
    icon: Heart,
    category: 'Cardiology',
    description: 'Advanced heart disease treatment, angioplasty, bypass surgery, and 24/7 cardiac emergency care led by senior cardiologists.',
    services: ['Heart disease diagnosis', 'Angioplasty & Stenting', 'ECG & ECHO monitoring', 'Cardiac bypass surgery', 'Preventive heart care'],
    benefits: ['Early non-invasive diagnosis', 'Minimally invasive stenting', 'Safe ICU recovery support', 'Experienced cardiac specialists'],
    recovery: 'Most angioplasty patients recover within 1 to 2 days; bypass surgery requires 5 to 7 days in-ward monitoring.',
    image: 'https://i.pinimg.com/1200x/27/7f/89/277f89c8acebda4c270a4affabc1267f.jpg',
    isEmergency: true
  },
  {
    id: 2,
    title: 'Neurology',
    subtitle: 'Brain & Spine Care',
    icon: Brain,
    category: 'Neurology',
    description: 'Expert neurosurgical and medical care for stroke intervention, brain tumors, epilepsy, and spinal cord disorders.',
    services: ['Stroke acute thrombolysis', 'Brain tumor microsurgery', 'Spine disc treatment', 'Neurological EEG testing', 'Stroke rehab support'],
    benefits: ['Advanced neuronavigation', 'Personalized neuro-care plans', 'Comprehensive physical rehab', 'Board-certified neurologists'],
    recovery: 'Recovery varies from 3 days for diagnostic neuro-procedures to 2 weeks for complex brain/spine surgeries.',
    image: 'https://i.pinimg.com/736x/1a/a9/60/1aa96000bb95e662d532da4e5fe0053b.jpg',
    isEmergency: true
  },
  {
    id: 3,
    title: 'Orthopedics',
    subtitle: 'Bone & Joint Care',
    icon: Bone,
    category: 'Orthopedics',
    description: 'Comprehensive orthopedic solutions for robotic knee replacements, fracture trauma, spine alignment, and sports injuries.',
    services: ['Robotic joint replacement', 'Keyhole arthroscopy surgery', 'Fracture fixation', 'Spinal fusion surgery', 'Physiotherapy support'],
    benefits: ['Pain relief & mobility', 'Faster post-op rehabilitation', '3D computer-guided surgeries', 'Dedicated physical therapy team'],
    recovery: 'Patients typically resume walking within 24 to 48 hours post-robotic joint replacement with physical rehab.',
    image: 'https://i.pinimg.com/1200x/4e/d6/f6/4ed6f6c314361673eb16fe1aad86b3d7.jpg',
    isEmergency: false
  },
  {
    id: 4,
    title: 'Cancer Care',
    subtitle: 'Oncology Department',
    icon: Activity,
    category: 'Oncology',
    description: 'Comprehensive cancer diagnosis, day-care chemotherapy, linear accelerator radiation, and surgical oncology care.',
    services: ['Day-care chemotherapy', 'Targeted radiation therapy', 'PET-CT cancer screening', 'Tumor resection surgery', 'Oncology consultation'],
    benefits: ['Personalized oncology protocols', 'Spare healthy tissue radiation', 'Experienced cancer specialists', 'Compassionate palliative support'],
    recovery: 'Outpatient chemotherapy sessions take 2-4 hours; surgical recovery depends on tumor stage and location.',
    image: 'https://i.pinimg.com/1200x/98/18/7a/98187acfd521f3e2e3cc99527043b1c0.jpg',
    isEmergency: true
  },
  {
    id: 5,
    title: 'Pediatrics',
    subtitle: 'Children’s & Neonatal Health',
    icon: Baby,
    category: 'Pediatrics',
    description: 'Specialized, gentle healthcare for infants, children, and newborns including neonatal intensive care (NICU).',
    services: ['Routine child health checkups', 'Pediatric vaccinations', 'Neonatal ICU care', 'Pediatric surgery', 'Growth & nutrition tracking'],
    benefits: ['Child-friendly atmosphere', 'Early developmental diagnosis', 'Parent guidance & support', '24/7 pediatric emergency staff'],
    recovery: 'Most pediatric consultations and minor treatments are outpatient with rapid recovery.',
    image: 'https://i.pinimg.com/736x/e7/be/b9/e7beb9b51953f5f17d7b8e174610a527.jpg',
    isEmergency: true
  },
  {
    id: 6,
    title: 'Gynecology',
    subtitle: 'Women’s Health & Maternity',
    icon: Activity,
    category: 'Women’s Health',
    description: 'Complete women’s healthcare services including high-risk pregnancy care, IVF treatment, and laparoscopic surgery.',
    services: ['Maternity & delivery support', 'IVF & fertility care', 'Women wellness screening', 'Laparoscopic Gynae surgery', 'Postnatal recovery care'],
    benefits: ['Holistic maternity care', 'Private luxury recovery suites', 'Expert female obstetricians', 'Compassionate family guidance'],
    recovery: 'Normal deliveries require 1-2 days stay; laparoscopic procedures allow discharge within 24 hours.',
    image: 'https://i.pinimg.com/1200x/36/26/89/36268912b7ce777e1826a248129c4442.jpg',
    isEmergency: true
  },
  {
    id: 7,
    title: 'Eye Care',
    subtitle: 'Vision & LASIK Care',
    icon: Eye,
    category: 'Eye Care',
    description: 'Advanced ophthalmology treatments, cataract surgery, LASIK laser vision correction, and glaucoma management.',
    services: ['Phaco cataract surgery', 'LASIK laser vision correction', 'Glaucoma diagnosis', 'Retinal laser treatment', 'Comprehensive eye exam'],
    benefits: ['Precision laser accuracy', 'Painless outpatient procedures', 'Faster visual recovery', 'Renowned ophthalmologists'],
    recovery: 'Most LASIK and cataract patients experience restored clear vision within 24 hours.',
    image: 'https://i.pinimg.com/236x/5f/f6/06/5ff606264e5bd4e2636653c529867ac5.jpg',
    isEmergency: false
  },
  {
    id: 8,
    title: 'Dental Care',
    subtitle: 'Smile & Oral Surgery',
    icon: Activity,
    category: 'Dental Care',
    description: 'Professional dental procedures including single-visit root canals, dental implants, teeth whitening, and oral surgery.',
    services: ['Microscopic root canal', 'Titanium dental implants', 'Cosmetic teeth whitening', 'Orthodontic braces', 'Wisdom tooth extraction'],
    benefits: ['Pain-free dental anesthesia', 'State-of-the-art laser dental tools', 'Natural-looking implants', 'Same-day emergency dental relief'],
    recovery: 'Dental implant osseointegration takes a few weeks; routine cleanings and fillings require zero downtime.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    isEmergency: false
  },
];

const benefits = [
  { title: 'Expert Specialists', desc: 'Experienced board-certified doctors providing specialized medical care.', icon: Stethoscope },
  { title: 'Advanced Technology', desc: 'Modern robotic and 3D imaging equipment for accurate diagnosis.', icon: Sparkles },
  { title: 'Patient-Centered Care', desc: 'Safe, comfortable, and compassionate healthcare environment.', icon: ShieldCheck },
  { title: '24/7 Emergency Support', desc: 'Round-the-clock emergency medical assistance and trauma teams.', icon: Phone },
];

const faqs = [
  { q: 'How do I schedule a specialized treatment consultation?', a: 'You can click "Book Appointment" on any treatment card or call our 24/7 hospital desk at +94 11 234 5678. Our patient coordinator will assist you.' },
  { q: 'Are emergency treatment admissions available 24/7?', a: 'Yes! Our Emergency Trauma & Critical Care Unit operates 24 hours a day, 365 days a year with mobile ICU ambulances.' },
  { q: 'Does MediCare Plus accept insurance for treatments?', a: 'We accept direct cashless insurance claims with major providers including Cigna, Allianz, AIA, Ceylon Insurance, SLIC, Softlogic, and Union Assurance.' },
  { q: 'Can I request a second opinion on a surgical treatment?', a: 'Absolutely. We encourage multi-disciplinary second opinions with our senior medical consultants before undergoing elective surgeries.' },
  { q: 'What preparation is needed before diagnostic scans or procedures?', a: 'Preparation varies by treatment. Upon booking, our medical desk will provide clear instructions regarding fasting or medication adjustments.' },
];

const Treatments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilterTag, setSelectedFilterTag] = useState('All');
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    fetchDocs();
  }, []);

  useEffect(() => {
    if (id) {
      const found = treatmentsData.find(
        t => String(t.id) === String(id) || 
             t.title.toLowerCase() === id.toLowerCase() ||
             t.category.toLowerCase() === id.toLowerCase()
      );
      if (found) {
        setSelectedTreatment(found);
      }
    }
  }, [id]);

  const categoriesList = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics', 'Women’s Health', 'Eye Care', 'Dental Care'];

  const toggleCompare = (item) => {
    if (compareItems.some(i => i.id === item.id)) {
      setCompareItems(compareItems.filter(i => i.id !== item.id));
      toast.success(`${item.title} removed from comparison.`);
    } else {
      if (compareItems.length >= 3) {
        toast.error('You can compare a maximum of 3 treatments at once.');
        return;
      }
      setCompareItems([...compareItems, item]);
      toast.success(`${item.title} added to comparison list.`);
    }
  };

  const filteredTreatments = treatmentsData.filter((item) => {
    const matchCat = selectedCategory === 'All' || 
                     item.category.toLowerCase() === selectedCategory.toLowerCase() ||
                     item.title.toLowerCase() === selectedCategory.toLowerCase() ||
                     (selectedCategory.includes('Women') && item.category.includes('Women'));
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchTag = true;
    if (selectedFilterTag === '24/7 Emergency') matchTag = item.isEmergency;
    if (selectedFilterTag === 'Surgery Options') matchTag = item.services.some(s => s.toLowerCase().includes('surgery'));
    if (selectedFilterTag === 'Fast Recovery') matchTag = item.recovery.toLowerCase().includes('day');

    return matchCat && matchSearch && matchTag;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20 space-y-16">
      
      {/* 1. Hero Banner with Breadcrumbs */}
      <section className="bg-gradient-to-r from-[#0F4C81] via-[#0F172A] to-[#16A3A8] text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-4">
          <div className="flex justify-center items-center gap-2 text-xs text-teal-200 font-bold uppercase tracking-wider">
            <Link to="/" className="hover:underline">{t('treatments.home')}</Link> / <span>{t('treatments.treatments')}</span> / <span className="text-white">{selectedCategory}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <ShieldCheck size={16} className="text-[#22C55E]" /> {t('treatments.accredited_badge')}
          </div>

          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold">{t('treatments.hero_title')}</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-200 leading-relaxed">
            {t('treatments.hero_desc')}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/appointment" className="btn-primary py-3 px-8 text-sm font-bold">{t('treatments.book_treatment')}</Link>
            <a href="tel:+94112345678" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white hover:text-[#0F172A] text-sm py-3 px-8 font-bold">
              {t('treatments.call_treatment')}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Stats Counters */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl text-center">
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-[#0F4C81] font-poppins">25+</div>
            <div className="text-xs text-slate-500 font-bold uppercase">{t('treatments.stat_years_exp')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-[#16A3A8] font-poppins">150+</div>
            <div className="text-xs text-slate-500 font-bold uppercase">{t('treatments.stat_doctors')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-[#22C55E] font-poppins">100K+</div>
            <div className="text-xs text-slate-500 font-bold uppercase">{t('treatments.stat_patients')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-amber-600 font-poppins">98%</div>
            <div className="text-xs text-slate-500 font-bold uppercase">{t('treatments.stat_satisfaction')}</div>
          </div>
        </div>
      </section>

      {/* 3. Search Bar & Category Filters */}
      <section className="container mx-auto px-4 max-w-5xl space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('treatments.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81] bg-slate-50"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0F4C81] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Compare Bar Floating Trigger */}
          {compareItems.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex justify-between items-center text-xs">
              <span className="font-bold text-[#0F4C81]">{t('treatments.selected_compare', { count: compareItems.length })}: {compareItems.map(i => i.title).join(', ')}</span>
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="btn-accent py-1.5 px-4 text-xs font-bold"
              >
                {t('treatments.compare_btn')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Treatment Cards Grid */}
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A3A8]">{t('treatments.categories_subtitle')}</p>
          <h2 className="text-3xl font-bold text-[#0F172A] font-poppins">{t('treatments.categories_title')}</h2>
        </div>

        {filteredTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <Stethoscope size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-bold text-slate-700">{t('treatments.no_match')}</h3>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedFilterTag('All'); }}
              className="btn-primary py-2 px-6 text-xs inline-flex"
            >
              {t('treatments.reset_filters')}
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTreatments.map((item, idx) => {
              const IconComponent = item.icon || Heart;
              const isComparing = compareItems.some(i => i.id === item.id);

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group border-t-4 border-t-[#0F4C81]"
                >
                  <div>
                    {/* Clean Image URL */}
                    <div className="h-48 w-full overflow-hidden relative cursor-pointer" onClick={() => setSelectedTreatment(item)}>
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#16A3A8] text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                          {item.category}
                        </span>
                      </div>

                      {item.isEmergency && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold animate-pulse">
                          {t('treatments.emergency_badge')}
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white shrink-0">
                          <IconComponent size={22} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-poppins leading-tight text-white">{item.title}</h3>
                          <p className="text-[11px] font-semibold text-teal-200">{item.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 text-xs">
                      <p className="text-slate-600 line-clamp-3 leading-relaxed">{item.description}</p>

                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="font-bold text-[#0F4C81] block text-[11px]">{t('treatments.procedures_included')}</span>
                        <ul className="space-y-1 text-slate-600">
                          {item.services.slice(0, 3).map((srv) => (
                            <li key={srv} className="flex items-center gap-1.5 truncate">
                              <span className="text-[#16A3A8] font-bold">•</span>
                              <span className="truncate">{srv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-slate-500 font-medium">{t('treatments.est_recovery')}</span>
                        <span className="font-bold text-[#22C55E] truncate">{item.recovery.split(';')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedTreatment(item)}
                        className="py-2 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-white text-xs font-bold transition-colors"
                      >
                        {t('treatments.quick_view')}
                      </button>
                      <button
                        onClick={() => toggleCompare(item)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors ${
                          isComparing ? 'bg-blue-50 border-[#0F4C81] text-[#0F4C81]' : 'border-slate-300 text-slate-700 hover:bg-white'
                        }`}
                      >
                        {isComparing ? t('treatments.compared') : t('treatments.compare_add')}
                      </button>
                    </div>

                    <button
                      onClick={() => navigate(`/appointment?service=${encodeURIComponent(item.title)}`)}
                      className="btn-primary py-2.5 px-3 text-xs justify-center font-bold"
                    >
                      {t('treatments.book_treatment_btn')}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Highlight Section: Heart & Cancer Care */}
      <section className="container mx-auto px-4">
        <div className="card-premium grid gap-8 lg:grid-cols-[1.1fr_0.9fr] p-8 md:p-10">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A3A8]">{t('treatments.excellence_subtitle')}</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-poppins">{t('treatments.excellence_title')}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('treatments.excellence_desc')}
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 pt-2 text-xs">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                <div className="flex items-center gap-2 text-[#0F4C81] font-bold text-sm">
                  <Heart size={18} /> <span>{t('treatments.adv_heart_care')}</span>
                </div>
                <p className="text-slate-600">{t('treatments.adv_heart_desc')}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                <div className="flex items-center gap-2 text-[#0F4C81] font-bold text-sm">
                  <Activity size={18} /> <span>{t('treatments.adv_cancer_care')}</span>
                </div>
                <p className="text-slate-600">{t('treatments.adv_cancer_desc')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0F4C81] to-[#0F172A] p-8 text-white flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold font-poppins">{t('treatments.why_choose_title')}</h3>
              <ul className="mt-4 space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#22C55E]" /> {t('treatments.why_choose_1')}</li>
                <li className="flex items-center gap-2"><Sparkles size={16} className="text-[#16A3A8]" /> {t('treatments.why_choose_2')}</li>
                <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#22C55E]" /> {t('treatments.why_choose_3')}</li>
                <li className="flex items-center gap-2"><Phone size={16} className="text-red-400" /> {t('treatments.why_choose_4')}</li>
              </ul>
            </div>

            <Link to="/appointment" className="btn-accent py-3 px-6 text-xs text-center font-bold">
              {t('treatments.schedule_consultation')}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Benefits Grid */}
      <section className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const BenefitIcon = b.icon;
            return (
              <div key={b.title} className="card-premium text-center p-6 space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0F4C81]">
                  <BenefitIcon size={28} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Treatment FAQ Accordion */}
      <section className="container mx-auto px-4 max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A3A8]">{t('treatments.faq_subtitle')}</span>
          <h2 className="text-3xl font-bold text-[#0F172A] font-poppins">{t('treatments.faq_title')}</h2>
        </div>

        <div className="space-y-3 text-xs">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-[#0F172A] flex justify-between items-center hover:bg-slate-50 text-sm"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`transition-transform ${openFaq === idx ? 'rotate-180 text-[#0F4C81]' : 'text-slate-400'}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Medical Disclaimer & CTA */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 leading-relaxed text-center">
          <strong>{t('treatments.disclaimer_title')}</strong> {t('treatments.disclaimer_desc')}
        </div>
      </section>

      {/* Quick View Animated Modal */}
      <TreatmentModal
        treatment={selectedTreatment}
        isOpen={!!selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        doctors={doctors}
      />

      {/* Side-by-Side Comparison Modal */}
      <TreatmentCompareModal
        selectedTreatments={compareItems}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

      {/* Mobile Sticky Booking CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <a href="tel:+94112345678" className="btn-secondary py-2.5 px-4 text-xs font-bold">
          {t('treatments.call_hospital')}
        </a>
        <Link to="/appointment" className="btn-primary py-2.5 px-6 text-xs font-bold flex-grow text-center justify-center">
          {t('treatments.book_appointment_mobile')}
        </Link>
      </div>

    </div>
  );
};

export default Treatments;
