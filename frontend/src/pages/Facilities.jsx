import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, ShieldCheck, CheckCircle2, Search, Filter, Clock, MapPin, Phone, 
  Calendar, Download, Users, Heart, Baby, Activity, Sparkles, Stethoscope, 
  Grid, List, Eye, ShieldAlert, Award, ChevronRight, Layers, Image as ImageIcon, Coffee, Smile
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FacilityModal from '../components/FacilityModal';
import FacilityGalleryModal from '../components/FacilityGalleryModal';
import { getDoctors } from '../services/api';
import toast from 'react-hot-toast';

const facilitiesData = [
  // Critical Care
  {
    id: 1,
    title: 'Emergency & Trauma Unit',
    category: 'Critical Care',
    desc: '24/7 immediate critical trauma resuscitation bay with bed-side ventilators and rapid mobile ICU ambulances.',
    img: 'https://i.pinimg.com/1200x/96/ba/77/96ba776e83dfce89cd3e707c56674afe.jpg',
    availability: '24 Hours / 7 Days',
    capacity: '25 Trauma Beds',
    specialistCount: 15,
    location: 'Ground Floor, Emergency Gate 1',
    isEmergency: true,
    features: ['Instant resuscitation bay', 'ACLS mobile ICU ambulance dispatch', 'Continuous vitals monitoring', 'On-site trauma surgeons'],
    accessibility: ['Wheelchair & Stretcher Ramp', 'Direct Ambulance Drive-In', 'Parent & Family Seating']
  },
  {
    id: 2,
    title: 'Intensive Care Unit (ICU)',
    category: 'Critical Care',
    desc: 'Advanced ICU with continuous 1:1 cardiac monitoring, isolation negative-pressure rooms, and HEPA clean air.',
    img: 'https://i.pinimg.com/736x/df/18/77/df1877c3049d16ba4e8c0de723c6d170.jpg',
    availability: '24 Hours / 7 Days',
    capacity: '40 ICU Beds',
    specialistCount: 12,
    location: '4th Floor, Critical Wing',
    isEmergency: true,
    features: ['Continuous hemodynamic monitoring', 'Advanced mechanical ventilators', 'Infection-controlled isolation', '24/7 ICU Intensivists'],
    accessibility: ['Elevator Access', 'Stretcher Clearance', 'Visitor Intercom Lounge']
  },
  {
    id: 3,
    title: 'Neonatal ICU (NICU) & PICU',
    category: 'Critical Care',
    desc: 'Specialized neonatal incubators, infant ventilators, and round-the-clock pediatric intensivist supervision.',
    img: 'https://i.pinimg.com/1200x/10/b0/9e/10b09e7adcee610d86545aa54f221bc8.jpg',
    availability: '24 Hours / 7 Days',
    capacity: '20 Neonatal Pods',
    specialistCount: 10,
    location: '3rd Floor, Pediatric Wing',
    icon: Baby,
    isEmergency: true,
    features: ['Temperature-controlled incubators', 'Pediatric ventilators', 'Phototherapy units', 'Kangaroo mother care room'],
    accessibility: ['Wheelchair Access', 'Private Lactation Lounge', 'Family Waiting Room']
  },

  // Surgery
  {
    id: 4,
    title: 'Modular Operation Theatre Suites',
    category: 'Surgery',
    desc: 'Ultra-clean laminar air flow surgical suites with 4K 3D laparoscopic and robotic surgical navigation consoles.',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    availability: '24 Hours Scheduled & Emergency',
    capacity: '10 Surgical Suites',
    specialistCount: 25,
    location: '2nd Floor, Surgical Block',
    isEmergency: true,
    features: ['Robotic surgery consoles', 'Laminar air flow HEPA filtration', 'Intraoperative C-arm imaging', 'Integrated telemetry'],
    accessibility: ['Dedicated Surgical Lift', 'Pre-op Waiting Bay', 'Post-Op PACU Recovery']
  },

  // Diagnostics
  {
    id: 5,
    title: 'Advanced Radiology & 3T MRI',
    category: 'Diagnostics',
    desc: 'High-definition 3T MRI, 128-slice CT scanner, color Doppler ultrasound, and low-radiation digital X-ray.',
    img: 'https://i.pinimg.com/1200x/41/8a/f7/418af7fb56f1adafb24cca91f56f84fe.jpg',
    availability: '24 Hours Desk',
    capacity: '15 Diagnostic Units',
    specialistCount: 14,
    location: '1st Floor, Diagnostic Wing',
    isEmergency: false,
    features: ['3T Silent MRI Suite', '128-Slice Cardiac CT', 'High-Frequency Ultrasound', 'Fast Digital PACs Reporting'],
    accessibility: ['Wheelchair Accessible', 'Elevator Access', 'Patient Dressing Suites']
  },
  {
    id: 6,
    title: 'ISO Automated Pathology Laboratory',
    category: 'Diagnostics',
    desc: 'ISO 9001 certified automated blood chemistry, molecular biology, hematology, and fast digital reports.',
    img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    availability: '24 Hours Sample Desk',
    capacity: '500+ Tests/Hr',
    specialistCount: 18,
    location: '1st Floor, Main Wing',
    isEmergency: false,
    features: ['Robotic blood chemistry analyzer', 'Molecular PCR testing', 'Digital portal report access', 'Blood bank cross-matching'],
    accessibility: ['Wheelchair Accessible', 'Express Phlebotomy Counter']
  },

  // Patient Care & Comfort
  {
    id: 7,
    title: 'Executive & Deluxe Patient Suites',
    category: 'Patient Care',
    desc: 'Luxury private rooms featuring electric smart beds, room service, private lounge, Wi-Fi, and ambient lighting.',
    img: 'https://i.pinimg.com/1200x/0a/94/96/0a94967ea4c472ea39baa3d0a9754755.jpg',
    availability: '24 Hours Admissions',
    capacity: '150 Private Suites',
    specialistCount: 30,
    location: '4th Floor, Inpatient Block',
    isEmergency: false,
    features: ['Electric smart beds', 'Attached private bathroom & shower', 'Smart TV & Wi-Fi', 'Attendant sofa-bed & dining'],
    accessibility: ['Wheelchair Accessible', 'Spacious Bathrooms', 'Elevator Access']
  },

  // 🧸 Kids Room & Play Area
  {
    id: 8,
    title: 'Kids Room & Children’s Play Area',
    category: 'Patient Comfort',
    desc: 'A safe, colorful, and child-friendly space designed to keep young patients relaxed and engaged during hospital visits.',
    img: 'https://i.pinimg.com/736x/e1/9d/f4/e19df41e3e5771c933d923fbc0465475.jpg',
    availability: 'Daily: 7:00 AM – 9:00 PM',
    capacity: '20 Children & Families',
    specialistCount: 5,
    location: '3rd Floor, Pediatric Wing',
    icon: Baby,
    isEmergency: false,
    features: ['Child-friendly play area', 'Educational toys & puzzles', 'Children’s story books', 'Creative activity & drawing zone', 'Parent comfortable seating', 'Sanitized & child-safe environment'],
    accessibility: ['Wheelchair Accessible', 'Parent Seating Area', 'Child-Safe Soft Flooring']
  },

  // Specialized Care
  {
    id: 9,
    title: 'Dedicated Cancer Care Centre',
    category: 'Specialized Care',
    desc: 'Comprehensive oncology wing providing linear accelerator radiation, day-care chemotherapy, and palliative care.',
    img: 'https://i.pinimg.com/1200x/98/18/7a/98187acfd521f3e2e3cc99527043b1c0.jpg',
    availability: 'Mon - Sat: 8:00 AM - 6:00 PM',
    capacity: '30 Chemotherapy Chairs',
    specialistCount: 8,
    location: '5th Floor, Oncology Centre',
    isEmergency: false,
    features: ['Day-care chemotherapy lounge', 'Linear accelerator radiation unit', 'Targeted immunotherapy desk', 'Oncology nutrition counseling'],
    accessibility: ['Wheelchair Access', 'Restful Recliner Chairs', 'Family Lounge']
  },
  {
    id: 10,
    title: '24/7 Inpatient & OPD Pharmacy',
    category: 'Support Services',
    desc: 'Fully stocked hospital pharmacy providing genuine prescription pharmaceuticals around the clock.',
    img: 'https://i.pinimg.com/1200x/0b/d5/a1/0bd5a1e8f4d40c11cc67576c563ad852.jpg',
    availability: '24 Hours Open',
    capacity: 'Continuous Stock',
    specialistCount: 8,
    location: 'Main Lobby Entrance',
    isEmergency: false,
    features: ['Authentic certified medications', 'Inpatient bed-side delivery', 'Pediatric formulation desk', '24/7 Pharmacist consultation'],
    accessibility: ['Wheelchair Ramp', 'Express Counter', 'Drive-thru Pickup']
  },
  {
    id: 11,
    title: '24/7 Mobile ICU Ambulance Fleet',
    category: 'Support Services',
    desc: 'High-speed emergency ambulances equipped with life-support systems, cardiac monitors, and paramedics.',
    img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
    availability: '24 Hours Emergency',
    capacity: '10 Ambulance Fleet',
    specialistCount: 14,
    location: 'Ambulance Bay, Gate 2',
    isEmergency: true,
    features: ['ACLS Life Support Equipment', 'Bedside Cardiac Telemetry', 'On-board Paramedics', 'GPS Rapid Response Tracking'],
    accessibility: ['Stretcher Hydraulic Lift', 'Emergency Direct Bay']
  },
  {
    id: 12,
    title: 'Hospital Cafeteria & Organic Dining',
    category: 'Patient Comfort',
    desc: 'Hygienic multi-cuisine cafeteria providing fresh organic meals, clinical dietitian-approved patient diets, and coffee.',
    img: 'https://i.pinimg.com/736x/af/3e/9f/af3e9fbb83b57bb96511a108b86c5bea.jpg',
    availability: 'Daily: 6:00 AM – 10:00 PM',
    capacity: '150 Dining Seats',
    specialistCount: 4,
    location: 'Ground Floor, Garden Courtyard',
    icon: Coffee,
    isEmergency: false,
    features: ['Clinical dietitian curated menus', 'Fresh organic ingredients', 'Attendant room delivery service', 'Barista coffee lounge'],
    accessibility: ['Wheelchair Access', 'Courtyard Seating', 'Braille Menus']
  }
];

