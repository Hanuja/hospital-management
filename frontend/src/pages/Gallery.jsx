import React, { useState } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    'All',
    'Hospital Facilities',
    'Medical Departments',
    'Health Camps',
    'Community Programs',
    'Events',
    'Celebrations',
    'Medical Team',
    'Patient Care'
  ];

  const galleryItems = [
    { id: 1, title: 'State-of-the-Art Operation Theatre', category: 'Hospital Facilities', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', desc: 'Modular ultra-clean surgical suite equipped with robotic navigation.' },
    { id: 2, title: 'Advanced Intensive Care Unit (ICU)', category: 'Hospital Facilities', img: 'https://i.pinimg.com/1200x/ed/95/de/ed95de0425012c08a8edbf1d47cbf36f.jpg', desc: '24/7 bedside critical monitoring unit with isolation beds.' },
    { id: 3, title: 'Cardiology Diagnostic Hub', category: 'Medical Departments', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', desc: '3D Cath Lab and cardiac imaging equipment.' },
    { id: 4, title: 'Free Community Health Camp 2025', category: 'Health Camps', img: 'https://i.pinimg.com/1200x/91/59/07/9159076cef15f38790edc57e1081193a.jpg', desc: 'Over 1,200 citizens received complimentary health screenings.' },
    { id: 5, title: 'Executive Patient Suite', category: 'Patient Care', img: 'https://i.pinimg.com/736x/cd/f8/4c/cdf84cde1e3bdd460bf673daf6f042b5.jpg', desc: 'Private luxury patient rooms featuring smart beds and lounge.' },
    { id: 6, title: 'Annual Healthcare Excellence Awards', category: 'Events', img: 'https://i.pinimg.com/736x/09/e1/ac/09e1ac6d38e8f4bfc0f470cf8edb49a0.jpg', desc: 'Celebrating 25 years of compassionate care breakthroughs.' },
    { id: 7, title: '24/7 Trauma Response Team', category: 'Medical Team', img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80', desc: 'Specialized trauma physicians and mobile ICU paramedics.' },
    { id: 8, title: 'Pediatric Play & Healing Ward', category: 'Medical Departments', img: 'https://i.pinimg.com/736x/12/b7/ec/12b7ecdc5adee758df91f7b9f7ef8f48.jpg', desc: 'Child-friendly recovery environment comforting young patients.' },
    { id: 9, title: 'Robotic Surgery Milestone Celebration', category: 'Celebrations', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', desc: 'Completion of 1,000 successful minimally invasive surgeries.' },
    { id: 10, title: 'Blood Donation Drive', category: 'Community Programs', img: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80', desc: 'Collecting 500+ units of life-saving blood with the Red Cross.' }
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchCat = selectedCat === 'All' || item.category === selectedCat;
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">MediCare Plus Media</span>
          <h1 className="text-4xl font-extrabold font-poppins">Hospital Photo Gallery</h1>
          <p className="text-blue-100 text-sm">Gallery highlights key milestones, advanced facilities, health camps, and dedicated medical teams.</p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="container mx-auto px-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search gallery photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81]"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedCat === cat ? 'bg-[#0F4C81] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft cursor-pointer group hover:shadow-xl transition-all"
            >
              <div className="h-60 overflow-hidden relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn size={32} />
                </div>
                <div className="absolute top-3 left-3 bg-[#0F4C81]/90 text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                  {item.category}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-[#0F172A] text-sm group-hover:text-[#0F4C81] transition-colors">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/10"
            >
              <X size={32} />
            </button>

            <button
              onClick={prevLightbox}
              className="absolute left-6 text-white p-3 rounded-full hover:bg-white/10"
            >
              <ChevronLeft size={36} />
            </button>

            <div className="max-w-4xl max-h-[85vh] text-center space-y-4">
              <img
                src={filteredItems[lightboxIndex].img}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] rounded-2xl mx-auto shadow-2xl object-contain border-2 border-white/20"
              />
              <div className="text-white space-y-1">
                <h3 className="text-xl font-bold font-poppins">{filteredItems[lightboxIndex].title}</h3>
                <p className="text-sm text-slate-300">{filteredItems[lightboxIndex].desc}</p>
              </div>
            </div>

            <button
              onClick={nextLightbox}
              className="absolute right-6 text-white p-3 rounded-full hover:bg-white/10"
            >
              <ChevronRight size={36} />
            </button>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
