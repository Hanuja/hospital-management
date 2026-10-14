import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldAlert, Facebook, Instagram, Youtube, Linkedin, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: MediCare Plus Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0F4C81] to-[#16A3A8] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                M+
              </div>
              <div>
                <span className="text-2xl font-poppins font-extrabold text-white tracking-tight">MediCare <span className="text-[#16A3A8]">Plus</span></span>
                <span className="text-[10px] font-medium text-slate-400 block tracking-wider uppercase">Advanced Healthcare. Compassionate Care.</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Providing world-class medical care with experienced specialists, advanced surgical technologies, and 24/7 emergency response dedicated to patient-first recovery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-[#0F4C81] text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-[#16A3A8] text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold font-poppins text-lg border-l-4 border-[#16A3A8] pl-3">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-[#16A3A8] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> About Hospital</Link></li>
              <li><Link to="/doctors" className="hover:text-[#16A3A8] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Doctor Directory</Link></li>
              <li><Link to="/departments" className="hover:text-[#16A3A8] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Departments</Link></li>
              <li><Link to="/services" className="hover:text-[#16A3A8] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Clinical Services</Link></li>
              <li><Link to="/treatments" className="hover:text-[#16A3A8] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Treatments</Link></li>
              <li><Link to="/facilities" className="hover:text-[#16A3A8] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Hospital Facilities</Link></li>
            </ul>
          </div>

          {/* Column 3: Patient Services */}
          <div className="space-y-4">
            <h4 className="text-white font-bold font-poppins text-lg border-l-4 border-[#22C55E] pl-3">Patient Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/appointment" className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Book Appointment</Link></li>
              <li><Link to="/health-packages" className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Health Packages</Link></li>
              <li><Link to="/services" className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Laboratory & Diagnostics</Link></li>
              <li><Link to="/services" className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> 24/7 Pharmacy</Link></li>
              <li><Link to="/faq" className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Insurance Cashless Claims</Link></li>
              <li><Link to="/testimonials" className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"><ArrowRight size={14} /> Patient Reviews</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency */}
          <div className="space-y-4">
            <h4 className="text-white font-bold font-poppins text-lg border-l-4 border-red-500 pl-3">Emergency & Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-[#16A3A8] flex-shrink-0 mt-0.5" />
                <span>123 Health Ave, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-[#16A3A8] flex-shrink-0" />
                <span>Hotline: +94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2.5 bg-red-950/60 border border-red-800 p-2.5 rounded-xl text-red-200">
                <ShieldAlert size={18} className="text-red-400 flex-shrink-0" />
                <span className="font-bold">24/7 Emergency: +94 11 999 9999</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-[#16A3A8] flex-shrink-0" />
                <span>info@medicareplus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} MediCare Plus Hospital. All Rights Reserved. Built with precision and care.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/faq" className="hover:text-white transition-colors">Help Center</Link>
            <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