const galleryImages = [
  { title: 'Modular Operation Theatre', desc: 'Ultra-clean robotic surgical suite with laminar air flow.', src: 'https://i.pinimg.com/1200x/db/c8/3b/dbc83b80a390ef44e858ed83ce1c2a3e.jpg' },
  { title: 'Intensive Care Unit (ICU)', desc: '24/7 continuous cardiac monitoring and isolation suites.', src: 'https://i.pinimg.com/736x/cf/96/92/cf9692e94198e2550015905ac04ab4d7.jpg' },
  { title: '3T MRI Diagnostic Suite', desc: 'Silent high-definition neuro and cardiac imaging.', src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
  { title: 'Executive Patient Suite', desc: 'Luxury room with electric smart bed and private lounge.', src: 'https://i.pinimg.com/736x/6d/e9/c3/6de9c39bfcadfcb8620415014e07ae17.jpg' },
  { title: 'Kids Room & Play Area', desc: 'Safe, child-friendly activity area with toys and books.', src: 'https://i.pinimg.com/1200x/c6/51/f3/c651f33a45c21ebdc2a26cdc5e60a445.jpg' },
  { title: '24/7 Emergency Ambulance', desc: 'Mobile ICU ambulances equipped with life support.', src: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80' }
];

const floorPlan = [
  { floor: 'Ground Floor', dept: 'Emergency Unit | Main Pharmacy | Outpatient OPD | Cafeteria' },
  { floor: '1st Floor', dept: 'Automated Pathology Lab | 3T MRI & Radiology | Blood Bank' },
  { floor: '2nd Floor', dept: 'Modular Operation Theatre | PACU Recovery Unit | Physiotherapy' },
  { floor: '3rd Floor', dept: 'Maternity Wing | NICU & PICU | 🧸 Kids Room & Play Area' },
  { floor: '4th Floor', dept: 'Intensive Care Unit (ICU) | Executive & Deluxe Patient Suites' },
];

const Facilities = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    fetchDocs();
  }, []);

  const categoriesList = ['All', 'Critical Care', 'Diagnostics', 'Surgery', 'Patient Care', 'Maternity & Pediatrics', 'Specialized Care', 'Patient Comfort', 'Support Services'];

  const filteredFacilities = facilitiesData.filter((fac) => {
    const matchCat = selectedCategory === 'All' || fac.category === selectedCategory;
    const matchSearch = fac.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        fac.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        fac.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownloadBrochure = () => {
    const textContent = `MEDICARE PLUS HOSPITAL — FULL INFRASTRUCTURE & FACILITIES BROCHURE\n\nJCI Accredited Smart Tertiary Hospital Campus\n\nCRITICAL CARE & SURGERY:\n• 40-Bed ICU & CCU with 24/7 Intensivists\n• 10 Modular Operation Theatre Suites with Robotic Consoles\n• 25-Bed Trauma & Emergency Unit with Mobile ICU Ambulances\n\nDIAGNOSTICS & RADIOLOGY:\n• 3T Silent MRI & 128-Slice Cardiac CT Scanner\n• ISO 9001 Automated Blood Chemistry & Pathology Lab\n• Color Doppler Ultrasound & Digital X-Ray\n\nPATIENT COMFORT & FAMILY CARE:\n• 150 Executive Deluxe Private Patient Suites\n• 🧸 Kids Room & Children's Play Area (3rd Floor)\n• Multi-Cuisine Organic Cafeteria & Garden Courtyard\n• 24/7 Pharmacy & Inpatient Bedside Delivery\n\nHOSPITAL DIRECTORY:\nGround Floor: Emergency | Pharmacy | OPD | Cafeteria\n1st Floor: Pathology Lab | Radiology | Blood Bank\n2nd Floor: Operation Theatre | Surgical Recovery\n3rd Floor: Maternity | NICU/PICU | Kids Play Room\n4th Floor: ICU | Executive Suites\n\nCONTACT INFORMATION:\nMediCare Plus Hotline: +94 11 234 5678 | Emergency: +94 11 999 9999\nWebsite: http://localhost:5173\n`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MediCare_Plus_Facilities_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast.success('Hospital Facilities brochure downloaded!');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 space-y-16">
      
      {/* 1. Premium Hero Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] via-[#0F172A] to-[#16A3A8] text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-4">
          <div className="flex justify-center items-center gap-2 text-xs text-teal-200 font-bold uppercase tracking-wider">
            <Link to="/" className="hover:underline">Home</Link> / <span>Facilities</span> / <span className="text-white">{selectedCategory}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <ShieldCheck size={16} className="text-[#22C55E]" /> JCI Accredited Hospital Infrastructure
          </div>

          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold">World-Class Hospital Facilities</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-200 leading-relaxed">
            State-of-the-art medical infrastructure designed around patient safety, infection control, diagnostic precision, and restful healing.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/appointment" className="btn-primary py-3 px-8 text-sm font-bold">Book Hospital Visit</Link>
            <button onClick={handleDownloadBrochure} className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white hover:text-[#0F172A] text-sm py-3 px-8 font-bold flex items-center gap-2">
              <Download size={16} /> Download Facilities Brochure
            </button>
          </div>
        </div>
      </section>

      {/* 2. Floating Statistics Counter */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl text-center">
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-extrabold text-[#0F4C81] font-poppins">25+ Yrs</div>
            <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">Excellence</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-extrabold text-[#16A3A8] font-poppins">500+</div>
            <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">Hospital Beds</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-extrabold text-[#22C55E] font-poppins">40+</div>
            <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">Critical ICU Beds</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-extrabold text-amber-600 font-poppins">15+</div>
            <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">Diagnostic Units</div>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl font-extrabold text-red-600 font-poppins">24/7</div>
            <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">Emergency Support</div>
          </div>
        </div>
      </section>

      {/* 3. Search Bar & Category Tabs */}
      <section className="container mx-auto px-4 max-w-5xl space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="🔍 Search facilities (e.g. ICU, MRI, Operation Theatre, Kids Room, Pharmacy)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81] bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-2 border border-slate-200 p-1.5 rounded-xl bg-slate-50 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-[#0F4C81]' : 'text-slate-500'}`}
                title="Grid View"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow text-[#0F4C81]' : 'text-slate-500'}`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>

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
        </div>
      </section>

      {/* 4. Facilities Grid / List */}
      <section className="container mx-auto px-4">
        {filteredFacilities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <Building size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-bold text-slate-700">No facilities match your search criteria</h3>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn-primary py-2 px-6 text-xs inline-flex"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
            {filteredFacilities.map((fac) => {
              const IconComponent = fac.icon || Building;
              return (
                <div
                  key={fac.id}
                  className={`bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group border-t-4 ${
                    fac.category === 'Patient Comfort' ? 'border-t-amber-500' : 'border-t-[#0F4C81]'
                  }`}
                >
                  <div>
                    <div className="h-52 overflow-hidden relative cursor-pointer" onClick={() => setSelectedFacility(fac)}>
                      <img src={fac.img} alt={fac.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="bg-[#16A3A8] text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                          {fac.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">
                        🟢 {fac.availability}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white shrink-0">
                          <IconComponent size={22} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-poppins leading-tight text-white">{fac.title}</h3>
                          <p className="text-[11px] font-semibold text-teal-200">{fac.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 text-xs">
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">{fac.desc}</p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-slate-500">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-1">
                          <Users size={14} className="text-[#0F4C81]" />
                          <span className="truncate">Cap: <strong>{fac.capacity}</strong></span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-1">
                          <Clock size={14} className="text-[#22C55E]" />
                          <span className="truncate">{fac.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedFacility(fac)}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-white text-xs font-bold transition-colors"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => navigate(`/appointment?department=${encodeURIComponent(fac.category)}`)}
                      className="btn-primary py-2.5 px-3 text-xs justify-center font-bold"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Kids Room & Children's Play Area Highlight Card */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-soft">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://i.pinimg.com/736x/b7/73/b6/b773b62043d71de659276d0efa1e1c68.jpg" 
              alt="Kids Room & Play Area" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              🧸 Special Family Facility
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-xs">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Family Comfort & Child Care</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-poppins">Kids Room & Children’s Play Area</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              A safe, colorful, and child-friendly space on the 3rd floor (Pediatric Wing) designed to keep young patients relaxed and engaged before or after medical visits.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
              {['🧸 Educational Toys & Puzzles', '🎨 Creative Drawing Zone', '📚 Children Story Books', '🪑 Parent Seating Lounge', '🧼 Sanitized Environment', '🔒 Child-Safe Flooring'].map((item) => (
                <span key={item} className="bg-white border border-amber-200 px-3 py-2 rounded-xl text-slate-800 font-semibold shadow-sm">
                  {item}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="font-bold text-amber-800">Hours: Daily 7:00 AM – 9:00 PM</span>
              <button
                onClick={() => setSelectedFacility(facilitiesData.find(f => f.id === 8))}
                className="btn-primary bg-amber-600 hover:bg-amber-700 text-white py-2 px-5 text-xs font-bold"
              >
                View Kids Room Details →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Hospital Floor Directory */}
      <section className="container mx-auto px-4 max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A3A8]">Campus Directory</span>
          <h2 className="text-3xl font-bold text-[#0F172A] font-poppins">Interactive Hospital Floor Directory</h2>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden divide-y divide-slate-100 text-xs">
          {floorPlan.map((fp) => (
            <div key={fp.floor} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center font-bold shrink-0">
                  <Building size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm">{fp.floor}</h4>
                  <p className="text-slate-600 text-xs">{fp.dept}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#16A3A8] bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                Accessible via Elevators & Ramps
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Hospital Facility Gallery */}
      <section className="container mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A3A8]">Visual Campus Tour</span>
          <h2 className="text-3xl font-bold text-[#0F172A] font-poppins">Explore Our Hospital Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((g, idx) => (
            <div
              key={idx}
              onClick={() => setGalleryIndex(idx)}
              className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-md border-2 border-white hover:border-[#16A3A8] transition-all"
            >
              <img src={g.src} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 text-white font-bold text-xs p-2 text-center">
                {g.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 24/7 Emergency Care Banner */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="bg-red-600 text-white rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-xs font-extrabold uppercase">
            🚨 24/7 Emergency & Trauma Hotline
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins">Immediate Emergency Response</h2>
          <p className="text-red-100 text-sm max-w-xl mx-auto">
            Our trauma unit operates 24 hours a day with instant ACLS mobile ICU ambulance dispatch.
          </p>
          <div className="pt-2">
            <a href="tel:+94119999999" className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-slate-100 font-extrabold text-xl px-8 py-4 rounded-2xl shadow-lg transition-colors">
              <Phone size={24} /> +94 11 999 9999
            </a>
          </div>
        </div>
      </section>

      {/* Facility Quick View Animated Modal */}
      <FacilityModal
        facility={selectedFacility}
        isOpen={!!selectedFacility}
        onClose={() => setSelectedFacility(null)}
        doctors={doctors}
      />

      {/* Gallery Lightbox Modal */}
      <FacilityGalleryModal
        images={galleryImages}
        initialIndex={galleryIndex || 0}
        isOpen={galleryIndex !== null}
        onClose={() => setGalleryIndex(null)}
      />

      {/* Mobile Sticky Booking CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <a href="tel:+94119999999" className="btn-secondary bg-red-50 text-red-600 border-red-200 py-2.5 px-4 text-xs font-bold">
          🚨 Emergency
        </a>
        <Link to="/appointment" className="btn-primary py-2.5 px-6 text-xs font-bold flex-grow text-center justify-center">
          Book Hospital Visit →
        </Link>
      </div>

    </div>
  );
};

export default Facilities;
