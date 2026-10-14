import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Printer, Home, Calendar, CreditCard, User, Building2, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReceiptModal = ({ receiptData, onClose }) => {
  const navigate = useNavigate();

  if (!receiptData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 my-6"
      >
        {/* Printable Area */}
        <div id="printable-receipt" className="p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-6 border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#0F4C81] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  M+
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0F4C81] font-poppins">MediCare <span className="text-[#16A3A8]">Plus</span></h2>
                  <p className="text-xs text-[#64748B]">Advanced Healthcare. Compassionate Care.</p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] mt-2">123 Health Ave, Colombo, Sri Lanka | Hotline: +94 11 234 5678</p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-[#22C55E] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 size={14} /> Paid & Confirmed
              </span>
              <p className="text-xs text-slate-400 mt-2">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Receipt Title */}
          <div className="text-center py-2 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-[#0F172A]">OFFICIAL PAYMENT RECEIPT</h3>
            <p className="text-xs text-[#64748B]">Transaction ID: <span className="font-mono font-semibold text-[#0F4C81]">{receiptData.transaction_id || 'MCP-TXN-884920'}</span></p>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-[#64748B] uppercase font-semibold flex items-center gap-1">
                <User size={14} className="text-[#0F4C81]" /> Patient Details
              </span>
              <p className="font-bold text-[#0F172A]">{receiptData.patient_name}</p>
              <p className="text-xs text-slate-500">{receiptData.patient_email}</p>
              <p className="text-xs text-slate-500">{receiptData.patient_phone}</p>
            </div>

            <div className="space-y-1 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-[#64748B] uppercase font-semibold flex items-center gap-1">
                <Building2 size={14} className="text-[#0F4C81]" /> Appointment Info
              </span>
              <p className="font-bold text-[#0F172A]">{receiptData.doctor_name || 'Specialist Consultant'}</p>
              <p className="text-xs text-[#16A3A8] font-medium">{receiptData.department_name || 'Medical Department'}</p>
              <p className="text-xs text-slate-500">ID: #{receiptData.appointment_id}</p>
            </div>

            <div className="space-y-1 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-[#64748B] uppercase font-semibold flex items-center gap-1">
                <Calendar size={14} className="text-[#0F4C81]" /> Date & Time
              </span>
              <p className="font-bold text-[#0F172A]">{receiptData.appointment_date}</p>
              <p className="text-xs text-slate-500">Time: {receiptData.appointment_time}</p>
              <p className="text-xs text-slate-500">Mode: {receiptData.consultation_type || 'In-person'}</p>
            </div>

            <div className="space-y-1 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-[#64748B] uppercase font-semibold flex items-center gap-1">
                <CreditCard size={14} className="text-[#0F4C81]" /> Payment Summary
              </span>
              <p className="font-bold text-[#0F172A]">Method: {receiptData.payment_method || 'Credit/Debit Card'}</p>
              <p className="text-xs text-slate-500">Payment ID: #{receiptData.payment_id || '5001'}</p>
              <p className="text-lg font-extrabold text-[#22C55E]">${receiptData.amount || '75.00'}</p>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-slate-100 text-xs text-[#64748B]">
            <p>Thank you for choosing MediCare Plus. Please bring a copy or screenshot of this receipt during your appointment visit.</p>
          </div>
        </div>

        {/* Buttons Action Bar */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </button>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="btn-secondary py-2.5 px-5 text-sm"
            >
              <Printer size={18} />
              Print / PDF
            </button>
            <button
              onClick={handlePrint}
              className="btn-primary py-2.5 px-5 text-sm"
            >
              <Download size={18} />
              Download Receipt
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReceiptModal;
