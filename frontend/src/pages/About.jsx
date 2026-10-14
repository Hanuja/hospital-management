import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, ShieldCheck, Heart, Users, Target, Eye, Compass, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();
  const timeline = [
    { year: '1999', title: t('about.timeline_1999_title'), desc: t('about.timeline_1999_desc') },
    { year: '2005', title: t('about.timeline_2005_title'), desc: t('about.timeline_2005_desc') },
    { year: '2012', title: t('about.timeline_2012_title'), desc: t('about.timeline_2012_desc') },
    { year: '2018', title: t('about.timeline_2018_title'), desc: t('about.timeline_2018_desc') },
    { year: '2023', title: t('about.timeline_2023_title'), desc: t('about.timeline_2023_desc') },
    { year: '2026', title: t('about.timeline_2026_title'), desc: t('about.timeline_2026_desc') },
  ];

  const values = [
    { title: t('about.val_compassion_title'), desc: t('about.val_compassion_desc'), icon: Heart },
    { title: t('about.val_excellence_title'), desc: t('about.val_excellence_desc'), icon: Award },
    { title: t('about.val_safety_title'), desc: t('about.val_safety_desc'), icon: ShieldCheck },
    { title: t('about.val_innovation_title'), desc: t('about.val_innovation_desc'), icon: Target },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-200">{t('about.header_tag')}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-poppins">{t('about.header_title')}</h1>
          <p className="text-blue-100 text-base">{t('about.header_desc')}</p>
        </div>
      </section>

      {/* Overview & Mission/Vision */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">{t('about.mission_title_h2')}</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {t('about.mission_desc')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
                <div className="w-10 h-10 bg-[#0F4C81] text-white rounded-xl flex items-center justify-center">
                  <Target size={20} />
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg">{t('about.our_mission')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t('about.our_mission_desc')}</p>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100 space-y-2">
                <div className="w-10 h-10 bg-[#16A3A8] text-white rounded-xl flex items-center justify-center">
                  <Eye size={20} />
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg">{t('about.our_vision')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t('about.our_vision_desc')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://i.pinimg.com/736x/33/89/99/33899948fa48b3fc342043f12b7bef36.jpg"
              alt="MediCare Plus Hospital Infrastructure"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('about.core_values_tag')}</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">{t('about.core_values_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card-premium space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0F4C81] flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-lg">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-[#16A3A8] uppercase tracking-widest">{t('about.timeline_tag')}</span>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">{t('about.timeline_h2')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {timeline.map((item) => (
            <div key={item.year} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft relative overflow-hidden group hover:border-[#0F4C81] transition-all">
              <div className="text-4xl font-extrabold text-[#0F4C81]/20 group-hover:text-[#0F4C81] transition-colors font-poppins mb-2">
                {item.year}
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Leadership */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h3 className="text-xl font-bold text-[#0F172A]">{t('about.cert_title')}</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-[#0F4C81]">{t('about.cert_jci')}</span>
            <span className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-[#0F4C81]">{t('about.cert_iso')}</span>
            <span className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-[#0F4C81]">{t('about.cert_award')}</span>
            <span className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-[#0F4C81]">{t('about.cert_achsi')}</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
