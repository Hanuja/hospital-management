import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, HeartPulse } from 'lucide-react';
import LanguageSwitcher from './common/LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.doctors'), path: '/doctors' },
    { name: t('navbar.departments'), path: '/departments' },
    { name: t('navbar.services'), path: '/services' },
    { name: t('navbar.counselling'), path: '/counselling' },
    { name: t('navbar.contact'), path: '/contact' }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0F4C81] text-white rounded-xl flex items-center justify-center">
              <HeartPulse size={24} />
            </div>
            <span className="text-2xl font-poppins font-extrabold text-[#0F172A]">MediCare<span className="text-[#16A3A8]">Plus</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-semibold text-slate-600 hover:text-[#0F4C81] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              to="/appointment" 
              className="bg-[#0F4C81] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#0c3c66] transition-colors"
            >
              {t('navbar.bookAppointment')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 bg-white shadow-lg absolute left-0 right-0 top-20 z-40">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-slate-700 hover:text-[#0F4C81] px-4"
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link 
                  to="/appointment" 
                  onClick={() => setIsOpen(false)}
                  className="bg-[#0F4C81] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-[#0c3c66] transition-colors w-full flex justify-center"
                >
                  {t('navbar.bookAppointment')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
