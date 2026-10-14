import React from 'react';

const TermsConditions = () => {
  return (
    <div className="space-y-12 pb-16">
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">Hospital Terms</span>
          <h1 className="text-4xl font-extrabold font-poppins">Terms & Conditions</h1>
          <p className="text-blue-100 text-sm">Rules governing website usage, appointment scheduling, and hospital service policies.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-soft space-y-6 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-bold text-[#0F172A]">1. Appointment Scheduling & Rescheduling</h2>
        <p>Patients are requested to arrive 15 minutes before scheduled consultation time slots. Appointment cancellations or rescheduling requests must be submitted at least 4 hours in advance.</p>

        <h2 className="text-xl font-bold text-[#0F172A]">2. Emergency Medical Disclaimer</h2>
        <p>This web portal is designed for routine appointments, diagnostic package bookings, and hospital information. In case of acute medical emergencies, immediately call emergency line +94 11 999 9999 or visit the Trauma Unit.</p>

        <h2 className="text-xl font-bold text-[#0F172A]">3. Payment & Refund Terms</h2>
        <p>All online consultation fees paid via the Payment page generate an instant official digital receipt. Refunds for canceled appointments are processed to the original payment source within 3-5 business days.</p>
      </section>
    </div>
  );
};

export default TermsConditions;
