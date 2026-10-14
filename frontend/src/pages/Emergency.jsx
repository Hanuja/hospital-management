import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, Activity, Clock, MapPin } from 'lucide-react';

const Emergency = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-red-600 text-white py-16 text-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 bg-white text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <AlertTriangle size={40} />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">24/7 Emergency Services</h1>
        <p className="text-xl max-w-2xl mx-auto font-medium">For immediate medical attention, call our emergency hotline.</p>
        
        <div className="mt-10 inline-block bg-white text-red-600 px-8 py-4 rounded-2xl shadow-2xl font-bold text-3xl md:text-4xl border-4 border-red-200">
          <a href="tel:1-800-MEDICARE" className="flex items-center gap-4">
            <Phone size={36} />
            1-800-MEDICARE
          </a>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-soft text-center border-t-4 border-red-500">
            <Activity size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-blue mb-2">Ambulance Request</h3>
            <p className="text-gray-600 mb-6">Fully equipped ACLS ambulances available 24/7 for rapid response.</p>
            <button className="bg-red-50 text-red-600 font-bold py-2 px-6 rounded-lg w-full hover:bg-red-100 transition-colors">Request Ambulance</button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-soft text-center border-t-4 border-medical-teal">
            <Clock size={48} className="text-medical-teal mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-blue mb-2">Trauma Center</h3>
            <p className="text-gray-600">Level 1 trauma center ready to handle all types of severe injuries.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-soft text-center border-t-4 border-medical-blue">
            <MapPin size={48} className="text-medical-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-blue mb-2">Location</h3>
            <p className="text-gray-600 mb-4">Emergency entrance is located at the South Wing, accessible directly from the main avenue.</p>
            <button className="text-medical-blue font-semibold hover:underline">Get Directions</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Emergency;
