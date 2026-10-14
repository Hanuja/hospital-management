import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, HeartPulse, Shield, Stethoscope, Baby, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const packageCatalog = {
  heart: {
    id: 'heart',
    title: 'Heart Care Package',
    badge: 'Heart Care Package',
    description: 'Complete cardiac health assessment and preventive heart care package designed for early detection and better heart health management.',
    startPrice: '$149',
    icon: HeartPulse,
    badgeClass: 'bg-rose-100 text-rose-700',
    priceCardClass: 'bg-rose-50',
    plans: [
      {
        id: 'basic',
        label: '18 - 30',
        title: 'Basic Heart Checkup',
        ageRange: 'Age 18 – 30',
        price: '$149',
        suitableFor: 'Healthy adults who want regular heart monitoring.',
        includes: ['Cardiologist consultation', 'ECG test', 'Blood pressure check', 'Cholesterol testing', 'Basic heart risk assessment'],
        benefits: ['Early health monitoring', 'Lifestyle guidance', 'Preventive heart care'],
      },
      {
        id: 'advanced',
        label: '31 - 50',
        title: 'Advanced Heart Care Package',
        ageRange: 'Age 31 – 50',
        price: '$299',
        suitableFor: 'Adults with lifestyle risks or family history of heart disease.',
        includes: ['Cardiologist consultation', 'ECG test', 'Echocardiogram (ECHO)', 'Blood pressure monitoring', 'Lipid profile test', 'Heart risk assessment'],
        benefits: ['Early detection of heart problems', 'Advanced cardiac screening', 'Expert cardiologist guidance'],
      },
      {
        id: 'premium',
        label: '51+',
        title: 'Premium Cardiac Health Package',
        ageRange: 'Age 51+',
        price: '$499',
        suitableFor: 'Senior adults and high-risk heart patients.',
        includes: ['Senior cardiologist consultation', 'ECG test', 'Echocardiogram', 'TMT (stress test)', 'Complete lipid profile', 'Blood sugar test', 'Heart risk evaluation', 'Detailed cardiac report'],
        benefits: ['Comprehensive heart evaluation', 'Early diagnosis of cardiac conditions', 'Personalized cardiac care plan'],
      },
    ],
    comparisonRows: [
      ['Cardiologist Consultation', '✅', '✅', '✅'],
      ['ECG', '✅', '✅', '✅'],
      ['Echo', '❌', '✅', '✅'],
      ['TMT', '❌', '❌', '✅'],
      ['Lipid Test', '✅', '✅', '✅'],
      ['Heart Risk Report', 'Basic', 'Advanced', 'Premium'],
      ['Price', '$149', '$299', '$499'],
    ],
    hospitalBenefits: ['Experienced cardiologists', 'Modern cardiac equipment', 'Same day test reports', 'Digital health records', 'Follow-up consultation support'],
  },
  cancer: {
    id: 'cancer',
    title: 'Cancer Screening Package',
    badge: 'Cancer Screening Package',
    description: 'Advanced cancer screening package for early detection and prevention, designed to support personalized medical advice and advanced diagnostic care.',
    startPrice: '$249',
    icon: Shield,
    badgeClass: 'bg-sky-100 text-sky-700',
    priceCardClass: 'bg-sky-50',
    plans: [
      {
        id: 'basic',
        label: '18 - 30',
        title: 'Basic Cancer Screening',
        ageRange: 'Age 18 – 30',
        price: '$249',
        suitableFor: 'Healthy adults who want early cancer screening and preventive guidance.',
        includes: ['Oncology consultation', 'Blood investigations', 'Cancer marker screening', 'Basic health risk evaluation'],
        benefits: ['Early cancer detection', 'Personalized medical advice', 'Preventive care support'],
      },
      {
        id: 'advanced',
        label: '31 - 50',
        title: 'Advanced Cancer Screening Package',
        ageRange: 'Age 31 – 50',
        price: '$399',
        suitableFor: 'Adults with family history or lifestyle-related cancer risk.',
        includes: ['Oncology consultation', 'Blood investigations', 'Cancer marker tests', 'Imaging support', 'Health risk evaluation'],
        benefits: ['Detailed screening support', 'Early intervention guidance', 'Advanced diagnostic support'],
      },
      {
        id: 'premium',
        label: '51+',
        title: 'Premium Cancer Care Screening',
        ageRange: 'Age 51+',
        price: '$599',
        suitableFor: 'Senior adults and high-risk patients requiring comprehensive screening.',
        includes: ['Senior oncology consultation', 'Blood investigations', 'Cancer marker tests', 'Imaging support', 'Tumor screening review', 'Detailed health report'],
        benefits: ['Comprehensive cancer evaluation', 'Specialized diagnostic support', 'Personalized care plan'],
      },
    ],
    comparisonRows: [
      ['Oncology Consultation', '✅', '✅', '✅'],
      ['Blood Investigations', '✅', '✅', '✅'],
      ['Cancer Marker Tests', '❌', '✅', '✅'],
      ['Imaging Support', '❌', '✅', '✅'],
      ['Health Risk Evaluation', 'Basic', 'Advanced', 'Premium'],
      ['Price', '$249', '$399', '$599'],
    ],
    hospitalBenefits: ['Experienced oncologists', 'Advanced screening technology', 'Same day report support', 'Digital health records', 'Care coordinator support'],
  },
  family: {
    id: 'family',
    title: 'Family Health Package',
    badge: 'Family Health Package',
    description: 'Complete healthcare package designed for families with regular health monitoring, preventive screening, and early disease detection.',
    startPrice: '$249',
    icon: Stethoscope,
    badgeClass: 'bg-emerald-100 text-emerald-700',
    priceCardClass: 'bg-emerald-50',
    plans: [
      {
        id: 'basic',
        label: '18 - 30',
        title: 'Young Family Package',
        ageRange: 'Age 18 – 30',
        price: '$249',
        suitableFor: 'Young adults and healthy family members.',
        includes: ['General physician consultation', 'Complete blood count (CBC)', 'Diabetes screening', 'Cholesterol check', 'Basic health assessment'],
        benefits: ['Regular health monitoring', 'Early risk identification', 'Affordable preventive care'],
      },
      {
        id: 'advanced',
        label: '31 - 50',
        title: 'Family Wellness Package',
        ageRange: 'Age 31 – 50',
        price: '$449',
        suitableFor: 'Working adults and families with health risks.',
        includes: ['General physician consultation', 'Complete blood count', 'Diabetes screening', 'Lipid profile', 'Kidney function test', 'Liver function test', 'Blood pressure monitoring'],
        benefits: ['Complete family health tracking', 'Early detection of lifestyle diseases', 'Expert medical guidance'],
      },
      {
        id: 'premium',
        label: '51+',
        title: 'Senior Family Care Package',
        ageRange: 'Age 51+',
        price: '$699',
        suitableFor: 'Senior citizens and high-risk patients.',
        includes: ['Senior physician consultation', 'Complete blood tests', 'Diabetes evaluation', 'Heart risk assessment', 'Kidney & liver screening', 'Bone health check', 'Detailed health report'],
        benefits: ['Comprehensive senior healthcare', 'Chronic disease monitoring', 'Personalized health recommendations'],
      },
    ],
    comparisonRows: [
      ['Physician Consultation', '✅', '✅', '✅'],
      ['CBC', '✅', '✅', '✅'],
      ['Diabetes Screening', '✅', '✅', '✅'],
      ['Lipid Profile', '❌', '✅', '✅'],
      ['Kidney & Liver Screening', '❌', '✅', '✅'],
      ['Bone Health Check', '❌', '❌', '✅'],
      ['Price', '$249', '$449', '$699'],
    ],
    hospitalBenefits: ['Family-focused medical care', 'Preventive screenings for every age', 'Digital health records', 'Follow-up consultation support', 'Flexible appointment scheduling'],
  },
  child: {
    id: 'child',
    title: 'Child Wellness Package',
    badge: 'Child Wellness Package',
    description: 'Specialized healthcare package for children’s growth, development, and preventive care.',
    startPrice: '$149',
    icon: Baby,
    badgeClass: 'bg-fuchsia-100 text-fuchsia-700',
    priceCardClass: 'bg-fuchsia-50',
    plans: [
      {
        id: 'basic',
        label: '0 - 5',
        title: 'Kids Basic Care',
        ageRange: 'Age 0 – 5 Years',
        price: '$149',
        suitableFor: 'Young children needing routine preventive care.',
        includes: ['Pediatric consultation', 'Growth assessment', 'Vaccination review', 'Nutrition guidance'],
        benefits: ['Healthy childhood development', 'Preventive pediatric care', 'Parent guidance support'],
      },
      {
        id: 'advanced',
        label: '6 - 12',
        title: 'Kids Growth Package',
        ageRange: 'Age 6 – 12 Years',
        price: '$249',
        suitableFor: 'School-aged children requiring growth and health monitoring.',
        includes: ['Pediatric consultation', 'Growth monitoring', 'Blood tests', 'Nutrition assessment', 'Child health screening'],
        benefits: ['Growth tracking', 'Early health issue detection', 'Nutritional guidance'],
      },
      {
        id: 'premium',
        label: '13 - 17',
        title: 'Teen Health Package',
        ageRange: 'Age 13 – 17 Years',
        price: '$349',
        suitableFor: 'Teenagers requiring complete screening and wellness support.',
        includes: ['Pediatric consultation', 'Complete health screening', 'Blood investigations', 'Lifestyle assessment', 'Mental wellness guidance'],
        benefits: ['Comprehensive adolescent care', 'Lifestyle support', 'Preventive wellness planning'],
      },
    ],
    comparisonRows: [
      ['Pediatric Consultation', '✅', '✅', '✅'],
      ['Growth Assessment', '✅', '✅', '✅'],
      ['Blood Tests', '❌', '✅', '✅'],
      ['Nutrition Guidance', '✅', '✅', '✅'],
      ['Mental Wellness Guidance', '❌', '❌', '✅'],
      ['Price', '$149', '$249', '$349'],
    ],
    hospitalBenefits: ['Child-friendly care environment', 'Specialized pediatric experts', 'Vaccination and growth tracking', 'Digital health records', 'Parental consultation support'],
  },
  fullbody: {
    id: 'fullbody',
    title: 'Full Body Checkup Package',
    badge: 'Full Body Checkup Package',
    description: 'Complete health evaluation package designed for early detection, preventive care, and overall wellness monitoring with advanced medical tests.',
    startPrice: '$199',
    icon: Stethoscope,
    badgeClass: 'bg-[#0F4C81]/15 text-[#0F4C81]',
    priceCardClass: 'bg-blue-50',
    plans: [
      {
        id: 'basic',
        label: '18 - 30',
        title: 'Basic Wellness Checkup',
        ageRange: 'Age 18 – 30',
        price: '$199',
        suitableFor: 'Young adults who want regular health monitoring and preventive healthcare.',
        includes: ['General physician consultation', 'Complete blood count (CBC)', 'Blood sugar test', 'Lipid profile', 'Liver function test', 'Kidney function test', 'Blood pressure check', 'Basic health report'],
        benefits: ['Early detection of health problems', 'Maintain healthy lifestyle', 'Regular health tracking', 'Preventive medical guidance'],
      },
      {
        id: 'advanced',
        label: '31 - 50',
        title: 'Advanced Full Body Checkup',
        ageRange: 'Age 31 – 50',
        price: '$399',
        suitableFor: 'Working adults, lifestyle risk patients, and people requiring regular health screening.',
        includes: ['Doctor consultation', 'Complete blood count (CBC)', 'Diabetes screening', 'Lipid profile', 'Liver function test', 'Kidney function test', 'Thyroid profile', 'ECG test', 'Chest X-ray', 'Vitamin level check', 'Health risk assessment', 'Digital health report'],
        benefits: ['Complete health overview', 'Early lifestyle disease detection', 'Heart and organ health monitoring', 'Personalized medical recommendations'],
      },
      {
        id: 'premium',
        label: '51+',
        title: 'Premium Executive Health Checkup',
        ageRange: 'Age 51+',
        price: '$699',
        suitableFor: 'Senior citizens and patients requiring comprehensive health evaluation.',
        includes: ['Senior physician consultation', 'Complete blood investigations', 'Diabetes evaluation', 'Heart assessment', 'ECG test', 'Echocardiogram (ECHO)', 'Chest X-ray', 'Kidney function test', 'Liver function test', 'Bone health assessment', 'Cancer risk screening', 'Complete health report review'],
        benefits: ['Comprehensive health evaluation', 'Early diagnosis of chronic conditions', 'Specialist recommendations', 'Long-term health management'],
      },
    ],
    comparisonRows: [
      ['Doctor Consultation', '✅', '✅', '✅'],
      ['CBC Test', '✅', '✅', '✅'],
      ['Diabetes Screening', '✅', '✅', '✅'],
      ['Lipid Profile', '✅', '✅', '✅'],
      ['Liver Function', '✅', '✅', '✅'],
      ['Kidney Function', '✅', '✅', '✅'],
      ['ECG', '❌', '✅', '✅'],
      ['Chest X-Ray', '❌', '✅', '✅'],
      ['ECHO', '❌', '❌', '✅'],
      ['Cancer Risk Screening', '❌', 'Optional', '✅'],
      ['Health Report', 'Basic', 'Advanced', 'Premium'],
      ['Price', '$199', '$399', '$699'],
    ],
    hospitalBenefits: ['Advanced diagnostics', 'Expert medical review', 'Digital health records', 'Complete hospital support', 'Follow-up consultation care'],
  },
  women: {
    id: 'women',
    title: 'Women\'s Wellness Package',
    badge: 'Women\'s Wellness Package',
    description: 'Complete women\'s healthcare package designed for preventive screening, early diagnosis, and personalized health support at every stage of life.',
    startPrice: '$199',
    icon: Shield,
    badgeClass: 'bg-pink-100 text-pink-700',
    priceCardClass: 'bg-pink-50',
    plans: [
      {
        id: 'basic',
        label: '18 - 30',
        title: 'Women\'s Basic Wellness',
        ageRange: 'Age 18 – 30',
        price: '$199',
        suitableFor: 'Young women who need regular health monitoring and preventive care.',
        includes: ['Gynecologist consultation', 'General health checkup', 'Complete blood count (CBC)', 'Thyroid profile', 'Vitamin level assessment', 'Basic women\'s health screening'],
        benefits: ['Maintain women\'s health', 'Early detection of health concerns', 'Expert gynecological guidance', 'Preventive healthcare support'],
      },
      {
        id: 'advanced',
        label: '31 - 50',
        title: 'Women\'s Advanced Wellness',
        ageRange: 'Age 31 – 50',
        price: '$399',
        suitableFor: 'Women requiring regular screening, reproductive health care, and preventive monitoring.',
        includes: ['Gynecologist consultation', 'Pap smear test', 'Breast screening', 'Mammogram support', 'Thyroid profile', 'Hormone evaluation', 'Blood sugar test', 'Complete blood count', 'Women\'s health assessment'],
        benefits: ['Early detection of women\'s health issues', 'Personalized medical advice', 'Reproductive health monitoring', 'Specialist consultation support'],
      },
      {
        id: 'premium',
        label: '51+',
        title: 'Women\'s Premium Care Package',
        ageRange: 'Age 51+',
        price: '$599',
        suitableFor: 'Women after menopause or those requiring comprehensive health evaluation.',
        includes: ['Senior gynecologist consultation', 'Mammogram screening', 'Pap smear test', 'Bone density test', 'Thyroid function test', 'Diabetes screening', 'Heart risk assessment', 'Hormone health evaluation', 'Complete health report review'],
        benefits: ['Comprehensive women\'s health evaluation', 'Menopause health support', 'Early disease detection', 'Long-term wellness planning'],
      },
    ],
    comparisonRows: [
      ['Gynecologist Consultation', '✅', '✅', '✅'],
      ['CBC Test', '✅', '✅', '✅'],
      ['Thyroid Test', '✅', '✅', '✅'],
      ['Pap Smear', '❌', '✅', '✅'],
      ['Mammogram', '❌', 'Optional', '✅'],
      ['Hormone Evaluation', 'Basic', 'Advanced', '✅'],
      ['Bone Density Test', '❌', '❌', '✅'],
      ['Health Report', 'Basic', 'Advanced', 'Premium'],
      ['Price', '$199', '$399', '$599'],
    ],
    hospitalBenefits: ['Expert gynecologists', 'Advanced screening', 'Personalized care', 'Privacy & comfort', 'Follow-up consultation support'],
  },
};

