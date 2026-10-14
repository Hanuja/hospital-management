import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-[#0F4C81] rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <Stethoscope size={40} />
        </div>
        <h1 className="text-6xl font-extrabold text-[#0F4C81] font-poppins">404</h1>
        <h2 className="text-2xl font-bold text-[#0F172A]">Page Not Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Oops! The hospital page or resource you are looking for has been moved or does not exist.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link to="/" className="btn-primary py-3 px-6 text-sm">
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
