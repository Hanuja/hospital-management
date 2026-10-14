import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Building2, Smartphone, DollarSign, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { getAppointmentById, processPayment } from '../services/api';
import toast from 'react-hot-toast';
import ReceiptModal from '../components/ReceiptModal';
import { useTranslation } from 'react-i18next';

const Payment = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentId = searchParams.get('appointment_id') || '1001';

  const [appointment, setAppointment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState(null);

  // Form states
  const [cardName, setCardName] = useState('John Silva');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [expDate, setExpDate] = useState('12/28');
  const [cvv, setCvv] = useState('***');
  const [selectedBank, setSelectedBank] = useState('Commercial Bank');
  const [walletPhone, setWalletPhone] = useState('+94 77 123 4567');

  useEffect(() => {
    const fetchApt = async () => {
      const apt = await getAppointmentById(appointmentId);
      setAppointment(apt);
    };
    fetchApt();
  }, [appointmentId]);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Processing secure payment transaction...');

    try {
      const res = await processPayment({
        appointment_id: appointmentId,
        amount: appointment ? appointment.consultation_fee || 75.00 : 75.00,
        payment_method: paymentMethod === 'card' ? 'Credit/Debit Card' : (paymentMethod === 'bank' ? 'Online Banking' : (paymentMethod === 'wallet' ? 'Mobile Wallet' : 'Pay at Hospital'))
      });

      toast.dismiss(loadingToast);

      if (res && res.status === 'success') {
        toast.success('Payment processed successfully!');
        setCompletedReceipt({
          appointment_id: appointmentId,
          payment_id: res.payment_id || 5001,
          transaction_id: res.transaction_id || 'MCP-TXN-9847123',
          patient_name: appointment?.patient_name || 'John Silva',
          patient_email: appointment?.patient_email || 'patient@medicareplus.com',
          patient_phone: appointment?.patient_phone || '+94 77 123 4567',
          doctor_name: appointment?.doctor_name || 'Dr. Aris Thorne',
          department_name: appointment?.department_name || 'Cardiology',
          appointment_date: appointment?.appointment_date || '2026-08-25',
          appointment_time: appointment?.appointment_time || '10:00 AM',
          consultation_type: appointment?.consultation_type || 'In-person',
          amount: appointment?.consultation_fee || 75.00,
          payment_method: paymentMethod === 'card' ? 'Credit Card' : paymentMethod
        });
      } else {
        toast.error('Payment processing failed. Please try again.');
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Error connecting to payment gateway.');
    } finally {
      setLoading(false);
    }
  };

  const amount = appointment ? (appointment.consultation_fee || 75.00) : 75.00;

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">{t('payment.secureGatewayBadge')}</span>
          <h1 className="text-4xl font-extrabold font-poppins">{t('payment.securePaymentGateway')}</h1>
          <p className="text-blue-100 text-sm">{t('payment.gatewaySubtitle')}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Appointment Summary Box */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 space-y-6 shadow-xl border border-slate-800">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">{t('payment.appointmentSummary')}</span>
              <h3 className="text-xl font-bold font-poppins text-white">ID: #{appointmentId}</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{t('payment.patientLabel')}:</span>
                <span className="font-bold text-white">{appointment?.patient_name || 'John Silva'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{t('payment.doctorLabel')}:</span>
                <span className="font-bold text-[#16A3A8]">{appointment?.doctor_name || 'Dr. Aris Thorne'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{t('payment.departmentLabel')}:</span>
                <span className="font-bold text-white">{appointment?.department_name || 'Cardiology'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{t('payment.dateTimeLabel')}:</span>
                <span className="font-bold text-white">{appointment?.appointment_date || '2026-08-25'} ({appointment?.appointment_time || '10:00 AM'})</span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block">{t('payment.totalAmountDue')}</span>
                <span className="text-xs text-[#22C55E] font-semibold">{t('payment.taxesIncluded')}</span>
              </div>
              <span className="text-3xl font-extrabold text-[#22C55E] font-poppins">${amount}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2">
              <Lock size={14} className="text-[#22C55E]" />
              <span>{t('payment.sslNotice')}</span>
            </div>
          </div>

          {/* Payment Methods & Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-soft p-8 space-y-6">
            
            <h3 className="text-xl font-bold text-[#0F172A]">{t('payment.selectPaymentMethod')}</h3>

            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${paymentMethod === 'card' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
              >
                <CreditCard size={18} /> {t('payment.card')}
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${paymentMethod === 'bank' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
              >
                <Building2 size={18} /> {t('payment.onlineBank')}
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${paymentMethod === 'wallet' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
              >
                <Smartphone size={18} /> {t('payment.wallet')}
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('hospital')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${paymentMethod === 'hospital' ? 'bg-[#0F4C81] text-white border-[#0F4C81]' : 'bg-slate-50 text-slate-600'}`}
              >
                <DollarSign size={18} /> {t('payment.payAtDesk')}
              </button>
            </div>

            {/* Payment Form Fields */}
            <form onSubmit={handlePay} className="space-y-4 pt-2">
              
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t('payment.cardholderName')}</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t('payment.cardNumber')}</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none font-mono"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t('payment.expiryDate')}</label>
                      <input
                        type="text"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t('payment.cvvSecurityCode')}</label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                        className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase">{t('payment.selectOnlineBanking')}</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#0F4C81] focus:outline-none"
                  >
                    <option value="Commercial Bank">{t('payment.commercialBank')}</option>
                    <option value="Hatton National Bank">{t('payment.hnb')}</option>
                    <option value="Sampath Bank">{t('payment.sampathBank')}</option>
                    <option value="Bank of Ceylon">{t('payment.boc')}</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase">{t('payment.mobileWalletPhone')}</label>
                  <input
                    type="tel"
                    value={walletPhone}
                    onChange={(e) => setWalletPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-[#0F4C81] focus:outline-none"
                    required
                  />
                </div>
              )}

              {paymentMethod === 'hospital' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                  <p className="font-bold">{t('payment.payCashAtHospital')}</p>
                  <p>{t('payment.hospitalPayDescription')}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full py-4 text-base font-bold shadow-lg mt-4 justify-center"
              >
                {loading ? t('payment.processingPayment') : `${t('payment.completeAndPay')} $${amount}`}
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* Downloadable / Printable Receipt Modal */}
      {completedReceipt && (
        <ReceiptModal
          receiptData={completedReceipt}
          onClose={() => setCompletedReceipt(null)}
        />
      )}

    </div>
  );
};

export default Payment;
