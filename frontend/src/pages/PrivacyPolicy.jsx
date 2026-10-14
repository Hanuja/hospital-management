import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="space-y-12 pb-16">
      <section className="bg-gradient-to-r from-[#0F4C81] to-[#16A3A8] text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">Legal & Compliance</span>
          <h1 className="text-4xl font-extrabold font-poppins">Privacy Policy</h1>
          <p className="text-blue-100 text-sm">How MediCare Plus protects patient data, appointment records, and payment confidentiality.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-soft space-y-6 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-bold text-[#0F172A]">1. Information We Collect</h2>
        <p>MediCare Plus collects personal information necessary to deliver hospital healthcare services, including your name, contact phone, email address, national identity card (NIC) / passport details, appointment schedules, and medical notes.</p>

        <h2 className="text-xl font-bold text-[#0F172A]">2. How We Use Patient Data</h2>
        <p>Your medical and personal data is used solely to facilitate specialist consultation bookings, issue payment receipts, send appointment reminder notifications, and maintain confidential Electronic Health Records (EHR).</p>

        <h2 className="text-xl font-bold text-[#0F172A]">3. Payment & Financial Security</h2>
        <p>Online payment transactions are processed using 256-bit SSL encrypted payment gateways. MediCare Plus does not store raw credit card numbers or CVV codes on hospital servers.</p>

        <h2 className="text-xl font-bold text-[#0F172A]">4. Data Confidentiality & Disclosure</h2>
        <p>We do not sell or rent patient information to third parties. Data is shared strictly with authorized medical consultants and laboratory staff involved directly in your diagnosis and care.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