const HealthPackages = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    packageId: 'heart',
    ageGroup: packageCatalog.heart.plans[0].id,
  });

  const packages = [
    {
      title: 'Full Body Checkup',
      price: '$199',
      features: ['CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Chest X-Ray'],
      modal: true,
      modalKey: 'fullbody',
    },
    {
      title: 'Heart Care Package',
      price: '$299',
      features: ['Cardiologist Consultation', 'ECG Test', 'ECHO', 'Blood Pressure Monitoring', 'Lipid Profile'],
      popular: true,
      modal: true,
      modalKey: 'heart',
    },
    {
      title: 'Cancer Screening Package',
      price: '$399',
      features: ['Oncology Consultation', 'Blood Investigations', 'Cancer Marker Tests', 'Imaging Support', 'Health Risk Evaluation'],
      modal: true,
      modalKey: 'cancer',
    },
    {
      title: 'Family Health Package',
      price: '$249',
      features: ['General Physician Consultation', 'CBC', 'Diabetes Screening', 'Cholesterol Check', 'Health Assessment'],
      modal: true,
      modalKey: 'family',
    },
    {
      title: 'Child Wellness Package',
      price: '$149',
      features: ['Pediatric Consultation', 'Growth Assessment', 'Vaccination Review', 'Nutrition Guidance'],
      modal: true,
      modalKey: 'child',
    },
    {
      title: "Women's Wellness",
      price: '$249',
      features: ['Pap Smear', 'Mammogram', 'Thyroid Profile', 'Gynecology Consult'],
      modal: true,
      modalKey: 'women',
    },
  ];

  const activePackage = packageCatalog[modalState.packageId] || packageCatalog.heart;
  const activePlan = activePackage.plans.find((plan) => plan.id === modalState.ageGroup) || activePackage.plans[0];
  const Icon = activePackage.icon;

  const openModal = (packageId) => {
    setModalState({
      packageId,
      ageGroup: packageCatalog[packageId].plans[0].id,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-12">
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">{t('packages.main_title')}</h1>
        <p className="opacity-90 max-w-2xl mx-auto text-sm md:text-base">{t('packages.main_subtitle')}</p>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-[22px] overflow-hidden ${pkg.popular ? 'border-2 border-[#0F4C81] shadow-2xl relative' : 'shadow-soft border border-slate-200'}`}
            >
              {pkg.popular && (
                <div className="bg-[#0F4C81] text-white text-xs font-bold uppercase tracking-wider text-center py-2">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <Shield className="text-[#16A3A8] mb-4" size={32} />
                <h3 className="text-2xl font-poppins font-bold text-[#0F172A] mb-2">{pkg.title}</h3>
                <div className="text-3xl font-bold text-[#0F4C81] mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                      <Check size={18} className="text-[#22C55E]" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  {pkg.modal ? (
                    <>
                      <button
                        type="button"
                        onClick={() => openModal(pkg.modalKey)}
                        className="w-full rounded-xl border border-[#0F4C81]/30 bg-white py-3 text-center font-bold text-[#0F4C81] text-xs transition-colors hover:bg-blue-50"
                      >
                        View Package Details & Age Plans
                      </button>
                      <Link
                        to={`/appointment?service=${encodeURIComponent(pkg.title)}`}
                        className="btn-primary w-full text-center text-xs py-3 justify-center"
                      >
                        Book Package Now
                      </Link>
                    </>
                  ) : (
                    <Link
                      to={`/appointment?service=${encodeURIComponent(pkg.title)}`}
                      className={`block w-full text-center py-3 rounded-xl font-bold text-xs transition-colors ${pkg.popular ? 'bg-[#0F4C81] text-white hover:bg-[#0A3860]' : 'bg-slate-100 text-[#0F172A] hover:bg-slate-200'}`}
                    >
                      Book Package Now
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200 z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${activePackage.badgeClass}`}>
                      <Icon size={16} />
                      {activePackage.badge}
                    </div>
                    <h2 className="mt-4 text-3xl font-poppins font-bold text-[#0F172A]">{activePackage.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{activePackage.description}</p>
                  </div>

                  <div className={`rounded-[20px] ${activePackage.priceCardClass} p-5 text-left shrink-0`}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Starting from</p>
                    <div className="mt-2 text-3xl font-bold text-[#0F4C81]">{activePackage.startPrice}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-poppins font-semibold text-[#0F172A]">Select Your Age Group Plan</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {activePackage.plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setModalState((prev) => ({ ...prev, ageGroup: plan.id }))}
                        className={`rounded-2xl border px-4 py-3 text-left transition-colors ${modalState.ageGroup === plan.id ? 'border-[#0F4C81] bg-[#0F4C81] text-white shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-[#0F4C81]/40 hover:bg-slate-50'}`}
                      >
                        <div className="text-sm font-bold">{plan.label}</div>
                        <div className="mt-1 text-xs opacity-80">{plan.ageRange}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-2xl font-poppins font-semibold text-[#0F172A]">{activePlan.title}</h4>
                        <p className="mt-1 text-sm font-medium text-slate-500">{activePlan.ageRange}</p>
                      </div>
                      <div className="text-3xl font-bold text-[#0F4C81]">{activePlan.price}</div>
                    </div>

                    <div className="mt-6">
                      <h5 className="text-xs font-bold uppercase tracking-wide text-slate-500">Suitable For</h5>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{activePlan.suitableFor}</p>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wide text-slate-500">Includes</h5>
                        <ul className="mt-3 space-y-2 text-xs text-slate-600">
                          {activePlan.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check size={16} className="mt-0.5 text-[#22C55E] flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wide text-slate-500">Benefits</h5>
                        <ul className="mt-3 space-y-2 text-xs text-slate-600">
                          {activePlan.benefits.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check size={16} className="mt-0.5 text-[#22C55E] flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[20px] bg-slate-50 p-6">
                    <h4 className="text-xl font-poppins font-semibold text-[#0F172A]">Package Comparison</h4>
                    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="min-w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700">
                          <tr>
                            <th className="px-3 py-3 font-semibold">Feature</th>
                            <th className="px-3 py-3 font-semibold">18-30</th>
                            <th className="px-3 py-3 font-semibold">31-50</th>
                            <th className="px-3 py-3 font-semibold">51+</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {activePackage.comparisonRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-3 py-2.5 font-semibold text-slate-700">{row[0]}</td>
                              <td className="px-3 py-2.5 text-slate-600">{row[1]}</td>
                              <td className="px-3 py-2.5 text-slate-600">{row[2]}</td>
                              <td className="px-3 py-2.5 text-slate-600">{row[3]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[20px] border border-[#16A3A8]/20 bg-teal-50/60 p-6">
                  <h4 className="text-xl font-poppins font-semibold text-[#0F172A]">Hospital Benefits</h4>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {activePackage.hospitalBenefits.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <Check size={16} className="text-[#22C55E] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Close
                  </button>
                  <Link
                    to={`/appointment?service=${encodeURIComponent(activePlan.title)}`}
                    className="btn-primary px-6 py-3 text-xs font-bold text-center justify-center"
                  >
                    Book {activePlan.title} ({activePlan.price}) →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthPackages;
