import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TreatmentCompareModal = ({ selectedTreatments = [], isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || selectedTreatments.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-100 p-6 md:p-8 space-y-6 relative max-h-[90vh] flex flex-col"
        >
          <div className="flex justify-between items-center border-b pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F4C81] flex items-center justify-center font-bold">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] font-poppins">Side-by-Side Treatment Comparison</h3>
                <p className="text-xs text-slate-500">Comparing {selectedTreatments.length} selected healthcare treatment procedures.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500">
              <X size={22} />
            </button>
          </div>

          <div className="overflow-x-auto flex-grow text-xs space-y-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-3 w-1/4 bg-slate-50 font-bold text-slate-700">Feature / Specification</th>
                  {selectedTreatments.map((t) => (
                    <th key={t.title} className="p-3 font-bold text-[#0F4C81] text-sm border-l border-slate-200">
                      {t.title} <span className="block text-[11px] font-semibold text-[#16A3A8]">{t.subtitle}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-700 bg-slate-50">Overview & Scope</td>
                  {selectedTreatments.map((t) => (
                    <td key={t.title} className="p-3 border-l border-slate-200 text-slate-600 leading-relaxed">
                      {t.description}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-bold text-slate-700 bg-slate-50">Key Procedures</td>
                  {selectedTreatments.map((t) => (
                    <td key={t.title} className="p-3 border-l border-slate-200">
                      <ul className="space-y-1 text-slate-600">
                        {(t.services || []).slice(0, 3).map((s) => (
                          <li key={s} className="flex items-start gap-1">
                            <span className="text-[#16A3A8] font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-bold text-slate-700 bg-slate-50">Recovery Timeline</td>
                  {selectedTreatments.map((t) => (
                    <td key={t.title} className="p-3 border-l border-slate-200 font-bold text-[#22C55E]">
                      {t.recovery}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-bold text-slate-700 bg-slate-50">Action</td>
                  {selectedTreatments.map((t) => (
                    <td key={t.title} className="p-3 border-l border-slate-200">
                      <button
                        onClick={() => { onClose(); navigate(`/appointment?service=${encodeURIComponent(t.title)}`); }}
                        className="btn-primary py-2 px-4 text-xs w-full justify-center"
                      >
                        Book {t.title}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-slate-100 text-right shrink-0">
            <button onClick={onClose} className="px-6 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold">
              Close Comparison
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TreatmentCompareModal;
