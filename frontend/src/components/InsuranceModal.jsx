import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, Building, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const InsuranceModal = ({ isOpen, onClose, defaultService = '' }) => {
  const [provider, setProvider] = useState('Cigna Healthcare');
  const [policyNumber, setPolicyNumber] = useState('');
  const [serviceName, setServiceName] = useState(defaultService || 'General Consultation');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const providersList = [
    'Cigna Healthcare',
    'Allianz Health Insurance',
    'AIA Insurance',
    'Sri Lanka Insurance (SLIC)',
    'Ceylinco Healthcare',
    'Softlogic Life Insurance',
    'Union Assurance',
    'Bupa International',
    'Fairfirst Insurance'
  ];

  const handleVerify = (e) => {
    e.preventDefault();
    if (!policyNumber) {
      toast.error('Please enter your policy number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerificationResult({
        status: 'Approved',
        coveragePercent: '80% - 100%',
        copay: '$10.00',
        message: `Your insurance policy #${policyNumber} with ${provider} is verified for ${serviceName || 'Hospital Services'}. Direct cashless settlement active.`
      });
      toast.success('Insurance coverage verified successfully!');
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 md:p-8 space-y-6 relative"
        >
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#16A3A8] flex items-center justify-center font-bold">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] font-poppins">Check Insurance Coverage</h3>
                <p className="text-xs text-slate-500">Verify your cashless policy eligibility instantly.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500">
              <X size={22} />
            </button>
          </div>

          {!verificationResult ? (
            <form onSubmit={handleVerify} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select Insurance Provider *</label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#0F4C81]"
                >
                  {providersList.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Policy / Member Number *</label>
                <input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  placeholder="e.g. POL-98471203"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Service or Department</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. MRI Scan / Cardiology"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F4C81]"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-[#0F4C81] flex items-center gap-2">
                <Building size={16} className="flex-shrink-0" />
                <span>MediCare Plus offers direct cashless hospitalization settlement with all recognized providers.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full py-3.5 text-sm font-bold justify-center"
              >
                {loading ? 'Verifying with Provider...' : 'Verify Policy Eligibility'}
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-[#22C55E] font-bold text-sm">
                  <CheckCircle2 size={20} />
                  <span>Coverage Verified — Direct Cashless Settlement</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">{verificationResult.message}</p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-semibold text-slate-600 border-t border-emerald-100">
                  <div>Estimated Coverage: <strong className="text-[#0F4C81]">{verificationResult.coveragePercent}</strong></div>
                  <div>Estimated Co-pay: <strong className="text-[#22C55E]">{verificationResult.copay}</strong></div>
                </div>
              </div>

              <button
                onClick={() => setVerificationResult(null)}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
              >
                Verify Another Policy
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InsuranceModal;
