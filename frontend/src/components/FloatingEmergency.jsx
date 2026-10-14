import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingEmergency = () => {
  const whatsappMessage = encodeURIComponent("Hello MediCare Plus, I would like to book an appointment.");
  const whatsappUrl = `https://wa.me/94112345678?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* WhatsApp Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg flex items-center gap-2 group transition-all"
        title="WhatsApp Appointment Assistance"
      >
        <MessageSquare size={22} className="fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-semibold pr-1">
          WhatsApp Appointment
        </span>
      </motion.a>

      {/* Emergency Call Floating Button */}
      <motion.a
        href="tel:+94119999999"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-emergency py-3 px-5 rounded-full shadow-2xl border-2 border-white flex items-center gap-2 text-sm font-bold tracking-wide"
      >
        <Phone size={20} className="animate-bounce" />
        <span>🚨 24/7 Emergency: +94 11 999 9999</span>
      </motion.a>
    </div>
  );
};

export default FloatingEmergency;
