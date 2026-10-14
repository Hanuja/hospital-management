import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('patient@medicareplus.com');
  const [password, setPassword] = useState('patient123');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Authenticating user...');

    try {
      const res = await loginUser({ email, password });
      toast.dismiss(loadingToast);

      if (res && res.status === 'success') {
        toast.success(`Welcome back, ${res.user.name}!`);
        login(res.user);
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Network error during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#0F4C81] text-white font-bold rounded-2xl flex items-center justify-center mx-auto text-xl shadow-md">
            M+
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] font-poppins">Patient & Admin Login</h2>
          <p className="text-xs text-slate-500">Sign in to access your appointments and patient portal.</p>
        </div>

        {/* Demo Credentials Helper */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-[11px] space-y-1 text-slate-600">
          <p className="font-bold text-[#0F4C81]">Demo Credentials:</p>
          <p>• Patient Login: <code className="bg-white px-1.5 py-0.5 rounded border">patient@medicareplus.com</code> / <code className="bg-white px-1.5 py-0.5 rounded border">patient123</code></p>
          <p>• Admin Login: <code className="bg-white px-1.5 py-0.5 rounded border">admin@medicareplus.com</code> / <code className="bg-white px-1.5 py-0.5 rounded border">admin123</code></p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-sm font-bold shadow-md justify-center"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500 flex flex-wrap items-center justify-center gap-1">
          <span>Don't have an account?</span>
          <Link to="/register?role=patient" className="font-bold text-[#16A3A8] hover:underline">
            Register Patient Account
          </Link>
          <span>or</span>
          <Link to="/register?role=admin" className="font-bold text-[#0F4C81] hover:underline">
            Admin Register Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
