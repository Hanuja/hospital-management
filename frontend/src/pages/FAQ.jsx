import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown, ChevronUp, HelpCircle, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(0);

  const categories = [
    'All',
    t('faq.cat_appointments'),
    t('faq.cat_doctors'),
    t('faq.cat_emergency'),
    t('faq.cat_payments'),
    t('faq.cat_insurance'),
    t('faq.cat_health_packages'),
    t('faq.cat_visiting_hours'),
    t('faq.cat_laboratory'),
    t('faq.cat_pharmacy')
  ];

  const faqs = [
    { cat: t('faq.cat_appointments'), q: t('faq.q1'), a: t('faq.a1') },
    { cat: t('faq.cat_appointments'), q: t('faq.q2'), a: t('faq.a2') },
    { cat: t('faq.cat_payments'), q: t('faq.q3'), a: t('faq.a3') },
    { cat: t('faq.cat_emergency'), q: t('faq.q4'), a: t('faq.a4') },
    { cat: t('faq.cat_emergency'), q: t('faq.q5'), a: t('faq.a5') },
    { cat: t('faq.cat_insurance'), q: t('faq.q6'), a: t('faq.a6') },
    { cat: t('faq.cat_health_packages'), q: t('faq.q7'), a: t('faq.a7') },
    { cat: t('faq.cat_visiting_hours'), q: t('faq.q8'), a: t('faq.a8') },
    { cat: t('faq.cat_laboratory'), q: t('faq.q9'), a: t('faq.a9') },
    { cat: t('faq.cat_pharmacy'), q: t('faq.q10'), a: t('faq.a10') }
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchCat = selectedCat === 'All' || item.cat === selectedCat;
    const matchSearch = item.q.toLowerCase().includes(searchTerm.toLowerCase()) || item.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">{t('faq.header_badge')}</span>
          <h1 className="text-4xl font-extrabold font-poppins">{t('faq.title')}</h1>
          <p className="text-blue-100 text-sm">{t('faq.subtitle')}</p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="container mx-auto px-4 max-w-4xl space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t('faq.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81]"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedCat === cat ? 'bg-[#0F4C81] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-bold text-[#0F172A] hover:text-[#0F4C81] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-[#16A3A8] flex-shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 space-y-3"
                    >
                      <p>{faq.a}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
                        <span>{t('faq.category')}: <strong>{faq.cat}</strong></span>
                        <button className="flex items-center gap-1 hover:text-[#0F4C81]">
                          <ThumbsUp size={12} /> {t('faq.helpful')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default FAQ;
