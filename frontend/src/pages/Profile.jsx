import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, CreditCard, Clock, CheckCircle2, ShieldCheck, FileText, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingAppointments = [
    { id: 1001, doctor: 'Dr. Aris Thorne', dept: 'Cardiology', date: '2026-08-25', time: '10:00 AM', status: 'confirmed', fee: 75.00 },
    { id: 1002, doctor: 'Dr. Sophia Chen', dept: 'Pediatrics', date: '2026-09-02', time: '02:30 PM', status: 'pending', fee: 60.00 },
  ];

  const paymentHistory = [
    { id: 5001, appointmentId: 1001, doctor: 'Dr. Aris Thorne', amount: 75.00, method: 'Credit Card', date: '2026-08-09', status: 'completed' }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-bold text-2xl border-2 border-white/40">
              <User size={32} />
            </div>
            <div>
              <span className="text-xs text-teal-200 font-bold uppercase tracking-wider">Patient Portal</span>
              <h1 className="text-3xl font-extrabold font-poppins">{user?.name || 'John Silva'}</h1>
              <p className="text-xs text-blue-100">{user?.email || 'patient@medicareplus.com'} | {user?.phone || '+94 77 123 4567'}</p>
            </div>
          </div>

          <Link to="/appointment" className="bg-white text-[#0F4C81] font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-slate-100 transition-colors text-sm">
            + New Appointment
          </Link>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="container mx-auto px-4">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 ${
              activeTab === 'dashboard' ? 'bg-[#0F4C81] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <User size={16} /> Patient Dashboard
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 ${
              activeTab === 'appointments' ? 'bg-[#0F4C81] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar size={16} /> My Appointments
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 ${
              activeTab === 'payments' ? 'bg-[#0F4C81] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CreditCard size={16} /> Payment History
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 ${
              activeTab === 'profile' ? 'bg-[#0F4C81] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText size={16} /> Personal Info
          </button>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
                <span className="text-xs font-bold text-[#0F4C81] uppercase">Upcoming Consultations</span>
                <div className="text-3xl font-extrabold text-[#0F172A] font-poppins">2 Active</div>
                <p className="text-xs text-slate-500">Next: Dr. Aris Thorne (Aug 25)</p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                <span className="text-xs font-bold text-[#22C55E] uppercase">Total Payments</span>
                <div className="text-3xl font-extrabold text-[#0F172A] font-poppins">$75.00</div>
                <p className="text-xs text-slate-500">1 Verified Transaction</p>
              </div>

              <div className="p-6 rounded-2xl bg-teal-50 border border-teal-100 space-y-2">
                <span className="text-xs font-bold text-[#16A3A8] uppercase">Active Health Package</span>
                <div className="text-lg font-bold text-[#0F172A]">Full Body Checkup</div>
                <p className="text-xs text-slate-500">Valid until Dec 2026</p>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-soft">
              <h3 className="font-bold text-[#0F172A] flex items-center gap-2 text-base">
                <Bell className="text-[#16A3A8]" size={20} /> System Notifications
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <span>Appointment #1001 with Dr. Aris Thorne confirmed for Aug 25, 10:00 AM.</span>
                  <span className="text-slate-400">Today</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <span>Payment receipt generated for Transaction #MCP-TXN-9847123.</span>
                  <span className="text-slate-400">Today</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: My Appointments */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-[#0F172A] text-lg">My Scheduled Appointments</h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Appointment #{apt.id}</span>
                    <h4 className="font-bold text-base text-[#0F172A]">{apt.doctor}</h4>
                    <p className="text-[#16A3A8] font-semibold">{apt.dept} Department</p>
                    <p className="text-slate-500">Date: {apt.date} at {apt.time}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] ${
                      apt.status === 'confirmed' ? 'bg-emerald-50 text-[#22C55E] border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {apt.status}
                    </span>
                    <Link to={`/payment?appointment_id=${apt.id}`} className="btn-primary py-2 px-4 text-xs">
                      View Receipt / Pay
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Payment History */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-[#0F172A] text-lg">Payment History & Receipts</h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {paymentHistory.map((p) => (
                <div key={p.id} className="p-6 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Payment #{p.id}</span>
                    <h4 className="font-bold text-sm text-[#0F172A]">Consultation with {p.doctor}</h4>
                    <p className="text-slate-500">Method: {p.method} | Date: {p.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#22C55E] font-poppins">${p.amount}</span>
                    <span className="block text-[10px] font-bold text-[#22C55E] uppercase">Paid & Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Personal Info */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft space-y-6">
            <h3 className="font-bold text-[#0F172A] text-lg border-b pb-4">Personal Medical File</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">{user?.name || 'John Silva'}</p>
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">{user?.email || 'patient@medicareplus.com'}</p>
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">{user?.phone || '+94 77 123 4567'}</p>
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">NIC / Passport</label>
                <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">199012345678</p>
              </div>
              <div className="md:col-span-2">
                <label className="block font-bold text-slate-400 uppercase mb-1">Address</label>
                <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-800">No. 45 Galle Road, Colombo 03, Sri Lanka</p>
              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

export default Profile;
