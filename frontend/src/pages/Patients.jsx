import React from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Download, ShieldCheck } from 'lucide-react';

const Patients = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-navy-blue text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Patient Information</h1>
        <p className="text-gray-300">Everything you need to know before, during, and after your visit.</p>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { title: "Admission Process", icon: FileText, desc: "Learn about the steps required for hospital admission and what documents to bring." },
            { title: "Insurance Partners", icon: ShieldCheck, desc: "View our list of accepted health insurance providers for cashless treatments." },
            { title: "Visitor Guidelines", icon: User, desc: "Visiting hours, rules, and regulations to ensure patient safety and comfort." },
            { title: "Download Forms", icon: Download, desc: "Access essential medical and consent forms before your appointment." },
          ].map((item, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-6 border border-gray-100 rounded-2xl shadow-soft hover:border-medical-teal transition-colors">
              <div className="w-12 h-12 bg-medical-teal/10 text-medical-teal rounded-lg flex items-center justify-center mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-navy-blue mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Patients;
