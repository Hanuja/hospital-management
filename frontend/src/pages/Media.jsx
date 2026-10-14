import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Image as ImageIcon, Newspaper } from 'lucide-react';

const Media = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-medical-blue text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">News & Media Center</h1>
        <p className="opacity-90 max-w-2xl mx-auto">Stay updated with our latest news, health blogs, and media events.</p>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Health Blog", icon: Newspaper, color: "bg-medical-teal" },
            { title: "Video Gallery", icon: PlayCircle, color: "bg-red-500" },
            { title: "Photo Gallery", icon: ImageIcon, color: "bg-medical-blue" }
          ].map((item, idx) => (
            <motion.div key={idx} whileHover={{ y: -5 }} className="card-premium text-center">
              <div className={`w-16 h-16 ${item.color} text-white rounded-full flex items-center justify-center mx-auto mb-6`}>
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-poppins font-bold text-navy-blue mb-2">{item.title}</h3>
              <p className="text-gray-500 mb-4">Explore our latest {item.title.toLowerCase()} and updates.</p>
              <button className="text-medical-teal font-medium hover:underline">View More</button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Media;
