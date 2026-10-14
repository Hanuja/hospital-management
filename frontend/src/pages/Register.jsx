import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useAuth();

  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'patient';
  const [role, setRole] = useState(initialRole);

  useEffect(() => {
    const queryRole = searchParams.get('role');
    if (queryRole === 'admin' || queryRole === 'patient') {
      setRole(queryRole);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setSearchParams({ role: newRole });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    const loadingToast = toast.loading(`Creating ${role === 'admin' ? 'Admin' : 'Patient'} account...`);

    try {
      const res = await registerUser({ ...formData, role });
      toast.dismiss(loadingToast);

      if (res && res.status === 'success') {
        toast.success(`Registration successful! Logged in as ${res.user.role === 'admin' ? 'Admin' : 'Patient'}.`);
        login(res.user);
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        toast.error(res.message || 'Registration failed');
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-8 space-y-6">
        
        {/* Role Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleChange('patient')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              role === 'patient'
                ? 'bg-white text-[#16A3A8] shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck size={16} /> Patient Account
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-[#0F4C81] text-white shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck size={16} /> Admin Account
          </button>
        </div>

        <div className="text-center space-y-2">
          <div className={`w-12 h-12 ${role === 'admin' ? 'bg-[#0F4C81]' : 'bg-[#16A3A8]'} text-white font-bold rounded-2xl flex items-center justify-center mx-auto text-xl shadow-md transition-colors`}>
            {role === 'admin' ? <ShieldCheck size={24} /> : 'M+'}
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] font-poppins">
            {role === 'admin' ? 'Create Admin Account' : 'Create Patient Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {role === 'admin'
              ? 'Sign up to access administrative controls, management dashboards, and system settings.'
              : 'Sign up to manage your medical appointments and health packages.'}
          </p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={role === 'admin' ? "e.g. Admin User" : "e.g. John Silva"}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={role === 'admin' ? "admin@medicareplus.com" : "john@example.com"}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+94 77 123 4567"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Confirm Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 text-sm font-bold shadow-md justify-center ${
              role === 'admin' ? 'btn-primary bg-[#0F4C81]' : 'btn-accent'
            }`}
          >
            {loading ? 'Registering...' : role === 'admin' ? 'Create Admin Account' : 'Create Patient Account'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Already have an account? <Link to="/login" className="font-bold text-[#0F4C81] hover:underline">Log In Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
